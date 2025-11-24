import { Instagram, Linkedin } from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <img src={logo} alt="Duop" className="h-12 mb-2 mx-auto md:mx-0" />
            <p className="text-sm opacity-80">
              Consultoria de investimentos inteligente
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#" className="hover:text-accent transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Contato
            </a>
          </div>

          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent flex items-center justify-center transition-all hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent flex items-center justify-center transition-all hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} Duop. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
