export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow">Capture Moments. Build Presence.</p>
          <h1 className="hero__title">
            Your Moments. <em>Our Creative Vision.</em>
          </h1>
          <p className="hero__text">
            From cinematic reels to professional brand storytelling, ReelRise transforms your ideas into content that
            makes an impact.
          </p>
          <div className="hero__actions">
            <a className="btn btn--gold" href="#book">
              Book Your Shoot
            </a>
            <a className="btn btn--ghost" href="#services">
              Explore Services
            </a>
          </div>
          <p className="hero__note">Custom Packages — Get a Quote</p>
        </div>

        <div className="hero__visual">
          <img
            src="/images/reelrise-poster.webp"
            srcSet="/images/reelrise-poster-sm.webp 480w, /images/reelrise-poster.webp 900w"
            sizes="(max-width: 900px) 80vw, 480px"
            width="900"
            height="900"
            alt="ReelRise.in — Create, Capture, Grow. Reels and video shoots, websites and portfolios, real estate media, events and coverage."
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
