import { wedding } from '../lib/content';
import ShareButton from './ShareButton';

export default function Footer() {
  return (
    <footer className="site-foot">
      <nav className="site-foot__nav" aria-label="Sections">
        <a href="#hero">Home</a>
        <a href="#story">Our Story</a>
        <a href="#schedule">The Day</a>
        <a href="#venue">Venue</a>
        <a href="#gallery">Gallery</a>
        <a href="#rsvp">RSVP</a>
      </nav>
      <p>
        <span>Hesham &amp; Nada</span>
        &nbsp;·&nbsp;
        <time dateTime={wedding.startISO}>2026-06-12</time>
      </p>
      <p className="site-foot__hashtag">{wedding.hashtag}</p>
      <div className="site-foot__share">
        <ShareButton />
      </div>
    </footer>
  );
}
