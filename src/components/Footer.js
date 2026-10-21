import Image from "next/image";
import Link from "next/link";
import { ArrowCircle } from "@/components/SectionHeader";

export const socials = [
  {
    label: "LinkedIn",
    href: "#",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    label: "Behance",
    href: "#",
    path: "M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.49.36-1.06.62-1.71.79-.65.17-1.32.25-2.02.25H0V4.51h6.938v-.007zM6.52 10.92c.574 0 1.04-.14 1.402-.42.36-.28.54-.73.54-1.35 0-.34-.06-.62-.18-.85-.12-.22-.29-.4-.51-.53-.22-.13-.47-.22-.75-.27-.29-.05-.6-.07-.93-.07H2.73v3.49h3.79zm.234 5.4c.37 0 .71-.04 1.03-.12.32-.08.596-.21.83-.38.23-.17.413-.4.545-.67.13-.27.195-.61.195-1.01 0-.8-.225-1.37-.676-1.72-.45-.35-1.045-.52-1.785-.52H2.73v4.42h4.024zm9.5-9.2c.866 0 1.64.17 2.32.51.68.34 1.25.81 1.7 1.41.46.6.8 1.3 1.02 2.1.22.8.33 1.66.33 2.59h-8.3c.05.9.32 1.58.82 2.06.5.47 1.16.71 1.98.71.62 0 1.14-.14 1.55-.42.41-.28.7-.6.88-.97h2.7c-.43 1.32-1.09 2.28-1.97 2.87-.88.59-1.95.88-3.2.88-.87 0-1.66-.14-2.37-.41-.71-.27-1.31-.66-1.82-1.16-.5-.5-.89-1.1-1.16-1.82-.28-.71-.42-1.51-.42-2.39 0-.85.14-1.64.43-2.36.28-.72.68-1.34 1.18-1.86.5-.52 1.1-.92 1.79-1.21.69-.29 1.45-.44 2.26-.44l.04.01zm-.04 2.05c-.73 0-1.34.2-1.84.59-.5.39-.8.98-.92 1.79h5.27c-.07-.77-.32-1.35-.76-1.74-.44-.4-.98-.59-1.75-.59v-.05zm-3.64-5.45h5.83v1.59h-5.83V3.68z",
  },
];

const links = [
  { label: "services", href: "/services" },
  { label: "projects", href: "/projects" },
  { label: "products", href: "/products" },
  { label: "culture", href: "/culture" },
  { label: "contact", href: "/contact" },
];

// Line-art globe: meridians as ellipses, parallels as chords
const R = 200;
const meridians = Array.from({ length: 9 }, (_, i) => R * Math.cos((i * Math.PI) / 18));
const parallels = Array.from({ length: 11 }, (_, i) => -R + ((i + 1) * 2 * R) / 12);

const Globe = ({ className }) => (
  <svg viewBox="-205 -205 410 410" fill="none" stroke="currentColor" strokeWidth="0.75" aria-hidden="true" className={className}>
    <circle r={R} />
    {meridians.map((rx, i) => <ellipse key={i} rx={rx} ry={R} />)}
    {parallels.map((y, i) => {
      const half = Math.sqrt(R * R - y * y);
      return <line key={i} x1={-half} x2={half} y1={y} y2={y} />;
    })}
  </svg>
);

const Footer = () => {
  return (
    <footer className="site-footer bg-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top rule */}
        <div className="flex justify-between gap-4 text-sm text-gray-400 border-b border-white/10 pb-5 mb-5">
          <span>. Creative digital studio</span>
          <span>. Batticaloa, Sri Lanka</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-5">
          {/* Main card */}
          <div className="relative lg:col-span-8 rounded-[2rem] bg-white/[0.04] border border-white/10 p-8 md:p-10 overflow-hidden flex flex-col min-h-[460px]">
            <Globe className="absolute -right-24 -top-16 w-[460px] h-[460px] text-white/[0.07] pointer-events-none" />

            <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-8 border-b border-white/10 pb-10">
              <h2 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
                <span className="text-gray-500">Let&rsquo;s</span>
                <br />
                start your project
              </h2>
              <Link
                href="/get-started"
                className="arrow-link group shrink-0 self-start inline-flex items-center gap-4 bg-white text-gray-900 rounded-full pl-6 pr-1.5 py-1.5 text-xs font-semibold uppercase tracking-widest hover:bg-red-500 hover:text-white"
              >
                Get in touch
                <ArrowCircle className="w-10 h-10 bg-gray-900 text-white group-hover:bg-white group-hover:text-red-500" />
              </Link>
            </div>

            <div className="relative mt-auto pt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <Link href="/" aria-label="DotHunters home" className="inline-block mb-5">
                  <Image src="/logo/logo-horizontal-white.png" alt="DotHunters" width={797} height={200} className="h-11 w-auto" />
                </Link>
                <p className="text-xs uppercase tracking-wider text-gray-400 leading-relaxed">
                  Digital products that look great and perform better.
                  <br />
                  &copy; {new Date().getFullYear()} DotHunters. All rights reserved.
                </p>
              </div>
              <nav aria-label="Footer" className="flex flex-wrap md:justify-end gap-2 md:max-w-xs">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="rounded-full border border-white/20 px-5 py-2.5 text-sm text-gray-200 hover:bg-white hover:text-gray-900 hover:border-white"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Socials + contact card */}
          <div className="lg:col-span-4 rounded-[2rem] bg-white/[0.04] border border-white/10 p-8 md:p-10 flex flex-col">
            <h3 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight mb-8">
              Explore the socials
              <br />
              <span className="text-gray-500">of DotHunters</span>
            </h3>
            <div className="flex gap-2 mb-12">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-gray-300 hover:bg-white hover:text-gray-900 hover:border-white"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>

            <dl className="mt-auto space-y-5 text-sm">
              <div>
                <dt className="text-gray-500 mb-1">Email</dt>
                <dd><a href="mailto:hello@dothunters.com" className="text-gray-200 hover:text-red-400 transition">hello@dothunters.com</a></dd>
              </div>
              <div>
                <dt className="text-gray-500 mb-1">Phone</dt>
                <dd><a href="tel:+94776660583" className="text-gray-200 hover:text-red-400 transition">+94 77 666 0583</a></dd>
              </div>
              <div>
                <dt className="text-gray-500 mb-1">Studio</dt>
                <dd className="text-gray-200">New Boundary Road, Batticaloa, Sri Lanka</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Legal */}
        <div className="flex justify-end gap-6 text-xs text-gray-500 pt-8">
          <a href="#" className="hover:text-gray-300 transition">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300 transition">Terms &amp; Conditions</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
