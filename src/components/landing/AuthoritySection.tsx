import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import philippeImage from "@/assets/philippe-drevon.png";
import gustavoImage from "@/assets/gustavo-teixeira.png";
import rodrigoImage from "@/assets/rodrigo-lamas.png";

const founders = [
  {
    name: "Philippe Drevon",
    credentials: "Engenheiro PUC-RJ",
    description: "Mestre em Economia e Finanças pela FGV. 12 anos no mercado financeiro, 9 anos na gestão de fundos multimercados.",
    image: philippeImage,
  },
  {
    name: "Gustavo Teixeira, CFA",
    credentials: "Engenheiro PUC-RJ",
    description: "14 anos no mercado financeiro, 9 anos na gestão de fundos multimercados, 5 anos em assessoria de investimentos.",
    image: gustavoImage,
  },
  {
    name: "Rodrigo Lamas",
    credentials: "Engenheiro ITA",
    description: "Mestre em Economia e Finanças pela FGV e Doutor em Administração pela FGV.",
    image: rodrigoImage,
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
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Fundada por engenheiros ex-gestores com mestrado e doutorado em Economia (FGV)
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
          {founders.map((founder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-8 text-center h-full bg-gradient-to-br from-card to-muted/30 border-accent/20 hover:border-accent/50 transition-all hover:shadow-accent">
                <div className="flex justify-center mb-6">
                  <img
                    src={founder.image}
                    alt={`Foto de ${founder.name}, ${founder.credentials}`}
                    className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-2 border-accent/30 shadow-md hover:scale-105 transition-transform"
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
