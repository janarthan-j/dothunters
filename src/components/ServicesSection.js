"use client";
import { services } from "@/data/services";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import ScrollReveal from "@/components/ScrollReveal";

// Homepage shows one row of three, in this order; the rest live on /services
const FEATURED = ["web-design-development", "ai-ml-development", "digital-marketing"];
const featured = FEATURED.map((slug) => services.find((s) => s.slug === slug)).filter(Boolean);

const ServicesSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          eyebrow="Services"
          title={["Our", "capabilities."]}
          link={{ href: "/services", label: "See all" }}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((service, i) => (
            <ScrollReveal key={service.slug} delay={i * 90} className="h-full">
              <ServiceCard service={service} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
