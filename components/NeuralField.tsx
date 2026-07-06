"use client";
import { useEffect, useRef } from "react";

type NeuralNode = {
  x: number;
  y: number;
  bx: number;
  by: number;
  r: number;
  p: number;
  sp: number;
  hub: boolean;
};
type Pulse = { ax: number; ay: number; b: NeuralNode; t: number; sp: number };

/** Full-bleed mouse-reactive synapse network behind the hero content. */
export default function NeuralField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let t = 0;
    let raf = 0;
    let nodes: NeuralNode[] = [];
    let pulses: Pulse[] = [];
    const mouse = { x: -1e4, y: -1e4, in: false };

    const fit = () => {
      const r = wrap.getBoundingClientRect();
      if (r.width === 0) return false;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return true;
    };

    const build = () => {
      if (!fit()) return;
      nodes = [];
      pulses = [];
      const N = Math.min(110, Math.max(46, Math.round((w * h) / 16000)));
      for (let i = 0; i < N; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const hub = Math.random() < 0.11;
        nodes.push({
          x,
          y,
          bx: x,
          by: y,
          r: hub ? 3.2 : 1.3 + Math.random() * 1.3,
          p: Math.random() * 6.28,
          sp: 0.4 + Math.random() * 0.7,
          hub,
        });
      }
    };

    const nearest = (x: number, y: number): NeuralNode | null => {
      let best = Infinity;
      let found: NeuralNode | null = null;
      for (const n of nodes) {
        const d = (n.x - x) ** 2 + (n.y - y) ** 2;
        if (d < best) {
          best = d;
          found = n;
        }
      }
      return found;
    };

    /** Fire a synapse: random→neighbor normally; random→cursor-node when hovered. */
    const spawnPulse = () => {
      if (nodes.length < 2) return;
      const a = nodes[(Math.random() * nodes.length) | 0];
      let b: NeuralNode | null = null;
      if (mouse.in && Math.random() < 0.6) {
        b = nearest(mouse.x, mouse.y);
        if (b === a) b = null;
      }
      if (!b) {
        let best = Infinity;
        for (const n of nodes) {
          if (n === a) continue;
          const d = (n.x - a.x) ** 2 + (n.y - a.y) ** 2;
          if (d < best && d > 400) {
            best = d;
            b = n;
          }
        }
      }
      if (b) pulses.push({ ax: a.x, ay: a.y, b, t: 0, sp: 0.015 + Math.random() * 0.013 });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.016;

      // drift + gentle attraction toward the cursor
      for (const n of nodes) {
        n.x = n.bx + Math.sin(t * n.sp + n.p) * 6;
        n.y = n.by + Math.cos(t * n.sp * 0.9 + n.p) * 6;
        if (mouse.in) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < 150 && d > 1) {
            const pull = (1 - d / 150) * 10;
            n.x += (dx / d) * pull;
            n.y += (dy / d) * pull;
          }
        }
      }

      // edges
      const maxD = Math.min(w, h) * 0.17;
      const maxD2 = maxD * maxD;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxD2) {
            const alpha = (1 - d2 / maxD2) * 0.13;
            ctx.strokeStyle = `rgba(150,170,205,${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // cursor halo
      if (mouse.in) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 90);
        g.addColorStop(0, "rgba(247,148,29,.12)");
        g.addColorStop(1, "rgba(247,148,29,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 90, 0, 6.2832);
        ctx.fill();
      }

      // nodes
      for (const n of nodes) {
        const nearMouse = mouse.in && Math.hypot(mouse.x - n.x, mouse.y - n.y) < 100;
        ctx.fillStyle = n.hub ? "#F7941D" : nearMouse ? "#FFC987" : "rgba(214,226,244,.6)";
        if (n.hub) {
          ctx.shadowColor = "rgba(255,122,0,.85)";
          ctx.shadowBlur = 13;
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, 6.2832);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // travelling pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.sp;
        if (p.t >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const px = p.ax + (p.b.x - p.ax) * p.t;
        const py = p.ay + (p.b.y - p.ay) * p.t;
        ctx.strokeStyle = `rgba(247,148,29,${(0.38 * (1 - p.t)).toFixed(3)})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(p.ax, p.ay);
        ctx.lineTo(px, py);
        ctx.stroke();
        ctx.fillStyle = "#FFB85C";
        ctx.shadowColor = "rgba(255,140,0,1)";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(px, py, 2.4, 0, 6.2832);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.in = mouse.y >= 0 && mouse.y <= r.height;
    };
    const onPointerLeave = () => {
      mouse.in = false;
      mouse.x = -1e4;
      mouse.y = -1e4;
    };

    build();
    if (reduced) {
      spawnPulse();
      draw();
      const ro = new ResizeObserver(() => {
        build();
        draw();
      });
      ro.observe(wrap);
      return () => ro.disconnect();
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    const interval = window.setInterval(() => {
      if (pulses.length < 8) spawnPulse();
    }, 360);
    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const ro = new ResizeObserver(() => build());
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(interval);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="hero-field" ref={wrapRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
