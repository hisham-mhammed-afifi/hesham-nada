/**
 * Minimal RFC 5545 .ics generator for the wedding event.
 * No external dependency — keeps the bundle lean.
 */

interface IcsEvent {
  uid: string;
  title: string;
  description: string;
  location: string;
  startISO: string; // e.g. '2026-06-12T19:00:00+02:00'
  endISO: string;
  url?: string;
}

/** Convert any ISO 8601 timestamp (with TZ) to ICS UTC format: YYYYMMDDTHHMMSSZ */
function toIcsDateTime(isoString: string): string {
  const d = new Date(isoString);
  const yyyy = d.getUTCFullYear();
  const MM = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');
  const ss = String(d.getUTCSeconds()).padStart(2, '0');
  return `${yyyy}${MM}${dd}T${hh}${mm}${ss}Z`;
}

/** Escape commas, semicolons, backslashes, and newlines per RFC 5545. */
function escapeText(s: string): string {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
    .replace(/\r?\n/g, '\\n');
}

export function buildIcs(event: IcsEvent): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Hesham & Nada//Wedding Save the Date//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.uid}`,
    `DTSTAMP:${toIcsDateTime(new Date().toISOString())}`,
    `DTSTART:${toIcsDateTime(event.startISO)}`,
    `DTEND:${toIcsDateTime(event.endISO)}`,
    `SUMMARY:${escapeText(event.title)}`,
    `DESCRIPTION:${escapeText(event.description)}`,
    `LOCATION:${escapeText(event.location)}`,
    ...(event.url ? [`URL:${event.url}`] : []),
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  // RFC 5545 mandates CRLF line endings
  return lines.join('\r\n');
}

export function downloadIcs(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 100);
}
