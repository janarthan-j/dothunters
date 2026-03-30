const testimonials = [
  {
    quote: "DotHunters completely transformed our digital presence. The attention to detail in the UI and the speed of delivery were exceptional.",
    name: "Amal Perera",
    role: "CEO, NovaTech Solutions",
    initials: "AP",
  },
  {
    quote: "Working with DotHunters felt like having an in-house design team. They understood our brand instantly and delivered beyond expectations.",
    name: "Samantha Lee",
    role: "Product Manager, FinLoop",
    initials: "SL",
  },
  {
    quote: "From the first wireframe to launch, the process was seamless. Our app users now love the experience — conversion jumped 40%.",
    name: "Ravi Chandran",
    role: "Founder, UrbanRoute",
    initials: "RC",
  },
];

const StarIcon = () => (
  <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <p className="uppercase tracking-widest text-gray-400 dark:text-gray-500 text-sm mb-3">Testimonials</p>
          <h2 className={`text-4xl md:text-5xl font-bold max-w-xl dark:text-white`}>
            What our clients say.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`border rounded-lg p-8 flex flex-col justify-between hover:shadow-lg transition ${i === 0 ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'}`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, s) => <StarIcon key={s} />)}
              </div>

              {/* Quote */}
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8">&ldquo;{t.quote}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-300">
                  {t.initials}
                </div>
                <div>
                  <p className={`font-semibold text-sm dark:text-white`}>{t.name}</p>
                  <p className="text-gray-400 dark:text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
