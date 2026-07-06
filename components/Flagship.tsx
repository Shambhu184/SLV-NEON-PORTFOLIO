import { Icon } from "./Icons";
import Reveal from "./Reveal";
import DecoderDemo from "./DecoderDemo";

const OBJECTIVES = [
  "Decode speech intentions directly from brain signals",
  "Enable silent communication between individuals",
  "Assist people living with ALS, stroke, paralysis and speech impairments",
  "Hands-free control of computers, smartphones and smart devices",
  "Greater accessibility and independence for millions worldwide",
  "Advance the fusion of neuroscience, AI and BCI research",
];

const TAGS = ["BCI", "EEG", "NEUROSCIENCE", "DEEP LEARNING", "SPEECH DECODING", "HCI", "ASSISTIVE TECH"];

export default function Flagship() {
  return (
    <section className="section" id="mind-to-speech" style={{ paddingTop: 36 }}>
      <div className="container">
        <Reveal>
          <div className="flagship-wrap">
            <div className="flagship-grid">
              <div className="flagship">
                <span className="eyebrow">Our Flagship Project</span>
                <span className="status-pill">
                  <span className="dot" />
                  R&amp;D PHASE
                </span>
                <h2>Mind-to-Speech</h2>
                <p className="tagline">Silent communication. Limitless possibilities.</p>
                <p className="sub">
                  Our EEG-based Neuro-AI technology decodes imagined speech directly from brain
                  activity and converts intended words and sentences into natural speech and text —
                  in real time, without a single spoken word.
                </p>
                <ul className="objectives">
                  {OBJECTIVES.map((o) => (
                    <li key={o}>
                      <Icon id="ic-check" size={17} />
                      {o}
                    </li>
                  ))}
                </ul>
                <div className="tags">
                  {TAGS.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
              <Reveal delay={0.15}>
                <DecoderDemo />
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
