import SectionHeader from "@/components/SectionHeader";
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
    <section className="dot-bg py-24 bg-white/25 dark:bg-white/[0.03]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          eyebrow="How we work"
          title={["A process built", "for results."]}
          link={{ href: "/services", label: "Learn more" }}
          className="border-gray-300 dark:border-gray-700"
        />

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
