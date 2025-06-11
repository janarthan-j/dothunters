const services = [
    {
      title: "UI/UX Design",
      features: ["User friendly interface", "Nothing distracts from work", "Easy to start chatting"],
    },
    {
      title: "Web Development",
      features: ["User friendly interface", "Nothing distracts from work", "Easy to start chatting"],
    },
    {
      title: "3D/VR Game Development",
      features: ["User friendly interface", "Nothing distracts from work", "Easy to start chatting"],
    },
    {
      title: "Motion Graphics",
      features: ["User friendly interface", "Nothing distracts from work", "Easy to start chatting"],
    },
  ];
  
  const ServicesSection = () => {
    return (
        <section className="py-16 px-6 md:px-16 bg-white">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <ul className="space-y-2 text-sm text-gray-600 mb-4">
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <a href="#" className="text-blue-500 text-sm font-medium">See more</a>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default ServicesSection;
  