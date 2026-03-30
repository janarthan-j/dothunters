import Link from "next/link";
import ContactForm from "@/components/ContactForm";

const contactDetails = [
  {
    label: "Email us",
    value: "hello@dothunters.com",
    href: "mailto:hello@dothunters.com",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Call us",
    value: "+94 77 666 0583",
    href: "tel:+94776660583",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: "Visit us",
    value: "New Boundary Road, Batticaloa, Sri Lanka",
    href: "https://maps.google.com",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "It depends on scope. A branding or UI project usually takes 3–6 weeks. A full web app or SaaS product is typically 8–16 weeks for an MVP.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes — the majority of our clients are remote. We work across time zones and use async-first communication to keep projects moving.",
  },
  {
    q: "Can you work within a fixed budget?",
    a: "Absolutely. We'll scope the project to your budget and be upfront about what's achievable within it — no surprises.",
  },
  {
    q: "What happens after we launch?",
    a: "We offer ongoing retainer support, maintenance packages, and sprint-based iteration plans so your product keeps improving post-launch.",
  },
];

export default function ContactPage() {
  return (
    <main id="contact">
      {/* ── Page Hero ── */}
      <section className="dot-bg bg-gray-50 dark:bg-gray-800 py-24 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="uppercase tracking-widest text-gray-400 dark:text-gray-500 text-sm mb-4">Contact</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-3xl mb-6 dark:text-white">
            Let&apos;s build something <span className="text-red-500">great together.</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl">
            Tell us about your project and we&apos;ll get back to you within 24 hours with thoughts, questions, and next steps.
          </p>
        </div>
      </section>

      {/* ── Form + Info ── */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-16">

          {/* Left — Contact info */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-8 dark:text-white">Get in touch</h2>

            {/* Contact details */}
            <div className="space-y-6 mb-12">
              {contactDetails.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-red-50 dark:group-hover:bg-red-900/20 group-hover:text-red-500 transition text-gray-500 dark:text-gray-400">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-0.5">{item.label}</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-red-500 transition">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Follow us</p>
              <div className="flex gap-3">
                <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Behance" className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.49.36-1.06.62-1.71.79-.65.17-1.32.25-2.02.25H0V4.51h6.938v-.007zM6.52 10.92c.574 0 1.04-.14 1.402-.42.36-.28.54-.73.54-1.35 0-.34-.06-.62-.18-.85-.12-.22-.29-.4-.51-.53-.22-.13-.47-.22-.75-.27-.29-.05-.6-.07-.93-.07H2.73v3.49h3.79zm.234 5.4c.37 0 .71-.04 1.03-.12.32-.08.596-.21.83-.38.23-.17.413-.4.545-.67.13-.27.195-.61.195-1.01 0-.8-.225-1.37-.676-1.72-.45-.35-1.045-.52-1.785-.52H2.73v4.42h4.024zm9.5-9.2c.866 0 1.64.17 2.32.51.68.34 1.25.81 1.7 1.41.46.6.8 1.3 1.02 2.1.22.8.33 1.66.33 2.59h-8.3c.05.9.32 1.58.82 2.06.5.47 1.16.71 1.98.71.62 0 1.14-.14 1.55-.42.41-.28.7-.6.88-.97h2.7c-.43 1.32-1.09 2.28-1.97 2.87-.88.59-1.95.88-3.2.88-.87 0-1.66-.14-2.37-.41-.71-.27-1.31-.66-1.82-1.16-.5-.5-.89-1.1-1.16-1.82-.28-.71-.42-1.51-.42-2.39 0-.85.14-1.64.43-2.36.28-.72.68-1.34 1.18-1.86.5-.52 1.1-.92 1.79-1.21.69-.29 1.45-.44 2.26-.44l.04.01zm-.04 2.05c-.73 0-1.34.2-1.84.59-.5.39-.8.98-.92 1.79h5.27c-.07-.77-.32-1.35-.76-1.74-.44-.4-.98-.59-1.75-.59v-.05zm-3.64-5.45h5.83v1.59h-5.83V3.68z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Response time badge */}
            <div className="mt-10 flex items-center gap-3 border border-gray-100 dark:border-gray-700 rounded-xl p-4 bg-gray-50 dark:bg-gray-800">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We typically respond within <span className="font-semibold text-gray-900 dark:text-white">24 hours</span>.
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-8 dark:text-white">Project brief</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            <div>
              <p className="uppercase tracking-widest text-gray-400 dark:text-gray-500 text-sm mb-3">FAQ</p>
              <h2 className="text-3xl font-bold mb-4 dark:text-white">Common questions.</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Don&apos;t see your question here? Just send us a message and we&apos;ll get back to you.
              </p>
            </div>
            <div className="lg:col-span-2 space-y-0 divide-y divide-gray-200 dark:divide-gray-700">
              {faqs.map((faq, i) => (
                <div key={i} className="py-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services teaser ── */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-gray-400 text-sm max-w-md">
            Not sure which service you need? Browse what we offer and we&apos;ll help you figure out the best fit.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-white text-white px-6 py-3 rounded-full text-sm font-medium transition shrink-0"
          >
            Explore our services
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H3a1 1 0 110-2h7.586L8.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
