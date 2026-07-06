"use client";
import { useEffect, useState } from "react";
import { LogoMark } from "./Icons";

const LINES = [
  "SLVNEON NEURO-OS v2.1.0",
  "> establishing neural link ......... OK",
  "> calibrating EEG channels ..... 256/256",
  "> loading decoder weights ......... OK",
  "> speech synthesizer .......... ONLINE",
];

const STEP_MS = 230;
const HOLD_MS = 420;

export default function Preloader() {
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const finish = (instant: boolean) => {
      document.documentElement.dataset.booted = "1";
      window.dispatchEvent(new Event("slv:booted"));
      try {
        sessionStorage.setItem("slv_boot", "1");
      } catch {
        /* private mode — ignore */
      }
      if (instant) {
        setGone(true);
      } else {
        setDone(true);
        window.setTimeout(() => setGone(true), 650);
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem("slv_boot") === "1";
    } catch {
      /* ignore */
    }
    if (reduced || seen) {
      finish(true);
      return;
    }

    const timers: number[] = [];
    LINES.forEach((_, i) => {
      timers.push(window.setTimeout(() => setShown(i + 1), STEP_MS * (i + 1)));
    });
    timers.push(window.setTimeout(() => finish(false), STEP_MS * LINES.length + HOLD_MS));
    return () => timers.forEach(clearTimeout);
  }, []);

  if (gone) return null;

  const progress = Math.round((shown / LINES.length) * 100);

  return (
    <div className={`boot${done ? " done" : ""}`} role="status" aria-label="Loading SLVNEON">
      <div className="boot-card">
        <div className="boot-head">
          <span className="boot-logo">
            <LogoMark size={40} />
          </span>
          <span className="wordmark">SLVNEON</span>
        </div>
        <div className="boot-lines">
          {LINES.map((line, i) => (
            <p key={line} className={i < shown ? "show" : ""}>
              {i === 0 ? <b>{line}</b> : line}
            </p>
          ))}
        </div>
        <div className="boot-bar">
          <i style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
