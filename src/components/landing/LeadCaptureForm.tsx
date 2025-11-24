import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import InputMask from "react-input-mask";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Gift, Lock, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

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

export const LeadCaptureForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    
    try {
      // Simulating API call - replace with actual endpoint
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Falha ao enviar");

      setIsSuccess(true);
      toast.success("Dados enviados com sucesso!");
    } catch (error) {
      toast.error("Algo deu errado. Tente novamente ou nos chame no WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <CheckCircle2 className="w-20 h-20 text-success mx-auto mb-6" />
        <h3 className="text-3xl font-bold text-primary mb-4">
          ✅ Recebemos suas informações!
        </h3>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          Em breve você receberá um WhatsApp para começar suas 5 análises gratuitas.
        </p>
      </motion.div>
    );
  }

  return (
    <section id="form" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="p-8 lg:p-12 shadow-elevated border-2 border-accent/20 bg-card">
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    {...register("name")}
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
                  <p className="text-sm text-destructive">{errors.email.message}</p>
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
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
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
                  <p className="text-sm text-destructive">{errors.hasInvestment.message}</p>
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
};
