import { Icon, LogoMark } from "./Icons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container foot-inner">
        <div className="foot-left">
          <LogoMark size={34} />
          <span>&copy; 2026 SLVNEON Technologies Pvt. Ltd. All rights reserved.</span>
        </div>
        <div className="socials">
          <a href="#" aria-label="LinkedIn"><Icon id="ic-in" size={17} /></a>
          <a href="#" aria-label="X"><Icon id="ic-x" size={15} /></a>
          <a href="#" aria-label="YouTube"><Icon id="ic-yt" size={17} /></a>
        </div>
        <div className="foot-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
}
