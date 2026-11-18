const STEPS = [
  { title: 'Choose Your Service', text: 'Pick the shoot category that fits your goal.' },
  { title: 'Submit Your Booking Request', text: 'Share your preferred date, time and location.' },
  { title: 'Our Team Confirms Your Slot', text: 'We check availability and contact you to confirm.' },
  { title: 'We Shoot, Edit & Deliver', text: 'Your finished reels are delivered, ready to post.' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section section--alt">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">Simple Process</p>
          <h2 className="section__title">How It Works</h2>
        </header>

        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.title} className="step">
              <span className="step__num" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__text">{s.text}</p>
            </li>
          ))}
        </ol>

        <p className="notice" role="note">
          <strong>Please note:</strong> submitting a request does not guarantee a confirmed slot. ReelRise will contact
          you to confirm availability.
        </p>
      </div>
    </section>
  );
}
