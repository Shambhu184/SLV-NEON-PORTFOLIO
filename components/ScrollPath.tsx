"use client";
import { useEffect, useRef } from "react";

/**
 * A neural "signal trace" that weaves down the whole page behind the content.
 * The path draws itself in sync with scroll; a glowing charge node rides the tip.
 */
export default function ScrollPath() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    const glow = glowRef.current;
    const line = lineRef.current;
    const dot = dotRef.current;
    if (!wrap || !svg || !glow || !line || !dot) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let len = 0;
    let H = 0;
    let raf = 0;

    const build = () => {
      const W = document.documentElement.clientWidth;
      H = document.documentElement.scrollHeight;
      wrap.style.height = `${H}px`;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

      // weave between the page margins, starting just below the hero fold
      const xs = [0.5, 0.07, 0.93, 0.06, 0.94, 0.08, 0.92, 0.5];
      const top = Math.min(940, H * 0.14);
      const bottom = H - 220;
      const span = bottom - top;
      const segs = xs.length - 1;
      let d = `M ${W * xs[0]} ${top}`;
      for (let i = 1; i <= segs; i++) {
        const y0 = top + (span * (i - 1)) / segs;
        const y1 = top + (span * i) / segs;
        const x0 = W * xs[i - 1];
        const x1 = W * xs[i];
        d += ` C ${x0} ${(y0 + y1) / 2}, ${x1} ${(y0 + y1) / 2}, ${x1} ${y1}`;
      }
      line.setAttribute("d", d);
      glow.setAttribute("d", d);
      len = line.getTotalLength();
      line.style.strokeDasharray = `${len}`;
      glow.style.strokeDasharray = `${len}`;
      update();
    };

    const update = () => {
      const max = H - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (reduced) {
        line.style.strokeDashoffset = "0";
        glow.style.strokeDashoffset = "0";
        dot.style.opacity = "0";
        return;
      }
      const drawn = len * p;
      line.style.strokeDashoffset = `${len - drawn}`;
      glow.style.strokeDashoffset = `${len - drawn}`;
      if (drawn > 1) {
        const pt = line.getPointAtLength(drawn);
        dot.setAttribute("transform", `translate(${pt.x}, ${pt.y})`);
        dot.style.opacity = "1";
      } else {
        dot.style.opacity = "0";
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", build);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", build);
    };
  }, []);

  return (
    <div ref={wrapRef} className="scroll-path" aria-hidden="true">
      <svg ref={svgRef} preserveAspectRatio="none">
        <path ref={glowRef} className="sp-glow" />
        <path ref={lineRef} className="sp-line" />
        <g ref={dotRef} className="sp-dot" style={{ opacity: 0 }}>
          <circle className="sp-dot-ring" r="11" />
          <circle className="sp-dot-core" r="4" />
        </g>
      </svg>
    </div>
  );
}
