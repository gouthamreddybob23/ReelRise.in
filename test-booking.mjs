// Run with: npm test
// Checks validation, WhatsApp URL and mailto URL generation without a browser.
import assert from 'node:assert/strict';
import {
  buildBookingMessage,
  buildMailtoUrl,
  buildWhatsAppUrl,
  validateBooking,
} from '../src/config/booking.js';

const NOW = new Date('2026-11-16T10:00:00');

const valid = {
  fullName: 'Ravi Kumar',
  whatsapp: '+91 98765 43210',
  email: 'ravi@example.com',
  category: 'Real Estate Reels',
  date: '2026-11-20',
  time: 'Morning (8 AM – 12 PM)',
  location: 'Madhapur, Hyderabad',
  reels: '4',
  notes: 'Need drone shots & a 2BHK walkthrough — 100% vertical.',
};

// --- validation ---
assert.deepEqual(validateBooking(valid, NOW), {}, 'valid booking passes');
assert.deepEqual(validateBooking({ ...valid, notes: '' }, NOW), {}, 'notes optional');

const empty = validateBooking({}, NOW);
for (const k of ['fullName', 'whatsapp', 'email', 'category', 'date', 'time', 'location', 'reels']) {
  assert.ok(empty[k], `required field ${k} is flagged when empty`);
}
assert.ok(!empty.notes, 'notes is not required');

assert.ok(validateBooking({ ...valid, email: 'bad@' }, NOW).email, 'bad email rejected');
assert.ok(validateBooking({ ...valid, whatsapp: '12345' }, NOW).whatsapp, 'short phone rejected');
assert.ok(validateBooking({ ...valid, whatsapp: 'abcdefghijk' }, NOW).whatsapp, 'letters in phone rejected');
assert.ok(validateBooking({ ...valid, date: '2026-11-15' }, NOW).date, 'past date rejected');
assert.deepEqual(validateBooking({ ...valid, date: '2026-11-16' }, NOW), {}, 'today allowed');
assert.ok(validateBooking({ ...valid, reels: '0' }, NOW).reels, 'zero reels rejected');
assert.ok(validateBooking({ ...valid, reels: '2.5' }, NOW).reels, 'fractional reels rejected');
assert.ok(validateBooking({ ...valid, category: 'Hacked' }, NOW).category, 'unknown category rejected');

// --- message contains every field ---
const msg = buildBookingMessage(valid);
for (const needle of [
  'Ravi Kumar',
  '+91 98765 43210',
  'ravi@example.com',
  'Real Estate Reels',
  '20 Nov 2026',
  'Morning (8 AM – 12 PM)',
  'Madhapur, Hyderabad',
  'Number of Reels: 4',
  'Need drone shots & a 2BHK walkthrough — 100% vertical.',
]) {
  assert.ok(msg.includes(needle), `message includes "${needle}"`);
}

// --- WhatsApp URL ---
const wa = buildWhatsAppUrl(valid);
assert.ok(wa.startsWith('https://wa.me/917780358870?text='), 'wa.me prefix + number');
const waText = new URL(wa).searchParams.get('text');
assert.equal(waText, msg, 'WhatsApp text round-trips exactly (encoding is lossless)');
assert.ok(!/[ \n&]/.test(wa.split('?text=')[1]), 'no raw spaces, newlines or & in encoded text');

// --- mailto URL ---
const mail = buildMailtoUrl(valid);
assert.ok(mail.startsWith('mailto:mintugoutham9@gmail.com?subject='), 'mailto prefix');
const parsed = new URL(mail);
assert.equal(parsed.searchParams.get('subject'), 'ReelRise New Shoot Booking Request', 'subject correct');
assert.equal(
  parsed.searchParams.get('body').replace(/\r\n/g, '\n'),
  msg,
  'email body round-trips exactly'
);
assert.ok(!mail.includes('+'), 'mailto uses %20 not + for spaces');

// --- empty notes shows "None" ---
assert.ok(buildBookingMessage({ ...valid, notes: '' }).includes('Additional Requirements: None'));

console.log('All booking tests passed.');
console.log('\nSample WhatsApp URL:\n' + wa);
console.log('\nSample mailto URL:\n' + mail);
