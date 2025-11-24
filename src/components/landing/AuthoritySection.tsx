import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { GraduationCap, Award, Briefcase, TrendingUp } from "lucide-react";

const credentials = [
  {
    icon: GraduationCap,
    title: "3 Engenheiros",
    subtitle: "PUC, ITA",
  },
  {
    icon: GraduationCap,
    title: "2 Economistas",
    subtitle: "FGV, UFRJ",
  },
  {
    icon: Award,
    title: "3 Mestrados em Economia",
    subtitle: "FGV",
  },
  {
    icon: Briefcase,
    title: "1 Certificação CFA®",
    subtitle: "Padrão global",
  },
];

export const AuthoritySection = () => {
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
            Quem Está Por Trás da Duop?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {credentials.map((credential, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 text-center h-full bg-gradient-to-br from-card to-muted/30 border-accent/20 hover:border-accent/50 transition-all hover:shadow-accent">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <credential.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-card-foreground mb-1">
                  {credential.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {credential.subtitle}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
