import { Space_Grotesk } from 'next/font/google'
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const services = [
    {
      title: "UI/UX Design",
      icon: (
        <svg className="w-16 h-16 mb-6" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12H52V52H12V12Z" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 22H52" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 52V22" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      features: ["User friendly interface", "Nothing distracts from work", "Easy to start chatting"],
    },
    {
      title: "Web Development",
      icon: (
        <svg className="w-16 h-16 mb-6" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 12L52 32L32 52L12 32L32 12Z" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="32" cy="32" r="6" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      features: ["User friendly interface", "Nothing distracts from work", "Easy to start chatting"],
    },
    {
      title: "3D/VR Game Development",
      icon: (
        <svg className="w-16 h-16 mb-6" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22H52V42H12V22Z" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M32 12V22" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M32 42V52" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="32" cy="32" r="6" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      features: ["User friendly interface", "Nothing distracts from work", "Easy to start chatting"],
    },
    {
      title: "Motion Graphics",
      icon: (
        <svg className="w-16 h-16 mb-6" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="12" width="40" height="40" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 32L30 42L44 22" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      features: ["User friendly interface", "Nothing distracts from work", "Easy to start chatting"],
    },
  ];
  
  const ServicesSection = () => {
    return (
      <section className="py-16 px-6 md:px-16 bg-white">
        <div className="container mx-auto">
          {/* Section header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-gray-500 font-medium tracking-wide">SERVICES</h2>
            <a href="/services" className="flex items-center text-gray-700 hover:text-gray-900 transition">
              View All Services 
              <svg className="w-5 h-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          
          {/* Main heading */}
          <h1 className={`${spaceGrotesk.className} text-4xl md:text-5xl font-bold mb-12 max-w-3xl`}>
            We help you to go online & increase your conversion rate.
          </h1>
          
          {/* Service cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className={`border rounded-lg p-8 hover:shadow-lg transition ${index === 0 ? 'border-red-400' : 'border-gray-200'}`}
              >
                {service.icon}
                <h3 className={`${spaceGrotesk.className} text-xl font-bold mb-4`}>{service.title}</h3>
                <ul className="space-y-3 text-sm text-gray-600 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-gray-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="#" className="flex items-center text-gray-700 hover:text-gray-900 text-sm font-medium">
                  See more
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H3a1 1 0 110-2h7.586L8.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default ServicesSection;
