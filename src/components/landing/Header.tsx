import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { trackCTAClick } from "@/lib/tracking";
import type { CTAClickHandler } from "@/types/components";
import { HEADER_SCROLL_THRESHOLD, CTA_LOCATIONS } from "@/constants/business";

export const Header = ({ onCTAClick }: CTAClickHandler) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > HEADER_SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="Duop - Consultoria de Investimentos"
              className="h-8 md:h-10"
              width={120}
              height={40}
            />
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => {
              trackCTAClick(CTA_LOCATIONS.header);
              onCTAClick();
            }}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-md hover:shadow-lg transition-all"
          >
            <span className="hidden sm:inline">Começar Agora</span>
            <span className="sm:hidden">Começar</span>
          </Button>
        </div>
      </nav>
    </header>
  );
};
