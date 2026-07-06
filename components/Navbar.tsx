"use client";
import { useEffect, useState } from "react";
import { LogoMark } from "./Icons";
import Magnetic from "./Magnetic";

const LINKS = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#technologies", label: "Technologies", id: "technologies" },
  { href: "#mind-to-speech", label: "Mind-to-Speech", id: "mind-to-speech" },
  { href: "#research", label: "Research", id: "research" },
  { href: "#solutions", label: "Solutions", id: "solutions" },
  { href: "#company", label: "Company", id: "company" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!sections.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header className={`nav${scrolled ? " scrolled" : ""}${open ? " open" : ""}`}>
        <div className="container nav-inner">
          <a className="brand" href="#home" aria-label="SLVNEON home">
            <LogoMark size={42} />
            <span className="wordmark">SLVNEON</span>
          </a>
          <nav className="nav-links" aria-label="Primary">
            {LINKS.map((l) => (
              <a key={l.id} href={l.href} className={active === l.id ? "active" : ""}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="nav-cta">
            <Magnetic>
              <a className="btn btn-solid" href="#contact">
                Get in Touch
              </a>
            </Magnetic>
            <button
              className="burger"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <nav className={`mobile-menu${open ? " open" : ""}`} aria-label="Mobile">
        {LINKS.map((l) => (
          <a key={l.id} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)}>
          Get in Touch
        </a>
      </nav>
    </>
  );
}
