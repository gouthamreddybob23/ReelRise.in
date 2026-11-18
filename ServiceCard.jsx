export default function ServiceCard({ icon, title, description, points = [], featured = false }) {
  return (
    <article className={`card${featured ? ' card--featured' : ''}`}>
      <div className="card__icon" aria-hidden="true">
        {icon}
      </div>
      <h3 className="card__title">{title}</h3>
      <p className="card__text">{description}</p>
      {points.length > 0 && (
        <ul className="card__list">
          {points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}
      {featured && <p className="card__quote">Custom Packages — Get a Quote</p>}
    </article>
  );
}
