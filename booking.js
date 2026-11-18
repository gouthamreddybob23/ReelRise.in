// Pure booking helpers (no React, no DOM) so they can be unit-tested with Node.
// V2 note: replace the link builders with an API call when a backend exists.

import { SITE, SHOOT_CATEGORIES, TIME_SLOTS } from './site.js';

export const EMPTY_BOOKING = {
  fullName: '',
  whatsapp: '',
  email: '',
  category: '',
  date: '',
  time: '',
  location: '',
  reels: '',
  notes: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Local-time YYYY-MM-DD for "today" (avoids UTC off-by-one for India etc.). */
export function todayISO(now = new Date()) {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Returns an object of { field: message }. Empty object means valid. */
export function validateBooking(values, now = new Date()) {
  const errors = {};
  const v = (k) => (values[k] ?? '').toString().trim();

  if (v('fullName').length < 2) errors.fullName = 'Please enter your full name.';

  const digits = v('whatsapp').replace(/[^\d]/g, '');
  if (!v('whatsapp')) errors.whatsapp = 'Please enter your WhatsApp number.';
  else if (!/^[+\d][\d\s\-()]*$/.test(v('whatsapp')) || digits.length < 10 || digits.length > 15)
    errors.whatsapp = 'Enter a valid number (10–15 digits, e.g. +91 98765 43210).';

  if (!v('email')) errors.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(v('email'))) errors.email = 'Enter a valid email address.';

  if (!SHOOT_CATEGORIES.includes(v('category'))) errors.category = 'Please choose a shoot category.';

  if (!v('date')) errors.date = 'Please pick your preferred date.';
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(v('date')) || Number.isNaN(Date.parse(v('date'))))
    errors.date = 'Enter a valid date.';
  else if (v('date') < todayISO(now)) errors.date = 'Please choose today or a future date.';

  if (!TIME_SLOTS.includes(v('time'))) errors.time = 'Please choose a preferred time.';

  if (v('location').length < 3) errors.location = 'Please tell us where the shoot will take place.';

  const reels = Number(v('reels'));
  if (!v('reels')) errors.reels = 'Please enter how many reels you need.';
  else if (!Number.isInteger(reels) || reels < 1 || reels > 100)
    errors.reels = 'Enter a whole number between 1 and 100.';

  if (v('notes').length > 1000) errors.notes = 'Please keep additional requirements under 1000 characters.';

  return errors;
}

/** "2026-11-20" -> "20 Nov 2026" (no timezone conversion). */
export function formatDate(iso) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d} ${months[m - 1]} ${y}`;
}

/** Plain-text booking message used for both WhatsApp and email. */
export function buildBookingMessage(values) {
  const v = (k) => (values[k] ?? '').toString().trim();
  return [
    'Hello ReelRise! I would like to request a shoot slot.',
    '',
    `Name: ${v('fullName')}`,
    `WhatsApp: ${v('whatsapp')}`,
    `Email: ${v('email')}`,
    `Shoot Category: ${v('category')}`,
    `Preferred Date: ${formatDate(v('date'))}`,
    `Preferred Time: ${v('time')}`,
    `Shoot Location: ${v('location')}`,
    `Number of Reels: ${v('reels')}`,
    `Additional Requirements: ${v('notes') || 'None'}`,
    '',
    'Please confirm availability. Thank you!',
  ].join('\n');
}

export function buildWhatsAppUrl(values) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(buildBookingMessage(values))}`;
}

export function buildMailtoUrl(values) {
  // encodeURIComponent encodes spaces as %20 and newlines as %0A, as mailto requires
  return (
    `mailto:${SITE.email}` +
    `?subject=${encodeURIComponent(SITE.emailSubject)}` +
    `&body=${encodeURIComponent(buildBookingMessage(values).replace(/\n/g, '\r\n'))}`
  );
}

/** Generic enquiry links used in Contact / Footer. */
export const whatsappGeneralUrl = () =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent('Hello ReelRise! I would like to get a quote.')}`;
export const mailtoGeneralUrl = () => `mailto:${SITE.email}`;
