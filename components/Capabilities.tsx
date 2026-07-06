import { Icon } from "./Icons";
import Reveal from "./Reveal";

const CAPS = [
  { icon: "ic-chip", label: "Brain-Computer Interfaces" },
  { icon: "ic-wave", label: "Mind-to-Speech Systems" },
  { icon: "ic-brain", label: "Neural Signal Processing" },
  { icon: "ic-net", label: "AI & Deep Learning" },
  { icon: "ic-assist", label: "Assistive Technologies" },
  { icon: "ic-chat", label: "Human-Machine Communication" },
];

export default function Capabilities() {
  return (
    <section className="section" id="technologies">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">About SLVNEON</span>
          <h2>Building the future of neurotechnology</h2>
          <p className="sub">
            We develop intelligent BCI systems and Neuro-AI solutions that decode neural signals,
            understand intent, and enable natural communication between humans and machines.
          </p>
        </Reveal>
        <div className="caps-grid">
          {CAPS.map((cap, i) => (
            <Reveal key={cap.label} delay={i * 0.07} className="cap">
              <div className="cap-hex">
                <Icon id={cap.icon} size={38} />
              </div>
              <h3>{cap.label}</h3>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
