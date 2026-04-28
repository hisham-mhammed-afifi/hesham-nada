'use client';

import { useState, FormEvent } from 'react';
import { wedding } from '../lib/content';
import SectionTitle from './SectionTitle';
import PetalRain from './PetalRain';

const WEB3FORMS_ACCESS_KEY = 'YOUR-WEB3FORMS-ACCESS-KEY-HERE';
const ENDPOINT = 'https://api.web3forms.com/submit';

const MESSAGES = {
  sending: 'Sending…',
  success: "Thank you — we can't wait to see you.",
  error: 'Something went wrong. Please try again or email us directly.',
  notConfigured:
    'RSVP not configured: paste your Web3Forms access key into app/components/Rsvp.tsx.',
} as const;

type Status = { kind: 'idle' | 'sending' | 'success' | 'error'; text: string };

export default function Rsvp() {
  const [status, setStatus] = useState<Status>({ kind: 'idle', text: '' });
  const [petalsActive, setPetalsActive] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: 'sending', text: MESSAGES.sending });

    if (WEB3FORMS_ACCESS_KEY === 'YOUR-WEB3FORMS-ACCESS-KEY-HERE') {
      setStatus({ kind: 'error', text: MESSAGES.notConfigured });
      return;
    }

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `RSVP — ${data.name || 'Guest'} — ${data.attending}`,
      from_name: 'Hesham & Nada Wedding Site',
      ...data,
    };

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        setStatus({ kind: 'success', text: MESSAGES.success });
        form.reset();
        // Petals only celebrate the "yes"es
        if (data.attending === 'yes') setPetalsActive(true);
      } else {
        throw new Error(json.message || 'submit failed');
      }
    } catch (err) {
      console.error('[rsvp]', err);
      setStatus({ kind: 'error', text: MESSAGES.error });
    }
  }

  const statusClass =
    status.kind === 'success'
      ? 'is-success'
      : status.kind === 'error'
        ? 'is-error'
        : '';

  return (
    <>
      <section id="rsvp" className="section rsvp">
        <SectionTitle lede={`Kindly reply by ${wedding.rsvpDeadline}.`}>
          RSVP
        </SectionTitle>

        <form className="rsvp-form" noValidate onSubmit={handleSubmit}>
          <label className="field">
            <span className="field-label">Full name</span>
            <input type="text" name="name" required autoComplete="name" />
          </label>

          <label className="field">
            <span className="field-label">Email</span>
            <input type="email" name="email" required autoComplete="email" />
          </label>

          <fieldset className="field field--radio">
            <legend className="field-label">Will you attend?</legend>
            <label>
              <input
                type="radio"
                name="attending"
                value="yes"
                defaultChecked
              />
              <span>Yes, joyfully</span>
            </label>
            <label>
              <input type="radio" name="attending" value="no" />
              <span>Sadly, no</span>
            </label>
          </fieldset>

          <label className="field">
            <span className="field-label">Number of guests (you included)</span>
            <input
              type="number"
              name="guests"
              min={1}
              max={6}
              defaultValue={1}
            />
          </label>

          <label className="field">
            <span className="field-label">Dietary notes (optional)</span>
            <input type="text" name="dietary" autoComplete="off" />
          </label>

          <label className="field">
            <span className="field-label">A note for the couple (optional)</span>
            <textarea name="message" rows={3} />
          </label>

          <button type="submit" className="btn btn--primary">
            Send RSVP
          </button>

          <p
            className={`rsvp-status ${statusClass}`}
            role="status"
            aria-live="polite"
          >
            {status.text}
          </p>
        </form>
      </section>

      <PetalRain
        active={petalsActive}
        onDone={() => setPetalsActive(false)}
      />
    </>
  );
}
