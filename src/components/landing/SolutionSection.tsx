import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { solutions } from "@/data/solutions";

export const SolutionSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
