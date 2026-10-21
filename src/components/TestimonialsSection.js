import Image from "next/image";
import Link from "next/link";
import { testimonials as allTestimonials } from "@/data/testimonials";
import SectionHeader from "@/components/SectionHeader";
import DragScroll from "@/components/DragScroll";

const initials = (name) => name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();

const TestimonialsSection = ({
  testimonials = allTestimonials,
  title = ["What our", "clients say."],
  className = "",
}) => {
  if (testimonials.length === 0) return null;

  return (
    <section className={`py-24 overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader eyebrow="Testimonials" title={title} />
      </div>

      {/* Starts on the content column, bleeds off the right edge */}
      <DragScroll className="drag-scroll--bleed pb-2">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="snap-start shrink-0 w-[85vw] sm:w-[520px] flex flex-col rounded-[2rem] bg-gray-100 dark:bg-white/5 border border-gray-200/70 dark:border-white/10 p-8 md:p-10 select-none"
          >
            {/* Avatar + project link */}
            <div className="flex items-center justify-between gap-4 mb-8">
              {t.photo ? (
                <Image src={t.photo} alt={t.name} width={64} height={64} draggable={false} className="w-16 h-16 rounded-full object-cover" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-300">
                  {initials(t.name)}
                </div>
              )}
              {t.projectSlug && (
                <Link
                  href={`/projects/${t.projectSlug}`}
                  draggable={false}
                  className="text-xs font-semibold uppercase tracking-widest text-red-500 hover:text-red-600 transition whitespace-nowrap"
                >
                  View project &rarr;
                </Link>
              )}
            </div>

            {/* Quote */}
            <blockquote className="text-lg md:text-xl leading-snug tracking-tight text-gray-900 dark:text-white mb-10">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <figcaption className="mt-auto border-l border-gray-300 dark:border-gray-700 pl-6">
              <p className="font-semibold text-gray-900 dark:text-white">{t.name}</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm">{t.role}</p>
            </figcaption>
          </figure>
        ))}
      </DragScroll>
    </section>
  );
};

export default TestimonialsSection;
