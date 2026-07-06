"use client";
import { useRef } from "react";
import { Icon } from "./Icons";
import Reveal from "./Reveal";

const STAGES = [
  { title: "Data Acquisition", desc: "A non-invasive EEG headset records electrical activity across the scalp as the user imagines speaking.", out: "RAW EEG SIGNALS" },
  { title: "Signal Preprocessing", desc: "Filtering and normalization stabilize the raw streams and prepare them for deeper analysis.", out: "STABLE STREAM" },
  { title: "Artifact Removal", desc: "ICA and artifact suppression strip out blinks, muscle movement and electrical interference.", out: "CLEANED EEG DATA" },
  { title: "Feature Extraction", desc: "Time\u2013frequency analysis surfaces the spectral patterns tied to imagined speech.", out: "SPECTRAL MAPS" },
  { title: "Feature Selection", desc: "Dimensionality reduction keeps only the features that carry real linguistic meaning.", out: "FEATURE VECTORS" },
  { title: "Brain-to-Word Model", desc: "A deep learning network maps neural features to the words the user intended to say.", out: "PREDICTED TEXT" },
  { title: "Language Processing", desc: "NLP and context correction turn raw predictions into fluent, grammatical sentences.", out: "REFINED TEXT" },
  { title: "Text & Speech Output", desc: "The result is rendered as on-screen text and synthesized into natural-sounding speech.", out: "SPEECH + TEXT" },
];

export default function Pipeline() {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el || e.pointerType === "touch") return; // native touch scrolling is better
    drag.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft };
    el.classList.add("dragging");
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el || !drag.current.down) return;
    el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
  };
  const endDrag = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el || !drag.current.down) return;
    drag.current.down = false;
    el.classList.remove("dragging");
    el.releasePointerCapture(e.pointerId);
  };

  return (
    <section className="section" id="research">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Inside the Pipeline</span>
          <h2>From brain signal to spoken word</h2>
          <p className="sub">
            The Mind-to-Speech system is an end-to-end pipeline: every stage refines raw neural
            activity a step closer to natural language. Drag to follow the signal &rarr;
          </p>
        </Reveal>
        <Reveal>
          <div
            className="pipe-scroll"
            ref={scroller}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div className="pipe-track">
              {STAGES.map((s, i) => (
                <div className="stage" key={s.title}>
                  <div className="stage-top">
                    <span className="stage-idx">{String(i + 1).padStart(2, "0")}</span>
                    <span className="stage-pulse" style={{ animationDelay: `${i * 1.2}s` }} />
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <span className="stage-out">&rarr; {s.out}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="pipe-foot">
            <div>
              <span className="eyebrow">Applications</span>
              <div className="apps">
                <span><Icon id="ic-assist" size={19} />Assistive Devices</span>
                <span><Icon id="ic-phone" size={19} />Smart Control</span>
                <span><Icon id="ic-heart" size={19} />Healthcare &amp; Rehab</span>
                <span><Icon id="ic-chat" size={19} />Communication Aid</span>
              </div>
            </div>
            <div className="loop">
              <Icon id="ic-loop" size={26} />
              <span>
                <strong style={{ color: "var(--ink)" }}>Adaptive feedback loop</strong> — every
                output returns to the model, so the system learns each user&apos;s brain a little
                better with every word.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
