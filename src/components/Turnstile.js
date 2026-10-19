"use client";
import { useEffect, useRef } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

// Without a site key (local dev) the widget is skipped and the server skips verification too.
export const turnstileEnabled = Boolean(SITE_KEY);

let scriptPromise;
function loadScript() {
  if (window.turnstile) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = resolve;
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error("Failed to load Turnstile"));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

// Tokens are single-use: change `resetKey` to get a fresh one (e.g. after a failed submit).
export default function Turnstile({ onToken, resetKey }) {
  const containerRef = useRef(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  useEffect(() => {
    if (!SITE_KEY) return;
    let widgetId;
    let cancelled = false;

    loadScript()
      .then(() => {
        if (cancelled || !containerRef.current) return;
        widgetId = window.turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          callback: (token) => onTokenRef.current(token),
          "expired-callback": () => onTokenRef.current(""),
          "error-callback": () => onTokenRef.current(""),
        });
      })
      .catch((err) => console.error(err));

    return () => {
      cancelled = true;
      onTokenRef.current("");
      if (widgetId !== undefined) window.turnstile?.remove(widgetId);
    };
  }, [resetKey]);

  if (!SITE_KEY) return null;
  return <div ref={containerRef} className="min-h-[65px]" />;
}
