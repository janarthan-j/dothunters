import Image from "next/image";
import Link from "next/link";
import { testimonials as allTestimonials } from "@/data/testimonials";

const initials = (name) => name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();

const StarIcon = () => (
  <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const TestimonialsSection = ({
  testimonials = allTestimonials,
  title = "What our clients say.",
  className = "bg-white dark:bg-gray-900",
}) => {
  if (testimonials.length === 0) return null;

  // A lone testimonial gets a wider, featured card instead of one narrow grid column.
  const single = testimonials.length === 1;

  return (
    <section className={`py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <p className="uppercase tracking-widest text-gray-400 dark:text-gray-500 text-sm mb-3">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold max-w-xl dark:text-white">{title}</h2>
        </div>

        {/* Cards */}
        <div
          className={
            single ? "max-w-3xl"
            : testimonials.length === 2 ? "grid grid-cols-1 md:grid-cols-2 gap-6"
            : "grid grid-cols-1 md:grid-cols-3 gap-6"
          }
        >
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`border rounded-lg bg-white dark:bg-gray-900 flex flex-col justify-between hover:shadow-lg transition ${single ? "p-10" : "p-8"} ${i === 0 ? "border-red-400" : "border-gray-200 dark:border-gray-700"}`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, s) => <StarIcon key={s} />)}
              </div>

              {/* Quote */}
              <p className={`text-gray-600 dark:text-gray-400 leading-relaxed mb-8 ${single ? "text-lg" : "text-sm"}`}>&ldquo;{t.quote}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                {t.photo ? (
                  <Image src={t.photo} alt={t.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-300">
                    {initials(t.name)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-sm dark:text-white">{t.name}</p>
                  <p className="text-gray-400 dark:text-gray-500 text-xs">{t.role}</p>
                </div>
                {t.projectSlug && (
                  <Link
                    href={`/projects/${t.projectSlug}`}
                    className="ml-auto text-xs font-semibold text-red-500 hover:text-red-600 transition whitespace-nowrap"
                  >
                    View project &rarr;
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
