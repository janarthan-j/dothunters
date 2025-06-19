
const Navbar = () => {
    return (
      <header className="flex justify-between items-center px-10 py-6 bg-transparent sticky top-0 z-50">
        <div className="text-2xl font-bold">
          <span className="text-red-500">Dot</span>Hunters
        </div>
        <nav className="space-x-6 text-sm font-medium">
          <a href="#" className="hover:text-gray-600">Home</a>
          <a href="#" className="hover:text-gray-600">Services</a>
          <a href="#" className="hover:text-gray-600">Culture</a>
          <a href="#" className="hover:text-gray-600">Projects</a>
          <a href="#" className="hover:text-gray-600">Contact</a>
        </nav>
      </header>
    );
  };
  
  export default Navbar;
