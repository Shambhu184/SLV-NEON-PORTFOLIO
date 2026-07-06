import { Icon } from "./Icons";
import Reveal from "./Reveal";

const WHY = [
  "Deep focus on neurotechnology & BCI",
  "AI-driven research and innovation",
  "Real-world impact and accessible solutions",
  "Scalable, secure and reliable systems",
  "A passionate team of researchers & engineers",
];

const MISSION = [
  "Build portable, practical BCI devices and software for daily use",
  "Advance research in human brain behavior and function",
  "Make medical diagnosis and neuro-interaction faster and easier",
  "Enable seamless device control through direct brain signals",
  "Drive the future of AI & robotics through neuroscience",
];

export default function Pillars() {
  return (
    <section className="section" id="company" style={{ paddingTop: 36 }}>
      <div className="container">
        <div className="pillars-grid">
          <Reveal className="pillar">
            <div className="pillar-head">
              <Icon id="ic-spark" size={24} />
              <h3>Why SLVNEON?</h3>
            </div>
            <ul>
              {WHY.map((w) => (
                <li key={w}>
                  <Icon id="ic-check" size={16} />
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="pillar feature">
            <div className="pillar-head">
              <Icon id="ic-eye" size={24} />
              <h3>Our Vision</h3>
            </div>
            <p className="vision-quote">
              To unlock the true potential of the human brain — making life{" "}
              <em>smarter, healthier, faster and more connected</em>, with brain-driven technology
              as a natural part of everyday living.
            </p>
            <p>
              A future where neuroscience, AI, machine learning and robotics work together to
              create more humanized, adaptive and intelligent technologies for society.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="pillar">
            <div className="pillar-head">
              <Icon id="ic-target" size={24} />
              <h3>Our Mission</h3>
            </div>
            <ul>
              {MISSION.map((m) => (
                <li key={m}>
                  <Icon id="ic-check" size={16} />
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
