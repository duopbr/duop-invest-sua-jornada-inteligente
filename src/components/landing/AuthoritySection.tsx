import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { founders } from "@/data/founders";

const AuthoritySection = () => {
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
            Quem Está Por Trás da Duop?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Fundada por engenheiros ex-gestores com mestrado e doutorado em Economia (FGV)
          </p>
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
        >
          <Card className="p-6 text-center bg-gradient-to-br from-accent/5 to-accent/10 border-accent/30 hover:border-accent/50 transition-all">
            <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">
              R$ 47M+
            </div>
            <p className="text-sm text-muted-foreground">
              em carteiras analisadas
            </p>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-accent/5 to-accent/10 border-accent/30 hover:border-accent/50 transition-all">
            <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">
              2.400+
            </div>
            <p className="text-sm text-muted-foreground">
              investidores atendidos
            </p>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-accent/5 to-accent/10 border-accent/30 hover:border-accent/50 transition-all">
            <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">
              4.8/5.0
            </div>
            <p className="text-sm text-muted-foreground">
              avaliação média
            </p>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
          {founders.map((founder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="p-8 text-center h-full bg-gradient-to-br from-card to-muted/30 border-accent/20 hover:border-accent/50 transition-all hover:shadow-accent">
                <div className="flex justify-center mb-6">
                  <img
                    src={founder.image}
                    alt={`Foto de ${founder.name}, ${founder.credentials}`}
                    className="w-32 h-32 md:w-36 md:h-36 rounded-full object-contain bg-muted/20 border-2 border-accent/30 shadow-md hover:scale-105 transition-transform"
                    width={144}
                    height={144}
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-2">
                  {founder.name}
                </h3>
                <p className="text-accent font-semibold mb-4">
                  {founder.credentials}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {founder.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;
