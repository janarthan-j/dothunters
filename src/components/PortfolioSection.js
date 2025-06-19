const PortfolioSection = () => {
  return (
    <section className="py-16 px-6 relative overflow-hidden">
      {/* PORTFOLIO text */}
      <div className="absolute top-16 left-6 text-gray-100 font-bold">
        <p className="text-2xl">PORTFOLIO</p>
      </div>
      
      {/* Background "Recent Projects" text */}
      <div className="absolute top-24 left-6 text-gray-100 opacity-30 pointer-events-none">
        <h2 className="text-[180px] font-bold leading-none">Recent<br/>Projects</h2>
      </div>
      
      {/* Content container */}
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row">
          {/* Left empty space to accommodate the background text */}
          <div className="md:w-1/2"></div>
          
          {/* Right side with heading and projects */}
          <div className="md:w-1/2">
            <h2 className="text-5xl font-bold text-black mb-16">Recent<br/>Projects</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Project 1 - Top right */}
              <div className="project-card">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80" 
                    alt="Project Muve Design" 
                    className="w-full h-[260px] object-cover"
                  />
                  <div className="absolute top-4 left-4 w-2 h-2 bg-black rounded-full"></div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-medium">Project Muve Design</h3>
                    <p className="text-gray-500">2023</p>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">UI/UX</p>
                </div>
              </div>
              
              {/* Project 2 - Bottom right (full width) */}
              <div className="project-card md:col-span-2">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" 
                    alt="Swimming Pool Project" 
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute top-4 left-4 w-2 h-2 bg-black rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Left side projects */}
        <div className="mt-12 md:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project 3 - Left column */}
            <div className="project-card md:mt-[-200px]">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" 
                  alt="Project 1" 
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute top-4 left-4 w-2 h-2 bg-black rounded-full"></div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-medium">Project Muve Design</h3>
                  <p className="text-gray-500">2023</p>
                </div>
                <p className="text-gray-500 text-sm mt-1">UI/UX</p>
              </div>
            </div>
            
            {/* Project 4 - Left column, second row */}
            <div className="project-card md:mt-[100px]">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80" 
                  alt="New York City Project" 
                  className="w-full h-[300px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
