import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Hero from './sections/Hero.jsx';
import Services from './sections/Services.jsx';
import HowItWorks from './sections/HowItWorks.jsx';
import BookingForm from './sections/BookingForm.jsx';
import Contact from './sections/Contact.jsx';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <HowItWorks />
        <BookingForm />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
