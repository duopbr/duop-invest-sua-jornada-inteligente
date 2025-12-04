import { useRef, useEffect, useState, lazy, Suspense } from "react";
import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { trackPageView } from "@/lib/tracking";

// Lazy load: below-the-fold components
const ProblemSection = lazy(() => import("@/components/landing/ProblemSection"));
const SolutionSection = lazy(() => import("@/components/landing/SolutionSection"));
const HowItWorksSection = lazy(() => import("@/components/landing/HowItWorksSection"));
const TestimonialsSection = lazy(() => import("@/components/landing/TestimonialsSection"));
const LeadCaptureForm = lazy(() => import("@/components/landing/LeadCaptureForm"));
const AuthoritySection = lazy(() => import("@/components/landing/AuthoritySection"));
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const FinalCTA = lazy(() => import("@/components/landing/FinalCTA"));
const Footer = lazy(() => import("@/components/landing/Footer"));

// Minimal fallback to prevent CLS
const SectionFallback = () => <div className="py-20" />;

const Index = () => {
  const [shouldRenderBelowFold, setShouldRenderBelowFold] = useState(false);
  const formRef = useRef<{ triggerPulse: () => void }>(null);

  useEffect(() => {
    // NÃO ALTERAR tracking
    trackPageView();

    const revealBelowFold = () => setShouldRenderBelowFold(true);

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(revealBelowFold);
    } else {
      setTimeout(revealBelowFold, 1000);
    }
  }, []);

  const scrollToForm = () => {
    // Garante que o form será montado
    setShouldRenderBelowFold(true);

    const attemptScroll = () => {
      const formElement = document.getElementById("form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          formRef.current?.triggerPulse();
        }, 600);
      } else {
        requestAnimationFrame(attemptScroll);
      }
    };

    attemptScroll();
  };

  return (
    <div className="min-h-screen">
      {/* Above-the-fold: loads immediately */}
      <Header onCTAClick={scrollToForm} />
      <HeroSection onCTAClick={scrollToForm} />
      
      {/* Below-the-fold: loads on demand after idle */}
      {shouldRenderBelowFold && (
        <Suspense fallback={<SectionFallback />}>
          <ProblemSection />
          <SolutionSection />
          <HowItWorksSection />
          <TestimonialsSection />
          <LeadCaptureForm ref={formRef} />
          <AuthoritySection />
          <FAQSection />
          <FinalCTA onCTAClick={scrollToForm} />
          <Footer />
        </Suspense>
      )}
    </div>
  );
};

export default Index;
