import { useRef, useState } from 'react';
import { SHOOT_CATEGORIES, TIME_SLOTS } from '../config/site.js';
import {
  EMPTY_BOOKING,
  buildBookingMessage,
  buildMailtoUrl,
  buildWhatsAppUrl,
  formatDate,
  todayISO,
  validateBooking,
} from '../config/booking.js';

const FIELD_ORDER = ['fullName', 'whatsapp', 'email', 'category', 'date', 'time', 'location', 'reels', 'notes'];

function Field({ id, label, required = false, error, hint, children }) {
  return (
    <div className={`field${error ? ' field--error' : ''}`}>
      <label htmlFor={id}>
        {label}
        {required ? <span className="field__req" aria-hidden="true"> *</span> : <span className="field__opt"> (optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="field__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default function BookingForm() {
  const [values, setValues] = useState(EMPTY_BOOKING);
  const [errors, setErrors] = useState({});
  const [prepared, setPrepared] = useState(null); // snapshot of values once validated
  const [copied, setCopied] = useState(false);
  const resultRef = useRef(null);
  const formRef = useRef(null);

  const minDate = todayISO();

  const aria = (id, name) => ({
    id,
    name,
    value: values[name],
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${id}-error` : undefined,
    onChange: (e) => {
      const { value } = e.target;
      setValues((v) => ({ ...v, [name]: value }));
      if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
    },
  });

  const handleBlur = (name) => () => {
    const found = validateBooking(values)[name];
    setErrors((er) => ({ ...er, [name]: found }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validateBooking(values);
    setErrors(found);
    const firstBad = FIELD_ORDER.find((k) => found[k]);
    if (firstBad) {
      formRef.current?.querySelector(`[name="${firstBad}"]`)?.focus();
      return;
    }
    setPrepared({ ...values });
    setCopied(false);
    // Move focus to the confirmation so screen-reader and keyboard users land on it
    setTimeout(() => resultRef.current?.focus(), 0);
  };

  const handleEdit = () => {
    setPrepared(null);
    setTimeout(() => formRef.current?.querySelector('[name="fullName"]')?.focus(), 0);
  };

  const handleReset = () => {
    setValues(EMPTY_BOOKING);
    setErrors({});
    setPrepared(null);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildBookingMessage(prepared));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="book" className="section">
      <div className="container container--narrow">
        <header className="section__head">
          <p className="eyebrow">Book a Slot</p>
          <h2 className="section__title">Request your shoot</h2>
          <p className="section__lead">
            Fill in the details below. Bookings are confirmed manually by our team — nothing is reserved until we
            reply.
          </p>
        </header>

        {prepared ? (
          <div className="result" ref={resultRef} tabIndex={-1} aria-live="polite">
            <h3 className="result__title">Your booking request is ready to send</h3>
            <p className="result__text">
              Your request has <strong>not been sent yet</strong>. Choose WhatsApp or Email below, then press{' '}
              <strong>Send</strong> in WhatsApp or your email app. ReelRise will manually confirm availability and
              contact you — this is not a confirmed booking.
            </p>

            <dl className="summary">
              <div><dt>Name</dt><dd>{prepared.fullName}</dd></div>
              <div><dt>WhatsApp</dt><dd>{prepared.whatsapp}</dd></div>
              <div><dt>Email</dt><dd>{prepared.email}</dd></div>
              <div><dt>Category</dt><dd>{prepared.category}</dd></div>
              <div><dt>Date</dt><dd>{formatDate(prepared.date)}</dd></div>
              <div><dt>Time</dt><dd>{prepared.time}</dd></div>
              <div><dt>Location</dt><dd>{prepared.location}</dd></div>
              <div><dt>Reels</dt><dd>{prepared.reels}</dd></div>
              {prepared.notes.trim() && (
                <div><dt>Notes</dt><dd>{prepared.notes}</dd></div>
              )}
            </dl>

            <div className="result__actions">
              <a className="btn btn--gold" href={buildWhatsAppUrl(prepared)} target="_blank" rel="noopener noreferrer">
                Send via WhatsApp
              </a>
              <a className="btn btn--ghost" href={buildMailtoUrl(prepared)}>
                Send via Email
              </a>
            </div>

            <div className="result__secondary">
              <button type="button" className="link-btn" onClick={handleEdit}>
                ← Edit details
              </button>
              <button type="button" className="link-btn" onClick={handleCopy}>
                {copied ? 'Copied ✓' : 'Copy message'}
              </button>
              <button type="button" className="link-btn" onClick={handleReset}>
                Start a new request
              </button>
            </div>
          </div>
        ) : (
          <form ref={formRef} className="form" onSubmit={handleSubmit} noValidate>
            <div className="form__grid">
              <Field id="fullName" label="Full Name" required error={errors.fullName}>
                <input type="text" autoComplete="name" placeholder="e.g. Ravi Kumar" onBlur={handleBlur('fullName')} {...aria('fullName', 'fullName')} />
              </Field>

              <Field id="whatsapp" label="WhatsApp Number" required error={errors.whatsapp} hint="Include country code, e.g. +91 98765 43210">
                <input type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" onBlur={handleBlur('whatsapp')} {...aria('whatsapp', 'whatsapp')} />
              </Field>

              <Field id="email" label="Email Address" required error={errors.email}>
                <input type="email" autoComplete="email" placeholder="you@example.com" onBlur={handleBlur('email')} {...aria('email', 'email')} />
              </Field>

              <Field id="category" label="Shoot Category" required error={errors.category}>
                <select onBlur={handleBlur('category')} {...aria('category', 'category')}>
                  <option value="">Select a category</option>
                  {SHOOT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>

              <Field id="date" label="Preferred Shoot Date" required error={errors.date}>
                <input type="date" min={minDate} onBlur={handleBlur('date')} {...aria('date', 'date')} />
              </Field>

              <Field id="time" label="Preferred Time" required error={errors.time}>
                <select onBlur={handleBlur('time')} {...aria('time', 'time')}>
                  <option value="">Select a time</option>
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </Field>

              <Field id="location" label="Shoot Location" required error={errors.location}>
                <input type="text" autoComplete="off" placeholder="Area / venue, city" onBlur={handleBlur('location')} {...aria('location', 'location')} />
              </Field>

              <Field id="reels" label="Number of Reels Required" required error={errors.reels}>
                <input type="number" inputMode="numeric" min="1" max="100" step="1" placeholder="e.g. 4" onBlur={handleBlur('reels')} {...aria('reels', 'reels')} />
              </Field>

              <div className="form__full">
                <Field id="notes" label="Additional Requirements" error={errors.notes}>
                  <textarea rows="4" maxLength={1000} placeholder="Style, references, props, event details, deadlines…" {...aria('notes', 'notes')} />
                </Field>
              </div>
            </div>

            <p className="form__note">
              Bookings are manually confirmed. Submitting prepares your request — you then send it through WhatsApp or
              Email yourself. Pricing is custom: you will receive a quote from our team.
            </p>

            <button type="submit" className="btn btn--gold btn--block">
              Prepare Booking Request
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
