import { Icon } from "./Icons";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";
import DecodeText from "./DecodeText";
import NeuralField from "./NeuralField";
import EEGStrip from "./EEGStrip";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <NeuralField />
      <div className="hero-aurora" aria-hidden="true" />
      <div className="hex-chip chip-l" aria-hidden="true">
        <span className="dot" />
        SIM-EEG &middot; 256 Hz
      </div>
      <div className="hex-chip chip-r" aria-hidden="true">
        <span className="dot" />
        NEURO-AI DECODER &middot; ONLINE
      </div>
      <div className="container hero-center">
        <Reveal>
          <span className="eyebrow">Neuro-AI &middot; Brain-Computer Interfaces</span>
          <h1>
            <DecodeText className="line" text="Reimagining Communication." trigger="mount" waitForBoot delay={150} duration={950} />
            <DecodeText className="line accent" text="Through Thought." trigger="mount" waitForBoot delay={550} duration={950} />
          </h1>
          <p className="lede">
            SLVNEON builds next-generation Neuro-AI — brain-computer interfaces that decode neural
            signals, understand intent, and let people and machines communicate naturally.
          </p>
          <div className="hero-actions">
            <Magnetic>
              <a className="btn btn-solid" href="#mind-to-speech">
                Explore Mind-to-Speech <span className="arr">&rarr;</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-ghost" href="#contact">
                Contact Us
              </a>
            </Magnetic>
          </div>
          <ul className="hero-badges">
            <li>
              <Icon id="ic-brain" size={19} />
              Neurotechnology
            </li>
            <li>
              <Icon id="ic-spark" size={19} />
              AI-Powered
            </li>
            <li>
              <Icon id="ic-user" size={19} />
              Human-Centered
            </li>
          </ul>
        </Reveal>
      </div>
      <EEGStrip />
    </section>
  );
}
