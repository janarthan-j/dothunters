import Link from "next/link";
import SplitReveal from "@/components/SplitReveal";
import { Eyebrow, ArrowCircle, ArrowLink } from "@/components/SectionHeader";

// Rounded call-to-action card. Defaults are the homepage copy; pages pass their own.
const CTASection = ({
  eyebrow = "Let’s connect",
  title = ["Have a project in mind?", { text: "Let’s build it.", className: "text-red-500" }],
  text = "Whether you’re launching something new or improving what you have — we’d love to hear about it. Drop us a message and we’ll get back to you within 24 hours.",
  primary = { href: "/get-started", label: "Start a project" },
  secondary = { href: "/projects", label: "View our work" },
}) => {
  return (
    <section className="dot-bg py-16 md:py-20 bg-white/25 dark:bg-white/[0.03]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border border-white/60 dark:border-white/10 rounded-[2rem] glass px-6 md:px-14 py-12 md:py-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="max-w-2xl">
            <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
            <SplitReveal
              text={title}
              className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight dark:text-white"
            />
            {text && (
              <p className="text-gray-500 dark:text-gray-400 mt-6 leading-relaxed max-w-lg">{text}</p>
            )}
          </div>

          <div className="flex items-center gap-8 flex-wrap shrink-0">
            <Link
              href={primary.href}
              className="arrow-link group inline-flex items-center gap-4 bg-red-500 text-white rounded-full pl-7 pr-1.5 py-1.5 text-xs font-semibold uppercase tracking-widest hover:bg-gray-900 dark:hover:bg-white dark:hover:text-gray-900"
            >
              {primary.label}
              <ArrowCircle className="w-11 h-11 bg-white text-red-500 group-hover:text-gray-900" />
            </Link>
            {secondary && <ArrowLink href={secondary.href}>{secondary.label}</ArrowLink>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
