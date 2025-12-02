import { motion } from "framer-motion";
import { Shield, MessageSquare, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const solutions = [
  {
    icon: Shield,
    title: "Análises Independentes",
    description: "Não vendemos produtos, só a verdade",
  },
  {
    icon: MessageSquare,
    title: "Linguagem Simples",
    description: "Explicamos tudo de forma clara",
  },
  {
    icon: Users,
    title: "24/7 no WhatsApp",
    description: "Tire dúvidas quando precisar",
  },
];

export const SolutionSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
            A Duop É Diferente
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 h-full border-2 border-accent/20 hover:border-accent/50 transition-all bg-card hover:shadow-accent">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <solution.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                  {solution.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {solution.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
