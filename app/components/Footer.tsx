import { wedding } from '../lib/content';
import ShareButton from './ShareButton';

export default function Footer() {
  return (
    <footer className="site-foot">
      <p>
        <span>Hesham &amp; Nada</span>
        &nbsp;·&nbsp;
        <span>2026-06-12</span>
      </p>
      <p className="site-foot__hashtag">{wedding.hashtag}</p>
      <div className="site-foot__share">
        <ShareButton />
      </div>
    </footer>
  );
}
