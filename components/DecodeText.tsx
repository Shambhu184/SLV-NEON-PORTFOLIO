"use client";
import { useEffect, useRef } from "react";

const GLYPHS = "ΞΨΔ01<>#%/&λβμ";

/**
 * Renders the final text on the server (SEO-safe), then scrambles it into
 * place on the client — characters resolve left to right like a decoder.
 */
export default function DecodeText({
  text,
  className = "",
  delay = 0,
  duration = 900,
  trigger = "view",
  waitForBoot = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  trigger?: "mount" | "view";
  waitForBoot?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.textContent = text;
      return;
    }

    let raf = 0;
    let timeout = 0;
    let cancelled = false;

    const run = () => {
      const t0 = performance.now();
      const step = (now: number) => {
        if (cancelled) return;
        const p = Math.min(1, (now - t0) / duration);
        const reveal = Math.floor(p * text.length);
        let out = text.slice(0, reveal);
        for (let i = reveal; i < text.length; i++) {
          out += text[i] === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        el.textContent = out;
        if (p < 1) raf = requestAnimationFrame(step);
        else el.textContent = text;
      };
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      timeout = window.setTimeout(run, delay);
    };

    const begin = () => {
      if (waitForBoot && document.documentElement.dataset.booted !== "1") {
        const onBoot = () => start();
        window.addEventListener("slv:booted", onBoot, { once: true });
        return () => window.removeEventListener("slv:booted", onBoot);
      }
      start();
      return undefined;
    };

    let removeBootListener: (() => void) | undefined;
    let io: IntersectionObserver | undefined;

    if (trigger === "mount") {
      removeBootListener = begin();
    } else {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              removeBootListener = begin();
              io?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      io.observe(el);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
      removeBootListener?.();
      io?.disconnect();
    };
  }, [text, delay, duration, trigger, waitForBoot]);

  return (
    <span className={`decode ${className}`}>
      {/* ghost reserves the final text's exact layout so the scramble never reflows the page */}
      <span className="decode-ghost" aria-hidden="true">
        {text}
      </span>
      <span ref={ref} className="decode-anim">
        {text}
      </span>
    </span>
  );
}
