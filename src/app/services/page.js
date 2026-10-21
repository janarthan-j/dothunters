"use client";
import { services } from "@/data/services";
import { Code2, Gamepad2, Clapperboard, Cloud, Smartphone, Video, BrainCircuit, Megaphone } from "lucide-react";
import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import ScrollReveal from "@/components/ScrollReveal";
import CTASection from "@/components/CTASection";

const icons = {
  "web-design-development":   Code2,
  "3d-vr-game-development":   Gamepad2,
  "motion-graphics":          Clapperboard,
  "saas-product-development": Cloud,
  "mobile-app-development":   Smartphone,
  "video-production":         Video,
  "ai-ml-development":        BrainCircuit,
  "digital-marketing":        Megaphone,
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="What we do"
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        title={["Services built for", { text: "digital growth.", className: "text-red-500" }]}
        intro="From strategy to shipping — we cover every layer of the digital product lifecycle."
      />

      {/* Services Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <ScrollReveal key={service.slug} delay={(i % 3) * 90} className="h-full">
                <ServiceCard service={service} Icon={icons[service.slug]} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Not sure where to start?"
        title={["Tell us about it.", { text: "We’ll point the way.", className: "text-red-500" }]}
        text="Share what you’re working on and we’ll recommend the right mix of services — no commitment."
        primary={{ href: "/get-started", label: "Free consultation" }}
        secondary={{ href: "/contact", label: "Contact us" }}
      />
    </main>
  );
}
