"use client";
import { Fragment, useEffect, useRef } from "react";

// Heading whose words slide up from behind a mask, staggered, when scrolled
// into view. `text` is a string or an array of lines; a line can be
// { text, className } to tint it (e.g. a muted first line or a red accent).
export default function SplitReveal({ as: Tag = "h2", text, className = "", delay = 0, stagger = 45 }) {
  const ref = useRef(null);
  const lines = (Array.isArray(text) ? text : [text]).map((l) =>
    typeof l === "string" ? { text: l, className: "" } : l
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  let wordIndex = 0;

  return (
    <Tag ref={ref} className={`split-reveal ${className}`} aria-label={lines.map((l) => l.text).join(" ")}>
      {lines.map((line, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          <span className={line.className} aria-hidden="true">
            {line.text.split(" ").map((word, wi) => (
              <Fragment key={wi}>
                {wi > 0 && " "}
                <span className="split-word">
                  <span className="split-word__inner" style={{ transitionDelay: `${delay + wordIndex++ * stagger}ms` }}>
                    {word}
                  </span>
                </span>
              </Fragment>
            ))}
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}
