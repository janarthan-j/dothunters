"use client";
import { useState, useEffect } from "react";
import ExpandingMedia from "@/components/ExpandingMedia";
import PageHero from "@/components/PageHero";

const ServiceHeroSlideshow = ({ images, title, tagline }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <PageHero
      eyebrow="Service details"
      crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }]}
      title={title}
      intro={tagline}
      media={
        <>
          <ExpandingMedia className="h-[60vh] md:h-[85vh] min-h-[420px] bg-black">
            {images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  i === current ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </ExpandingMedia>

          {/* Dot indicators */}
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-end gap-2 pt-6">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Show image ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "bg-red-500 w-6" : "bg-gray-300 dark:bg-gray-600 w-2"
                }`}
              />
            ))}
          </div>
        </>
      }
    />
  );
};

export default ServiceHeroSlideshow;
