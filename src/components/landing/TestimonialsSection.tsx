import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Quote, Award } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export const TestimonialsSection = () => {
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
            Investidores Reais, Resultados Reais
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-8 h-full bg-card border-border hover:shadow-card transition-all relative">
                <Quote className="w-10 h-10 text-accent/20 mb-4" />
                <p className="text-card-foreground text-lg mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div className="mt-auto">
                  <p className="font-semibold text-card-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <Card className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground border-none">
            <Award className="w-6 h-6" />
            <p className="font-semibold text-lg">
              Fundada por engenheiros ex-gestores com mestrado e doutorado em Economia (FGV)
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
