import { useRef, useEffect, lazy, Suspense } from "react";
import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { trackPageView } from "@/lib/tracking";
import { SCROLL_TO_FORM_DELAY } from "@/constants/business";
import type { LeadCaptureFormRef } from "@/types/components";

// Lazy load below-the-fold components
const ProblemSection = lazy(() => import("@/components/landing/ProblemSection"));
const SolutionSection = lazy(() => import("@/components/landing/SolutionSection"));
const HowItWorksSection = lazy(() => import("@/components/landing/HowItWorksSection"));
const TestimonialsSection = lazy(() => import("@/components/landing/TestimonialsSection"));
const LeadCaptureForm = lazy(() => import("@/components/landing/LeadCaptureForm"));
const AuthoritySection = lazy(() => import("@/components/landing/AuthoritySection"));
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const FinalCTA = lazy(() => import("@/components/landing/FinalCTA"));
const Footer = lazy(() => import("@/components/landing/Footer"));

// Minimal loading fallback
const SectionFallback = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  const formRef = useRef<LeadCaptureFormRef>(null);

  // Track page view on mount
  useEffect(() => {
    trackPageView();
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById("form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
      // Trigger pulse effect after scroll
      setTimeout(() => {
        formRef.current?.triggerPulse();
      }, SCROLL_TO_FORM_DELAY);
    }
  };

  return (
    <div className="min-h-screen">
      <Header onCTAClick={scrollToForm} />
      <HeroSection onCTAClick={scrollToForm} />
      
      <Suspense fallback={<SectionFallback />}>
        <ProblemSection />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <SolutionSection />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <HowItWorksSection />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <TestimonialsSection />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <LeadCaptureForm ref={formRef} />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <AuthoritySection />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <FAQSection />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <FinalCTA onCTAClick={scrollToForm} />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
