import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";
import heroMobileImage from "@/assets/hero-mobile.webp";
import { trackCTAClick } from "@/lib/tracking";

interface HeroSectionProps {
  onCTAClick: () => void;
}

export const HeroSection = ({ onCTAClick }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Seu Gerente Quer Te Vender Produtos. Nós vamos fazer você Investir Melhor.
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Consultoria independente 24/7 via WhatsApp. Análises feitas por ex-gestores da XP e BTG + IA treinada no mercado brasileiro.
            </p>
            <Button
              size="lg"
              onClick={() => {
                trackCTAClick('hero');
                onCTAClick();
              }}
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 shadow-accent transition-all hover:scale-105"
            >
              Analisar Minha Carteira Grátis
            </Button>
            <p className="mt-6 text-muted-foreground flex items-center justify-center lg:justify-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>Junte-se a 2.400+ investidores que já testaram</span>
            </p>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              srcSet={`${heroMobileImage} 800w, ${heroImage} 1920w`}
              sizes="(max-width: 768px) 100vw, 50vw"
              alt="Pessoa usando smartphone com gráficos de investimentos"
              className="rounded-2xl shadow-elevated w-full h-auto"
              width={1920}
              height={1080}
              fetchPriority="high"
              decoding="sync"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
