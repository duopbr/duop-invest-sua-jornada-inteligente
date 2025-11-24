import { motion } from "framer-motion";
import { Send, Brain, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Send,
    number: "1",
    title: "Envie sua carteira pelo WhatsApp",
    description: "Compartilhe seus investimentos de forma segura e prática",
  },
  {
    icon: Brain,
    number: "2",
    title: "Nossa IA + especialistas analisam em tempo real",
    description: "Tecnologia avançada combinada com expertise humana",
  },
  {
    icon: TrendingUp,
    number: "3",
    title: "Receba insights e recomendações personalizadas",
    description: "Decisões informadas baseadas na sua realidade",
  },
];

export const HowItWorksSection = () => {
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
                  <div className="bg-accent/10 backdrop-blur-sm border-2 border-accent/30 rounded-2xl p-8 shadow-card">
                    <step.icon className="w-16 h-16 text-accent" />
                  </div>
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
