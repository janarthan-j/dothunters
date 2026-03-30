import React from "react";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import StatsSection from "../components/StatsSection";
import PortfolioSection from "../components/PortfolioSection";
import ProcessSection from "../components/ProcessSection";
import TestimonialsSection from "../components/TestimonialsSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";

function App() {
  return (
    <div className="font-sans text-gray-900">
      <HeroSection />
      <ScrollReveal>
        <ServicesSection />
      </ScrollReveal>
      <ScrollReveal delay={50}>
        <StatsSection />
      </ScrollReveal>
      <ScrollReveal delay={50}>
        <PortfolioSection />
      </ScrollReveal>
      <ScrollReveal delay={50}>
        <ProcessSection />
      </ScrollReveal>
      <ScrollReveal delay={50}>
        <TestimonialsSection />
      </ScrollReveal>
      <ScrollReveal delay={50}>
        <CTASection />
      </ScrollReveal>
      <Footer />
    </div>
  );
}

export default App;
