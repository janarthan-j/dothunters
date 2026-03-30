const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top row */}
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className={`text-2xl font-bold mb-4`}>
              <span className="text-red-500">Dot</span>Hunters
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              A creative studio crafting digital products that look great and perform even better.
            </p>
            {/* Social icons */}
            <div className="flex gap-4">
              {/* LinkedIn */}
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              {/* Behance */}
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Behance">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.49.36-1.06.62-1.71.79-.65.17-1.32.25-2.02.25H0V4.51h6.938v-.007zM6.52 10.92c.574 0 1.04-.14 1.402-.42.36-.28.54-.73.54-1.35 0-.34-.06-.62-.18-.85-.12-.22-.29-.4-.51-.53-.22-.13-.47-.22-.75-.27-.29-.05-.6-.07-.93-.07H2.73v3.49h3.79zm.234 5.4c.37 0 .71-.04 1.03-.12.32-.08.596-.21.83-.38.23-.17.413-.4.545-.67.13-.27.195-.61.195-1.01 0-.8-.225-1.37-.676-1.72-.45-.35-1.045-.52-1.785-.52H2.73v4.42h4.024zm9.5-9.2c.866 0 1.64.17 2.32.51.68.34 1.25.81 1.7 1.41.46.6.8 1.3 1.02 2.1.22.8.33 1.66.33 2.59h-8.3c.05.9.32 1.58.82 2.06.5.47 1.16.71 1.98.71.62 0 1.14-.14 1.55-.42.41-.28.7-.6.88-.97h2.7c-.43 1.32-1.09 2.28-1.97 2.87-.88.59-1.95.88-3.2.88-.87 0-1.66-.14-2.37-.41-.71-.27-1.31-.66-1.82-1.16-.5-.5-.89-1.1-1.16-1.82-.28-.71-.42-1.51-.42-2.39 0-.85.14-1.64.43-2.36.28-.72.68-1.34 1.18-1.86.5-.52 1.1-.92 1.79-1.21.69-.29 1.45-.44 2.26-.44l.04.01zm-.04 2.05c-.73 0-1.34.2-1.84.59-.5.39-.8.98-.92 1.79h5.27c-.07-.77-.32-1.35-.76-1.74-.44-.4-.98-.59-1.75-.59v-.05zm-3.64-5.45h5.83v1.59h-5.83V3.68z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className={`font-semibold text-sm uppercase tracking-widest text-gray-400 mb-5`}>Navigation</h6>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/services" className="hover:text-white transition">Services</a></li>
              <li><a href="#" className="hover:text-white transition">Culture</a></li>
              <li><a href="/projects" className="hover:text-white transition">Projects</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h6 className={`font-semibold text-sm uppercase tracking-widest text-gray-400 mb-5`}>Services</h6>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="/services" className="hover:text-white transition">UI/UX Design</a></li>
              <li><a href="/services" className="hover:text-white transition">Web Development</a></li>
              <li><a href="/services" className="hover:text-white transition">Mobile Development</a></li>
              <li><a href="/services" className="hover:text-white transition">3D / VR & AR</a></li>
              <li><a href="/services" className="hover:text-white transition">Motion Graphics</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h6 className={`font-semibold text-sm uppercase tracking-widest text-gray-400 mb-5`}>Contact</h6>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                New Boundary Road, Batticaloa, <br/>Sri Lanka
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:hello@dothunters.com" className="hover:text-white transition">hello@dothunters.com</a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+94776660583" className="hover:text-white transition">+94 77 666 0583</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} DotHunters. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
