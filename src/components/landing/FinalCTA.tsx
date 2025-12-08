import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/tracking";
import type { CTAClickHandler } from "@/types/components";
import { CTA_LOCATIONS } from "@/constants/business";

const FinalCTA = ({ onCTAClick }: CTAClickHandler) => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Pare de Tomar Decisões no Escuro
          </h2>
          <p className="text-xl lg:text-2xl mb-8 opacity-90">
            Comece suas 5 análises gratuitas agora. Sem cartão, sem compromisso.
          </p>
          <Button
            size="lg"
            onClick={() => {
              trackCTAClick(CTA_LOCATIONS.finalCta);
              onCTAClick();
            }}
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-7 shadow-accent transition-all hover:scale-105"
          >
            Começar Gratuitamente
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
