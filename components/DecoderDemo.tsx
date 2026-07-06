"use client";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icons";

const PHRASES = [
  "Hello, how are you?",
  "I would like some water.",
  "Turn on the lights.",
  "Call my doctor, please.",
  "Thank you for listening.",
];

export default function DecoderDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [typed, setTyped] = useState("");
  const [step, setStep] = useState(-1);
  const [speaking, setSpeaking] = useState(false);
  const energy = useRef({ cur: 0.25, target: 0.25 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let t = 0;
    let raf = 0;
    let alive = true;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(() => alive && fn(), ms));
    };

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

    const draw = () => {
      const e = energy.current;
      e.cur += (e.target - e.cur) * 0.06;
      const mid = h / 2;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "#F7941D";
      ctx.lineWidth = 1.8;
      ctx.shadowColor = "rgba(255,122,0,.6)";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      for (let i = 0; i <= w; i += 2) {
        const k = i / w;
        const env = Math.sin(k * Math.PI); // taper both ends
        const v = Math.sin(i * 0.11 + t * 3.1) * Math.sin(i * 0.027 + t * 1.4);
        const y = mid + v * env * h * 0.42 * e.cur * 2.1;
        if (i === 0) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
      t += 0.035;
    };

    fit();
    draw();

    if (reduced) {
      setTyped(PHRASES[0]);
      setStep(2);
      return;
    }

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);

    let phraseIndex = 0;
    const cycle = () => {
      const phrase = PHRASES[phraseIndex % PHRASES.length];
      phraseIndex++;
      setTyped("");
      setSpeaking(false);
      setStep(0);
      energy.current.target = 0.55; // capture
      later(() => {
        setStep(1);
        energy.current.target = 1; // decode
        later(() => {
          setStep(2);
          setSpeaking(true);
          energy.current.target = 0.45; // speak / type
          let i = 0;
          const typeId = window.setInterval(() => {
            if (!alive) return clearInterval(typeId);
            i++;
            setTyped(phrase.slice(0, i));
            if (i >= phrase.length) {
              clearInterval(typeId);
              later(() => {
                setSpeaking(false);
                const eraseId = window.setInterval(() => {
                  if (!alive) return clearInterval(eraseId);
                  i--;
                  setTyped(phrase.slice(0, Math.max(0, i)));
                  if (i <= 0) {
                    clearInterval(eraseId);
                    energy.current.target = 0.25;
                    later(cycle, 500);
                  }
                }, 14);
                timers.push(eraseId);
              }, 1900);
            }
          }, 46);
          timers.push(typeId);
        }, 950);
      }, 850);
    };
    cycle();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      timers.forEach((id) => {
        clearTimeout(id);
        clearInterval(id);
      });
    };
  }, []);

  return (
    <div className={`demo${speaking ? " speaking" : ""}`}>
      <div className="demo-bar">
        <span>MIND-TO-SPEECH &middot; LIVE DEMO</span>
        <span className="rec">
          <i />
          SIMULATED
        </span>
      </div>
      <div className="demo-flow">
        <div className="demo-node" title="Brain signals (EEG)">
          <Icon id="ic-brain" size={28} />
        </div>
        <canvas ref={canvasRef} className="demo-wave" aria-hidden="true" />
        <div className="demo-node node-out" title="Speech output">
          <Icon id="ic-speaker" size={26} />
        </div>
      </div>
      <div className="demo-bubble">
        <span className="small">DECODED SPEECH</span>
        <p className="demo-text" aria-live="polite">
          <span>{typed}</span>
          <span className="caret" />
        </p>
      </div>
      <div className="demo-steps">
        <span className={step === 0 ? "on" : ""}>01 &middot; EEG CAPTURE</span>
        <span className={step === 1 ? "on" : ""}>02 &middot; NEURO-AI DECODING</span>
        <span className={step === 2 ? "on" : ""}>03 &middot; SPEECH OUT</span>
      </div>
    </div>
  );
}
