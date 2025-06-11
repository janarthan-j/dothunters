import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import PortfolioSection from "../components/PortfolioSection";
import ProcessSection from "../components/ProcessSection";
import Footer from "../components/Footer";

function App() {
  return (
    <div className="font-sans text-gray-900">
      
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <Footer />
    </div>
  );
}

export default App;
