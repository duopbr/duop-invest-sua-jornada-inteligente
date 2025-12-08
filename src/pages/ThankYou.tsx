import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Instagram, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trackPageView, trackOutboundClick } from "@/lib/tracking";
import { Link } from "react-router-dom";

const ThankYou = () => {
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="p-8 lg:p-12 shadow-elevated border-2 border-accent/20 bg-card">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <CheckCircle2 className="w-24 h-24 text-success" />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="absolute inset-0 rounded-full bg-success"
              />
            </div>
          </motion.div>

          {/* Main Message */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-card-foreground">
              ✅ Tudo Certo!
            </h1>
            <p className="text-xl text-muted-foreground">
              Recebemos suas informações com sucesso.
            </p>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mt-6">
              <p className="text-lg font-semibold text-accent">
                📱 Você receberá um WhatsApp em até 2 horas
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Nossa equipe entrará em contato para ativar suas 5 análises gratuitas
              </p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-6">
            <div className="border-t border-border pt-6">
              <p className="text-center text-muted-foreground font-semibold mb-4">
                Enquanto isso, que tal nos seguir no Instagram?
              </p>
              <Button
                size="lg"
                asChild
                className="w-full bg-gradient-to-r from-[#E1306C] to-[#F77737] hover:opacity-90 text-white border-0"
              >
                <a
                  href="https://www.instagram.com/duop2opiniao/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2"
                  onClick={() => trackOutboundClick('https://www.instagram.com/duop2opiniao/', 'instagram')}
                >
                  <Instagram className="w-5 h-5" />
                  Seguir @duop2opiniao
                </a>
              </Button>
            </div>

            <div className="border-t border-border pt-6">
              <p className="text-center text-muted-foreground mb-4">
                Já recebeu nosso WhatsApp?
              </p>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="w-full border-accent text-accent hover:bg-accent/10"
              >
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('https://wa.me/5511999999999', 'whatsapp')}
                >
                  Abrir WhatsApp
                </a>
              </Button>
            </div>

            <div className="border-t border-border pt-6">
              <Button
                variant="ghost"
                asChild
                className="w-full text-muted-foreground hover:text-foreground"
              >
                <Link to="/" className="inline-flex items-center justify-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Voltar para a página inicial
                </Link>
              </Button>
            </div>
          </div>

          {/* Security Note */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              🔒 Seus dados estão seguros conosco e nunca serão compartilhados com terceiros
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ThankYou;
