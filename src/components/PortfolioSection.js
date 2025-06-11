const PortfolioSection = () => {
    return (
      <section className="py-16 px-6 bg-gray-100">
        <h3 className="text-3xl font-bold text-center mb-12">Recent Projects</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4">
              <h4 className="text-xl font-semibold">Project Muve Design 2023</h4>
              <p className="text-sm text-gray-500">UI/UX</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <a href="#" className="text-blue-600">See All</a>
        </div>
      </section>
    );
  };
  
  export default PortfolioSection;
  