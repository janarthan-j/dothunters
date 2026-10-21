import Link from "next/link";
import ParallaxImage from "@/components/ParallaxImage";

// Frosted "TITLE [→]" label that sits on top of an image
export function FrostedPill({ children }) {
  return (
    <span className="absolute left-5 bottom-5 md:left-7 md:bottom-7 inline-flex items-center gap-4 rounded-xl bg-black/[0.45] backdrop-blur-md pl-5 pr-2 py-2 text-white text-sm font-semibold uppercase tracking-wide">
      {children}
      <span className="arrow-link__circle w-9 h-9 rounded-lg bg-white/[0.15] group-hover:bg-red-500 flex items-center justify-center overflow-hidden">
        <svg className="arrow-link__icon w-4 h-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H3a1 1 0 110-2h7.586L8.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </span>
    </span>
  );
}

// Rounded parallax image with a frosted title pill; `caption` goes underneath.
// Without `href` it renders as a plain block.
export default function MediaCard({ href, image, title, caption, className = "h-[300px] md:h-[360px]" }) {
  const Wrapper = href ? Link : "div";
  return (
    <Wrapper {...(href ? { href, "data-cursor": "View" } : {})} className="arrow-link group block">
      <div className="relative rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <ParallaxImage
          src={image}
          alt=""
          className={className}
          imgClassName="group-hover:scale-105 transition duration-700"
        />
        <FrostedPill>{title}</FrostedPill>
      </div>
      {caption && <p className="text-sm text-gray-400 dark:text-gray-500 mt-4">{caption}</p>}
    </Wrapper>
  );
}
