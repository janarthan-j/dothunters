const steps = ["Research", "Concept", "Implement", "Delivery & Support"];

const ProcessSection = () => {
  return (
    <section className="py-16 px-6">
      <h3 className="text-3xl font-bold text-center mb-10">OUR PROCESS</h3>
      <div className="grid md:grid-cols-4 gap-6 text-center">
        {steps.map((step, i) => (
          <div key={i}>
            <div className="text-4xl font-bold mb-2">0{i + 1}</div>
            <h4 className="text-xl font-semibold mb-2">{step}</h4>
            <p className="text-gray-600 text-sm">Consectetur adipiscing elit, sed do eiusmod tempo.</p>
            <a href="#" className="text-blue-500 mt-2 inline-block">READ MORE</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProcessSection;
