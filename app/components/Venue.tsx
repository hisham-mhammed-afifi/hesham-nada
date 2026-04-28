import { wedding } from '../lib/content';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';

export default function Venue() {
  return (
    <section id="venue" className="section venue">
      <SectionTitle>The Venue</SectionTitle>

      <Reveal>
        <address className="venue-address-block">
          <p className="venue-name">{wedding.venueName}</p>
          <p className="venue-address">{wedding.venueAddress}</p>
        </address>

        <div className="venue-map">
          <iframe
            title={`Map of ${wedding.venueName}`}
            src={wedding.mapEmbedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <a
          className="btn btn--outline"
          href={wedding.mapLink}
          target="_blank"
          rel="noopener"
        >
          Open in Google Maps
        </a>
      </Reveal>
    </section>
  );
}
