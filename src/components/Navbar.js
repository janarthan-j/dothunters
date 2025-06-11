
const Navbar = () => {
    return (
      <header className="flex justify-between items-center px-10 py-6 bg-white shadow-md sticky top-0 z-50">
        <div className="text-2xl font-bold">DotHunters</div>
        <nav className="space-x-6 text-sm uppercase font-medium">
          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">Culture</a>
          <a href="#">Projects</a>
          <a href="#">Contact</a>
        </nav>
      </header>
    );
  };
  
  export default Navbar;
  