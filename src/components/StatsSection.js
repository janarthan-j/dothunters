import AnimatedCounter from "@/components/AnimatedCounter";

const stats = [
  { value: "120+", label: "Projects Delivered" },
  { value: "60+",  label: "Happy Clients" },
  { value: "5+",   label: "Years of Experience" },
  { value: "98%",  label: "Client Satisfaction" },
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <AnimatedCounter
                value={stat.value}
                className="text-5xl font-bold text-red-500 mb-2"
              />
              <span className="text-xs uppercase tracking-widest text-gray-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
