"use client";
import { useState, useEffect } from "react";

const ServiceHeroSlideshow = ({ images, title, tagline }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-black flex items-end">
      {/* Slides */}
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === current ? "opacity-60" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-14 w-full">
        <p className="text-red-400 uppercase tracking-widest text-sm font-semibold mb-3">
          Our Services
        </p>
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
          {title}
        </h1>
        <p className="text-gray-300 text-lg max-w-xl">{tagline}</p>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 right-8 z-10 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-white w-6" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default ServiceHeroSlideshow;
