"use client";
import { useEffect, useRef } from "react";

export default function EEGStrip() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let x = 0;
    let spike = 0;
    let raf = 0;

    const fit = () => {
      const r = canvas.getBoundingClientRect();
      if (r.width === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const sample = (px: number) => {
      let v =
        Math.sin(px * 0.045) * 0.32 +
        Math.sin(px * 0.013) * 0.42 +
        Math.sin(px * 0.21) * 0.1 +
        (Math.random() - 0.5) * 0.18;
      if (Math.random() < 0.004) spike = 1;
      if (spike > 0) {
        v += Math.sin(spike * Math.PI) * 1.5;
        spike -= 0.12;
        if (spike < 0) spike = 0;
      }
      return v;
    };

    const draw = () => {
      const mid = h / 2;
      const amp = h * 0.34;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(146,166,196,.18)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, mid);
      ctx.lineTo(w, mid);
      ctx.stroke();
      ctx.strokeStyle = "#F7941D";
      ctx.lineWidth = 1.6;
      ctx.shadowColor = "rgba(255,122,0,.55)";
      ctx.shadowBlur = 7;
      ctx.beginPath();
      for (let i = 0; i < w; i += 2) {
        const y = mid + sample(x + i) * amp;
        if (i === 0) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    fit();
    draw();
    if (!reduced) {
      const loop = () => {
        x += 0.8;
        draw();
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }
    const ro = new ResizeObserver(() => {
      fit();
      draw();
    });
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="eeg-strip">
      <div className="container eeg-inner">
        <span className="eeg-label">
          <b>CH-01</b> / SIMULATED EEG
        </span>
        <canvas ref={canvasRef} className="eeg-canvas" aria-hidden="true" />
        <span className="eeg-label">
          LIVE &middot; <b>247 Hz</b>
        </span>
      </div>
    </div>
  );
}
