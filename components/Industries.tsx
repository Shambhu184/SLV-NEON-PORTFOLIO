import { Icon } from "./Icons";
import Reveal from "./Reveal";

const ITEMS = [
  { icon: "ic-heart", title: "Healthcare", desc: "Faster neuro-diagnosis, patient monitoring and rehabilitation support." },
  { icon: "ic-assist", title: "Assistive Technologies", desc: "Independence for people with speech and motor impairments." },
  { icon: "ic-shield", title: "Defense", desc: "Secure, silent, hands-free communication in the field." },
  { icon: "ic-bank", title: "Research Institutions", desc: "Practical platforms for neuroscience discovery and validation." },
  { icon: "ic-cap", title: "Education", desc: "New ways to study attention, learning and cognition." },
  { icon: "ic-phone", title: "Consumer Electronics", desc: "Thought-driven control for the devices people use every day." },
  { icon: "ic-car", title: "Smart Mobility", desc: "Brain-aware safety, alertness and control systems." },
  { icon: "ic-vr", title: "AR / VR Ecosystems", desc: "Natural, controller-free interfaces for immersive worlds." },
];

export default function Industries() {
  return (
    <section className="section" id="solutions" style={{ paddingTop: 48 }}>
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Industries We Serve</span>
          <h2>One platform, many frontiers</h2>
          <p className="sub">
            Brain-driven technology changes what&apos;s possible across healthcare, defense,
            research and everyday life.
          </p>
        </Reveal>
        <div className="ind-grid">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} className="ind">
              <Icon id={item.icon} size={26} />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
