import { NAV_LINKS, SITE } from '../config/site.js';
import { mailtoGeneralUrl, whatsappGeneralUrl } from '../config/booking.js';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <p className="brand brand--footer">
            <img className="brand__mark" src="/images/reelrise-mark.webp" alt="" width="36" height="36" />
            <span className="brand__text">
              Reel<span>Rise</span>
            </span>
          </p>
          <p className="footer__tagline">{SITE.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="footer__heading">Quick Links</h2>
          <ul className="footer__list">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="footer__heading">Get in Touch</h2>
          <ul className="footer__list">
            <li>
              <a href={whatsappGeneralUrl()} target="_blank" rel="noopener noreferrer">
                WhatsApp: {SITE.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={mailtoGeneralUrl()}>{SITE.email}</a>
            </li>
            <li>
              {SITE.instagramUrl ? (
                <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              ) : (
                <span className="footer__muted">Instagram — coming soon</span>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {year} {SITE.name}.in — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
