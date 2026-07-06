"use client";
import { useEffect } from "react";

type Spark = { x: number; y: number; vx: number; vy: number; life: number; max: number };

/**
 * Electrified custom cursor: glowing core + lagging charge ring, spark trail on
 * movement, crackle arcs near interactive elements, burst on click.
 * Also drives the card spotlight (mouse-following glow) via --mx/--my CSS vars.
 * Disabled for touch devices and prefers-reduced-motion.
 */
export default function ElectricCursor() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = document.createElement("canvas");
    canvas.className = "cursor-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      canvas.remove();
      return;
    }
    document.documentElement.classList.add("e-cursor");

    let w = 0;
    let h = 0;
    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();

    const mouse = { x: -100, y: -100, px: -100, py: -100, in: false, down: false, hot: false };
    const ring = { x: -100, y: -100, r: 15 };
    const sparks: Spark[] = [];
    let lastCard: HTMLElement | null = null;
    let raf = 0;

    const spawn = (n: number, speed: number) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * 6.2832;
        const s = (0.5 + Math.random()) * speed;
        sparks.push({
          x: mouse.x,
          y: mouse.y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s - 0.3,
          life: 0,
          max: 16 + Math.random() * 16,
        });
      }
      if (sparks.length > 120) sparks.splice(0, sparks.length - 120);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.in = true;
      const t = e.target as Element | null;
      mouse.hot = !!t?.closest?.("a, button, [role='button']");

      // mouse-following spotlight on cards
      const card = (t?.closest?.(".stage, .ind, .pillar, .founder") as HTMLElement | null) ?? null;
      if (card !== lastCard) {
        lastCard?.classList.remove("spot");
        card?.classList.add("spot");
        lastCard = card;
      }
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }

      const dist = Math.hypot(mouse.x - mouse.px, mouse.y - mouse.py);
      if (dist > 3 && Math.random() < Math.min(0.85, dist / 38)) spawn(1, 1.5);
      mouse.px = mouse.x;
      mouse.py = mouse.y;
    };
    const onDown = () => {
      mouse.down = true;
      spawn(16, 3.4);
    };
    const onUp = () => {
      mouse.down = false;
    };
    const onLeave = () => {
      mouse.in = false;
    };

    /** Short jittered arc shooting off the cursor. */
    const bolt = () => {
      const a = Math.random() * 6.2832;
      let x = mouse.x;
      let y = mouse.y;
      ctx.strokeStyle = "rgba(255,174,69,.75)";
      ctx.lineWidth = 1.1;
      ctx.shadowColor = "rgba(255,122,0,.9)";
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.moveTo(x, y);
      const segs = 3 + ((Math.random() * 3) | 0);
      for (let i = 0; i < segs; i++) {
        x += Math.cos(a) * (5 + Math.random() * 9) + (Math.random() - 0.5) * 9;
        y += Math.sin(a) * (5 + Math.random() * 9) + (Math.random() - 0.5) * 9;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      if (mouse.in) {
        ring.x += (mouse.x - ring.x) * 0.2;
        ring.y += (mouse.y - ring.y) * 0.2;
        const targetR = mouse.hot ? 26 : 15;
        ring.r += (targetR - ring.r) * 0.16;

        // spark trail
        for (let i = sparks.length - 1; i >= 0; i--) {
          const s = sparks[i];
          s.life++;
          if (s.life > s.max) {
            sparks.splice(i, 1);
            continue;
          }
          s.x += s.vx;
          s.y += s.vy;
          s.vx *= 0.96;
          s.vy = s.vy * 0.96 + 0.05;
          const a = 1 - s.life / s.max;
          ctx.strokeStyle = `rgba(255,${150 + ((Math.random() * 60) | 0)},40,${(a * 0.9).toFixed(2)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(
            s.x - s.vx * 2.4 + (Math.random() - 0.5) * 2,
            s.y - s.vy * 2.4 + (Math.random() - 0.5) * 2
          );
          ctx.stroke();
        }

        // crackle arcs — frequent over interactive elements, rare otherwise
        if (Math.random() < (mouse.hot ? 0.34 : 0.06)) bolt();

        // charge ring
        ctx.strokeStyle = mouse.hot ? "rgba(255,174,69,.95)" : "rgba(255,174,69,.6)";
        ctx.lineWidth = 1.4;
        ctx.shadowColor = "rgba(255,122,0,.8)";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r, 0, 6.2832);
        ctx.stroke();

        // core
        ctx.fillStyle = "#FFD9A0";
        ctx.shadowColor = "#FF7A00";
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.down ? 2.4 : 3.4, 0, 6.2832);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", fit);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", fit);
      lastCard?.classList.remove("spot");
      canvas.remove();
      document.documentElement.classList.remove("e-cursor");
    };
  }, []);

  return null;
}
