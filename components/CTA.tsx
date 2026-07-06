import { Icon } from "./Icons";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section className="section" id="contact" style={{ paddingTop: 24 }}>
      <div className="container">
        <Reveal>
          <div className="cta-card">
            <div>
              <span className="eyebrow">Partner With Us</span>
              <h2>Let&apos;s build the future together.</h2>
              <p className="sub">
                Partner with us in advancing Brain-Computer Interface technology and Neuro-AI
                innovation — from research collaborations to real-world deployments.
              </p>
              <div className="cta-actions">
                <Magnetic>
                  <a className="btn btn-solid" href="mailto:info@slvneon.com?subject=Partnership%20with%20SLVNEON">
                    Become a Partner <span className="arr">&rarr;</span>
                  </a>
                </Magnetic>
                <Magnetic>
                  <a className="btn btn-ghost" href="mailto:info@slvneon.com?subject=Research%20Collaboration">
                    Contact Research Team
                  </a>
                </Magnetic>
              </div>
            </div>
            <div className="contact-list">
              <a href="mailto:info@slvneon.com">
                <span className="ic"><Icon id="ic-mail" size={19} /></span>
                info@slvneon.com
              </a>
              <div className="row">
                <span className="ic"><Icon id="ic-call" size={19} /></span>
                <span>
                  <a href="tel:+917070911804" style={{ display: "inline" }}>+91 70709 11804</a>
                  {", "}
                  <a href="tel:+916206833733" style={{ display: "inline" }}>+91 62068 33733</a>
                </span>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Pahalwan+Complex+J.P+Road+Bagbera+Jamshedpur+Jharkhand+831002"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="ic"><Icon id="ic-pin" size={19} /></span>
                Pahalwan Complex J.P Road Bagbera, Jamshedpur, Jharkhand (INDIA) -831002
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
