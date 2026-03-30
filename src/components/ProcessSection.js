const steps = [
  {
    number: "01",
    title: "Research",
    description: "We deep-dive into your business, users, and market to uncover the insights that drive smart design decisions.",
  },
  {
    number: "02",
    title: "Concept",
    description: "We translate research into ideas — wireframes, moodboards, and prototypes that bring strategy to life visually.",
  },
  {
    number: "03",
    title: "Implement",
    description: "Our engineers build clean, scalable code while designers ensure pixel-perfect execution across every screen.",
  },
  {
    number: "04",
    title: "Delivery & Support",
    description: "We launch, monitor, and iterate. Our relationship doesn't end at delivery — we're here for the long run.",
  },
];

const ProcessSection = () => {
  return (
    <section className="dot-bg py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <p className="uppercase tracking-widest text-gray-400 dark:text-gray-500 text-sm mb-3">How we work</p>
            <h2 className={`text-4xl md:text-5xl font-bold max-w-xl dark:text-white`}>
              A process built for results.
            </h2>
          </div>
          <a href="/services" className="hidden md:flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition text-sm font-medium">
            Learn more
            <svg className="w-4 h-4 ml-1" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H3a1 1 0 110-2h7.586L8.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0">
          {steps.map((step, i) => (
            <div key={i} className="relative border-t-2 border-black dark:border-white pt-8 md:pr-8">
              {/* Step number */}
              <span className="text-xs font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase">{step.number}</span>
              <h4 className={`text-xl font-bold mt-2 mb-3 dark:text-white`}>{step.title}</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
