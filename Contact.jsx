import { SITE } from '../config/site.js';
import { mailtoGeneralUrl, whatsappGeneralUrl } from '../config/booking.js';

export default function Contact() {
  return (
    <section id="contact" className="section section--alt">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">Contact</p>
          <h2 className="section__title">Let's create something great</h2>
          <p className="section__lead">Questions or a custom quote? Reach out directly.</p>
        </header>

        <div className="contact">
          <a className="contact__item" href={whatsappGeneralUrl()} target="_blank" rel="noopener noreferrer">
            <span className="contact__label">WhatsApp</span>
            <span className="contact__value">{SITE.whatsappDisplay}</span>
          </a>
          <a className="contact__item" href={mailtoGeneralUrl()}>
            <span className="contact__label">Email</span>
            <span className="contact__value">{SITE.email}</span>
          </a>
          <div className="contact__item contact__item--static">
            <span className="contact__label">Brand</span>
            <span className="contact__value">
              {SITE.name}.in
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
