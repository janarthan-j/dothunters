import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import SectionHeader, { Eyebrow } from "@/components/SectionHeader";
import { socials } from "@/components/Footer";

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
    a: "Yes. We work with clients across Sri Lanka and abroad, keeping projects moving with clear written updates and quick replies.",
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
      <PageHero
        eyebrow="Contact"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title={["Have a project in mind?", { text: "Let’s discuss.", className: "text-red-500" }]}
        intro="Tell us about your project and we’ll get back to you within 24 hours with thoughts, questions, and next steps."
      />

      {/* ── Form + Info ── */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-5">

          {/* Left — Contact info */}
          <aside className="lg:col-span-4 flex flex-col gap-5">
            <div className="rounded-[2rem] bg-gray-100 dark:bg-white/5 p-8">
              <Eyebrow className="mb-8">Get in touch</Eyebrow>
              <div className="space-y-6">
                {contactDetails.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center shrink-0 group-hover:bg-red-500 group-hover:text-white text-gray-500 dark:text-gray-400">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mb-0.5">{item.label}</p>
                      <p className="font-semibold text-gray-900 dark:text-white group-hover:text-red-500 transition">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-gray-900 dark:bg-white/5 text-white p-8">
              <h2 className="text-2xl font-bold leading-tight tracking-tight mb-6">
                Explore our socials
              </h2>
              <div className="flex gap-2 mb-8">
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
              <p className="flex items-center gap-3 text-sm text-gray-400">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                We typically respond within <span className="font-semibold text-white">24 hours</span>.
              </p>
            </div>
          </aside>

          {/* Right — Form */}
          <div className="lg:col-span-8 rounded-[2rem] border border-gray-200 dark:border-gray-800 p-6 md:p-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight dark:text-white mb-3">Let’s work together!</h2>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-10">[ Marked fields are required to fill ]</p>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="dot-bg py-24 bg-white/25 dark:bg-white/[0.03]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="FAQ"
            title={["Common", "questions."]}
            text="Don’t see your question here? Just send us a message and we’ll get back to you."
            className="border-gray-300 dark:border-gray-700"
          />
          <div className="lg:ml-[25%] divide-y divide-gray-300 dark:divide-gray-700 border-y border-gray-300 dark:border-gray-700">
            {faqs.map((faq) => (
              <details key={faq.q} className="faq group py-6">
                <summary className="flex items-center justify-between gap-6 cursor-pointer list-none text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                  {faq.q}
                  <span className="faq__icon relative w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 shrink-0 group-open:bg-red-500 group-open:border-red-500" aria-hidden="true" />
                </summary>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mt-4 max-w-2xl">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
