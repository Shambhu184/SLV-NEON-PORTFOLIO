"use client";
import { useRef, type ReactNode } from "react";

/** Wraps a button/link so it gently follows the cursor within its bounds. */
export default function Magnetic({ children, strength = 0.32 }: { children: ReactNode; strength?: number }) {
  const wrap = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = wrap.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const inner = el.firstElementChild as HTMLElement | null;
    if (!inner) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    const dy = (e.clientY - (r.top + r.height / 2)) * strength;
    inner.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
  };

  const onLeave = () => {
    const inner = wrap.current?.firstElementChild as HTMLElement | null;
    if (inner) inner.style.transform = "";
  };

  return (
    <span ref={wrap} className="magnetic" onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </span>
  );
}
