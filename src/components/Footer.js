const Footer = () => {
    return (
      <footer className="bg-black text-white py-12 px-6 mt-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h5 className="font-bold text-lg mb-2">DotHunters</h5>
            <p>Rajagiriya, Colombo</p>
            <p>hello@dothunters.com</p>
            <p>+94 77 6660583</p>
          </div>
          <div>
            <h6 className="font-semibold mb-2">Quick Links</h6>
            <ul className="space-y-1 text-sm">
              <li>Home</li>
              <li>Services</li>
              <li>Culture</li>
              <li>Projects</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold mb-2">Services</h6>
            <ul className="space-y-1 text-sm">
              <li>UI/UX</li>
              <li>Web Development</li>
              <li>Mobile Development</li>
              <li>3D/VR and AR</li>
              <li>Motion Graphics</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-10">
          ©2022 dothunters.com All rights reserved. | Privacy Policy | Terms & conditions
        </div>
      </footer>
    );
  };
  
  export default Footer;
  