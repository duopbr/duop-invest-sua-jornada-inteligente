import { useRef } from "react";
import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { LeadCaptureForm, LeadCaptureFormRef } from "@/components/landing/LeadCaptureForm";
import { AuthoritySection } from "@/components/landing/AuthoritySection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  const formRef = useRef<LeadCaptureFormRef>(null);

  const scrollToForm = () => {
    const formElement = document.getElementById("form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
      // Trigger pulse effect after scroll
      setTimeout(() => {
        formRef.current?.triggerPulse();
      }, 600);
    }
  };

  return (
    <div className="min-h-screen">
      <Header onCTAClick={scrollToForm} />
      <HeroSection onCTAClick={scrollToForm} />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <LeadCaptureForm ref={formRef} />
      <AuthoritySection />
      <FAQSection />
      <FinalCTA onCTAClick={scrollToForm} />
      <Footer />
    </div>
  );
};

export default Index;
