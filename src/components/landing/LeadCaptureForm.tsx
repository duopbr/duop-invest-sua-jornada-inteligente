import { forwardRef, useImperativeHandle, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Gift, Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  generateExternalId,
  trackFormView,
  trackFormStart,
  trackFormValidationError,
  trackLeadCaptured,
  trackOutboundClick,
} from "@/lib/tracking";

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "Por favor, insira seu nome" }),
  surname: z.string().trim().min(1, { message: "Por favor, insira seu sobrenome" }),
  email: z.string().trim().email({ message: "E-mail inválido" }),
  phone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, { message: "Telefone inválido" }),
  hasInvestment: z.enum(["yes", "no"], {
    required_error: "Por favor, selecione uma opção",
  }),
});

type FormData = z.infer<typeof formSchema>;

export interface LeadCaptureFormRef {
  triggerPulse: () => void;
}

export const LeadCaptureForm = forwardRef<LeadCaptureFormRef>((props, ref) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shouldPulse, setShouldPulse] = useState(false);
  const [formStarted, setFormStarted] = useState(false);
  const formSectionRef = useRef<HTMLElement>(null);
  const leadExternalIdRef = useRef<string>(generateExternalId());

  useImperativeHandle(ref, () => ({
    triggerPulse: () => {
      setShouldPulse(true);
      setTimeout(() => setShouldPulse(false), 2000);
    },
  }));

  // Track form view when it becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackFormView('lead_capture_form');
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (formSectionRef.current) {
      observer.observe(formSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Track form start on first field interaction
  const handleFormStart = (fieldName: string) => {
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart(fieldName);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const hasInvestment = watch("hasInvestment");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const leadExternalId =
      leadExternalIdRef.current || generateExternalId();
    leadExternalIdRef.current = leadExternalId;
    
    try {
      // Capturar UTM params da URL
      const urlParams = new URLSearchParams(window.location.search);
      
      // Insert lead using client-generated ID to avoid waiting Supabase response
      const { error } = await supabase
        .from('B2C_Leads_LP')
        .insert({
          id: leadExternalId,
          name: data.name.trim(),
          surname: data.surname.trim(),
          email: data.email.trim().toLowerCase(),
          phone: data.phone,
          has_investment: data.hasInvestment === "yes",
          source: 'landing_page',
          utm_source: urlParams.get('utm_source'),
          utm_medium: urlParams.get('utm_medium'),
          utm_campaign: urlParams.get('utm_campaign'),
        });

      if (error) {
        console.error("Supabase error details:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        });
        
        // Show detailed error only in development
        if (import.meta.env.DEV) {
          const errorMsg = `Erro: ${error.message} (código: ${error.code})`;
          toast.error(errorMsg);
        }
        
        throw new Error(error.message || "Erro ao salvar dados");
      }

      // Track successful lead capture with normalized data for Meta CAPI
      trackLeadCaptured(
        {
          email: data.email.trim().toLowerCase(),
          phone: data.phone,
          firstName: data.name.trim(),
          lastName: data.surname.trim(),
          externalId: leadExternalId,
        },
        {
          has_investment: data.hasInvestment === "yes",
          form_id: 'lead_capture_form',
        }
      );
      
      // Success! Navigate to thank you page
      // Wait for tracking to complete
      setTimeout(() => {
        navigate('/obrigado');
      }, 500);
      
      // Keep button disabled during navigation
      // setIsSubmitting will stay true
    } catch (error) {
      console.error("Error submitting lead:", error);
      // Dismiss any existing toasts first
      toast.dismiss();
      // Show error toast
      toast.error("Algo deu errado. Tente novamente ou nos chame no WhatsApp.", {
        duration: 5000,
      });
      setIsSubmitting(false);
    }
  };

  // Track validation errors
  const handleFormError = (formErrors: any) => {
    const errorFields = Object.keys(formErrors);
    if (errorFields.length > 0) {
      trackFormValidationError(errorFields);
    }
  };

  return (
    <section
      id="form"
      ref={formSectionRef}
      className="py-20 bg-muted/50"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          {/* Urgency Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-4"
          >
            <span className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm text-accent px-4 py-2 rounded-full text-sm font-semibold border border-accent/20 animate-fade-in">
              🔥 347 pessoas testaram essa semana
            </span>
          </motion.div>

          <Card className={`p-8 lg:p-12 shadow-elevated border-2 bg-card transition-all duration-500 ${
            shouldPulse ? "border-accent animate-pulse-glow" : "border-accent/20"
          }`}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4">
                <Gift className="w-5 h-5" />
                <span className="font-semibold">5 Interações Grátis</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-card-foreground mb-3">
                Comece Agora Gratuitamente
              </h2>
              <p className="text-muted-foreground text-lg">
                Teste sem compromisso. Não pedimos cartão de crédito.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit, handleFormError)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    {...register("name")}
                    onFocus={() => handleFormStart('name')}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="surname">Sobrenome *</Label>
                  <Input
                    id="surname"
                    placeholder="Seu sobrenome"
                    {...register("surname")}
                    className={errors.surname ? "border-destructive" : ""}
                  />
                  {errors.surname && (
                    <p className="text-sm text-destructive">{errors.surname.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  {...register("email")}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">Ops! {errors.email.message} 😊</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <InputMask
                  mask="(99) 99999-9999"
                  {...register("phone")}
                >
                  {(inputProps: any) => (
                    <Input
                      {...inputProps}
                      id="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      className={errors.phone ? "border-destructive" : ""}
                    />
                  )}
                </InputMask>
                {errors.phone && (
                  <p className="text-sm text-destructive">Ops! {errors.phone.message} 😊</p>
                )}
              </div>

              <div className="space-y-4">
                <Label>Você tem mais de R$ 100 mil investidos? *</Label>
                <RadioGroup
                  value={hasInvestment}
                  onValueChange={(value) => setValue("hasInvestment", value as "yes" | "no")}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="cursor-pointer font-normal">
                      Sim
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="cursor-pointer font-normal">
                      Não
                    </Label>
                  </div>
                </RadioGroup>
                {errors.hasInvestment && (
                  <p className="text-sm text-destructive">Ops! {errors.hasInvestment.message} 😊</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6 shadow-accent transition-all hover:scale-105"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Começar Gratuitamente"
                )}
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Suas 5 primeiras análises são grátis. Sem cartão de crédito.
                </p>
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  Seus dados estão seguros conosco
                </p>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
});

LeadCaptureForm.displayName = "LeadCaptureForm";
