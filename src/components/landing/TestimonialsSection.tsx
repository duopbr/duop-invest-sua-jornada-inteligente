import { Card } from "@/components/ui/card";
import { Quote, Award } from "lucide-react";

const testimonials = [
  {
    quote: "Descobri que estava pagando 2,5% ao ano em taxas 'escondidas' do meu fundo. Em 2 semanas já realoquei 60% da carteira. Economizei R$ 3.200 no primeiro ano.",
    author: "João Silva",
    role: "Empresário, 34 anos",
  },
  {
    quote: "Meu gerente me colocou em 3 CDBs que rendiam MENOS que a inflação. A Duop explicou em 5 minutos por que isso era péssimo. Mudei tudo no dia seguinte.",
    author: "Maria Santos",
    role: "Médica, 42 anos",
  },
  {
    quote: "Achei que precisava de um assessor presencial caríssimo. Com a Duop por R$ 54,90/mês tenho análises melhores que as do meu banco. Sem enrolação, direto no WhatsApp.",
    author: "Pedro Costa",
    role: "Executivo, 38 anos",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
            Investidores Reais, Resultados Reais
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
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
            </div>
          ))}
        </div>

        <div className="flex justify-center animate-fade-in" style={{ animationDelay: '300ms' }}>
          <Card className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground border-none">
            <Award className="w-6 h-6" />
            <p className="font-semibold text-lg">
              Fundada por engenheiros ex-gestores com mestrado e doutorado em Economia (FGV)
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
