import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import BookingForm from "./components/BookingForm";
import TimingsAndLocation from "./components/TimingsAndLocation";
import Testimonials from "./components/Testimonials";
import FAQs from "./components/FAQs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const handleScrollToBooking = () => {
    const element = document.getElementById("booking");
    if (element) {
      const offset = 80; // offset for sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* 1. Sticky Navigation Bar */}
      <NavBar onBookClick={handleScrollToBooking} />

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero onBookClick={handleScrollToBooking} />

        {/* 3. About the Doctor */}
        <About />

        {/* 4. Services Section */}
        <Services />

        {/* 5. Why Choose Us */}
        <WhyChooseUs />

        {/* 6. Appointment Booking Section */}
        <BookingForm />

        {/* 7. Clinic Timings & Route (Merged Timing & Location for sleek UI) */}
        <TimingsAndLocation />

        {/* 8. Testimonials Section */}
        <Testimonials />

        {/* 9. FAQ Section */}
        <FAQs />

        {/* 10. Contact Section */}
        <Contact />
      </main>

      {/* 11. Footer Section */}
      <Footer />
    </div>
  );
}
