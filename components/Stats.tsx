"use client";
import { useEffect, useRef, useState } from "react";
import DecodeText from "./DecodeText";

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVal(end);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          const t0 = performance.now();
          const dur = 1200;
          const step = (now: number) => {
            const p = Math.min(1, (now - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(eased * end));
            if (p < 1) raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
        });
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end]);

  return (
    <span ref={ref} className="num">
      {val}
      {suffix && <em>{suffix}</em>}
    </span>
  );
}

export default function Stats() {
  return (
    <div className="stats">
      <div className="container stats-grid">
        <div className="stat">
          <CountUp end={10} suffix="+" />
          <span className="lbl">Research Initiatives</span>
        </div>
        <div className="stat">
          <CountUp end={3} suffix="+" />
          <span className="lbl">Published Papers</span>
        </div>
        <div className="stat">
          <CountUp end={1} />
          <span className="lbl">Flagship BCI Platform</span>
        </div>
        <div className="stat">
          <span className="num word">
            <DecodeText text="1" duration={700} />
          </span>
          <span className="lbl">Academic Collaborations</span>
        </div>
      </div>
    </div>
  );
}
