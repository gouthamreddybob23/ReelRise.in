import ServiceCard from '../components/ServiceCard.jsx';

const svg = (children) => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const ICONS = {
  camera: svg(
    <>
      <rect x="2.5" y="6" width="14" height="12" rx="2" />
      <path d="m16.5 10 5-3v10l-5-3" />
    </>
  ),
  edit: svg(
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <path d="M8 7.5 20 18M8 16.5 20 6" />
    </>
  ),
  event: svg(
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
      <path d="m12 12.5.9 1.9 2.1.3-1.5 1.5.4 2.1-1.9-1-1.9 1 .4-2.1L9 14.7l2.1-.3z" />
    </>
  ),
  building: svg(
    <>
      <path d="M3 21h18M5 21V9l7-5 7 5v12" />
      <path d="M9 21v-6h6v6M9 11h.01M15 11h.01" />
    </>
  ),
  package: svg(
    <>
      <path d="M21 8 12 3 3 8v8l9 5 9-5z" />
      <path d="m3 8 9 5 9-5M12 13v8" />
    </>
  ),
};

const SERVICES = [
  {
    icon: ICONS.camera,
    title: 'Reels Shoot',
    description:
      'Professional on-location shooting designed for vertical, scroll-stopping reels that look cinematic on every phone.',
  },
  {
    icon: ICONS.edit,
    title: 'Professional Editing',
    description:
      'Tight cuts, colour grading, music sync and captions — every reel is polished to fit your brand and platform.',
  },
  {
    icon: ICONS.event,
    title: 'Events & Celebrations',
    description:
      'Weddings, birthdays, launches and functions captured as highlight reels you will want to share again and again.',
  },
  {
    icon: ICONS.building,
    title: 'Real Estate & Business Promotions',
    description:
      'Property walkthroughs, showroom tours and brand promos that build trust and bring in enquiries.',
  },
  {
    icon: ICONS.package,
    title: 'Complete Reels Package',
    description: 'One team from idea to upload. Everything you need to show up consistently online.',
    points: ['Professional reels shooting', 'Video editing', 'Final reel delivery', 'Social media posting support'],
    featured: true,
  },
];

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">What We Do</p>
          <h2 className="section__title">Services built for impact</h2>
          <p className="section__lead">
            Whether you are selling a home, promoting a brand or celebrating a milestone, ReelRise creates content that
            gets noticed.
          </p>
        </header>

        <div className="grid grid--services">
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
