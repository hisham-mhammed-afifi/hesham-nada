import PageBackground from './components/PageBackground';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Story from './components/Story';
import Schedule from './components/Schedule';
import Venue from './components/Venue';
import Gallery from './components/Gallery';
import Rsvp from './components/Rsvp';
import Footer from './components/Footer';
import FlourishDivider from './components/FlourishDivider';

export default function HomePage() {
  return (
    <>
      <PageBackground />
      <Hero />
      <FlourishDivider />
      <Countdown />
      <FlourishDivider />
      <Story />
      <FlourishDivider />
      <Schedule />
      <FlourishDivider />
      <Venue />
      <FlourishDivider />
      <Gallery />
      <FlourishDivider />
      <Rsvp />
      <Footer />
    </>
  );
}
