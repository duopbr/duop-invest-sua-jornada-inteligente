import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Smartphone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { steps, type StepMockupType } from "@/data/steps";

const StepMockup = ({ type }: { type: StepMockupType }) => {
  if (type === "whatsapp-send") {
    return (
      <Card className="w-64 p-4 bg-gradient-to-br from-[#25D366]/10 to-[#25D366]/5 border-[#25D366]/30">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <Smartphone className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-sm">Você</span>
        </div>
        <div className="space-y-2">
          <div className="bg-accent/20 rounded-lg p-2 text-xs">
            📊 Aqui está minha carteira
          </div>
          <div className="bg-accent/20 rounded-lg p-2 text-xs">
            🖼️ [Print da carteira]
          </div>
        </div>
      </Card>
    );
  }

  if (type === "analyzing") {
    return (
      <Card className="w-64 p-4 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-sm">Duop AI</span>
        </div>
        <div className="space-y-2">
          <div className="bg-muted/50 rounded-lg p-2 text-xs">
            ✨ Analisando sua carteira...
          </div>
          <div className="bg-muted/50 rounded-lg p-2 text-xs">
            🔍 Verificando rentabilidade
          </div>
          <div className="bg-muted/50 rounded-lg p-2 text-xs">
            📈 Calculando performance
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-64 p-4 bg-gradient-to-br from-success/10 to-success/5 border-success/30">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-sm">Duop</span>
      </div>
      <div className="space-y-2">
        <div className="bg-success/20 rounded-lg p-2 text-xs font-semibold">
          ✅ Análise completa
        </div>
        <div className="bg-muted/50 rounded-lg p-2 text-xs">
          💡 3 recomendações de melhoria
        </div>
        <div className="bg-muted/50 rounded-lg p-2 text-xs">
          📊 Potencial: +R$ 4.200/ano
        </div>
      </div>
    </Card>
  );
};

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
            Como Funciona
          </h2>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline line - hidden on mobile */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-accent/30 -translate-x-1/2" />

          <div className="space-y-12 lg:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-col lg:flex-row gap-8 items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground font-bold text-xl mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-semibold text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="relative z-10">
                  <StepMockup type={step.mockup} />
                </div>

                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
