import Link from "next/link";
import SplitReveal from "@/components/SplitReveal";
import Magnetic from "@/components/Magnetic";

// "• Label" eyebrow, used in section headers and page heroes
export function Eyebrow({ children, className = "" }) {
  return (
    <p className={`flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-gray-900 dark:text-white ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />
      {children}
    </p>
  );
}

// Round arrow button; arrow slides out and back in on hover of the parent .arrow-link.
// `className` sets its size and colours (default: outlined, fills red on hover).
export function ArrowCircle({ className = "w-10 h-10 border border-gray-300 dark:border-gray-600 group-hover:bg-red-500 group-hover:border-red-500 group-hover:text-white" }) {
  return (
    <Magnetic>
      <span className={`arrow-link__circle relative rounded-full overflow-hidden flex items-center justify-center ${className}`}>
        <svg className="arrow-link__icon w-4 h-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H3a1 1 0 110-2h7.586L8.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </span>
    </Magnetic>
  );
}

// "SEE MORE (→)" — label plus a magnetic round arrow button
export function ArrowLink({ href, children, className = "" }) {
  return (
    <Link href={href} className={`arrow-link group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-gray-900 dark:text-white ${className}`}>
      {children}
      <ArrowCircle />
    </Link>
  );
}

// Shared section header: hairline rule, eyebrow left, big title, optional link right.
// Pass `title` as an array of lines; with 2+ lines the first one is muted.
// `text` adds an intro paragraph under the title; `invert` is for always-dark sections.
export default function SectionHeader({ eyebrow, title, text, link, invert = false, className = "" }) {
  const lines = Array.isArray(title) ? title : [title];
  const styled = lines.length > 1
    ? [{ text: lines[0], className: invert ? "text-gray-500" : "text-gray-400 dark:text-gray-500" }, ...lines.slice(1)]
    : lines;

  return (
    <div className={`border-t pt-6 md:pt-8 mb-12 md:mb-16 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start ${invert ? "border-white/10" : "border-gray-200 dark:border-gray-800"} ${className}`}>
      <Eyebrow className={`md:col-span-3 md:pt-3 ${invert ? "!text-white" : ""}`}>{eyebrow}</Eyebrow>
      <div className={link ? "md:col-span-6" : "md:col-span-9"}>
        <SplitReveal
          text={styled}
          className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight ${invert ? "text-white" : "dark:text-white"}`}
        />
        {text && (
          <p className={`mt-6 max-w-2xl leading-relaxed ${invert ? "text-gray-400" : "text-gray-500 dark:text-gray-400"}`}>{text}</p>
        )}
      </div>
      {link && (
        <ArrowLink href={link.href} className={`md:col-span-3 md:justify-self-end ${invert ? "!text-white" : ""}`}>
          {link.label}
        </ArrowLink>
      )}
    </div>
  );
}
