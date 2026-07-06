"use client";
import { useState } from "react";
import { Icon } from "./Icons";
import Reveal from "./Reveal";

type Founder = {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  linkedin?: string;
  email?: string;
  phone?: string;
};

const FOUNDERS: Founder[] = [
  {
    name: "Shambhu Nath",
    role: "Founder & CEO",
    bio: "Leads SLVNEON's vision to decode neural signals into natural communication, driving research and product across Brain-Computer Interface technology.",
    photo: "/founders/shambhu-nath.jpeg",
    linkedin: "https://www.linkedin.com/in/shambhu-nath-1b644a265/",
    email: "shambhu.nath@slvneon.com",
    phone: "+916206833733",
  },
  {
    name: "Sarthi Raju Itankar",
    role: "Co-Founder & CTO",
    bio: "Leads hardware R&D for SLVNEON's neurotechnology — building the electrodes, signal-acquisition systems and BCI devices behind our platform.",
    photo: "/founders/Sarthi-Itanker.jpeg",
    linkedin: "https://www.linkedin.com/in/sarthi-itankar/",
    email: "sarthi.raju@slvneon.com",
    phone: "+918010840278",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Avatar({ name, photo }: { name: string; photo?: string }) {
  const [failed, setFailed] = useState(false);
  if (photo && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="founder-avatar founder-photo"
        src={photo}
        alt={name}
        onError={() => setFailed(true)}
      />
    );
  }
  return <div className="founder-avatar">{initials(name)}</div>;
}

export default function Founders() {
  return (
    <section className="section" id="founders" style={{ paddingTop: 36 }}>
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">Leadership</span>
          <h2>Meet the founders</h2>
          <p className="sub">
            The people building SLVNEON — bridging neuroscience, AI and engineering to make
            brain-driven technology part of everyday life.
          </p>
        </Reveal>
        <div className="founders-grid">
          {FOUNDERS.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.1} className="founder">
              <Avatar name={f.name} photo={f.photo} />
              <h3>{f.name}</h3>
              <span className="founder-role">{f.role}</span>
              <p>{f.bio}</p>
              <div className="founder-socials">
                {f.linkedin && (
                  <a href={f.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${f.name} on LinkedIn`}>
                    <Icon id="ic-in" size={17} />
                  </a>
                )}
                {f.phone && (
                  <a href={`tel:${f.phone}`} aria-label={`Call ${f.name}`}>
                    <Icon id="ic-call" size={17} />
                  </a>
                )}
                {f.email && (
                  <a href={`mailto:${f.email}`} aria-label={`Email ${f.name}`}>
                    <Icon id="ic-mail" size={17} />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
