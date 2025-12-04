import { AlertCircle, DollarSign, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

const problems = [
  {
    icon: AlertCircle,
    title: "Produtos complexos que ninguém explica direito",
    description: "Linguagem técnica e sem clareza sobre o que você está comprando",
  },
  {
    icon: DollarSign,
    title: "Taxas escondidas e conflitos de interesse",
    description: "Seu gerente ganha comissão vendendo produtos que nem sempre são os melhores para você",
  },
  {
    icon: Clock,
    title: "Sem tempo para acompanhar seus investimentos",
    description: "O mercado muda rápido e você não consegue ficar por dentro de tudo",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
            Cansado de Recomendações Enviesadas do Seu Banco?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <Card className="p-8 h-full hover:shadow-card transition-all bg-card border-border">
                <problem.icon className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
