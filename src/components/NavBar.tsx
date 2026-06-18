import React, { useState, useEffect } from "react";
import { Menu, X, Heart, Calendar, Phone } from "lucide-react";
import { DOCTOR_DETAILS } from "../data";

interface NavBarProps {
  onBookClick: () => void;
}

export default function NavBar({ onBookClick }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Why Choose Us", href: "#why-choose-us" },
    { label: "Timings & Location", href: "#timings-location" },
    { label: "FAQs", href: "#faqs" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active link detection based on section visibility
      const scrollPosition = window.scrollY + 100;
      for (const item of navItems) {
        const id = item.href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(targetId);
    }
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white border-b border-slate-200 shadow-sm py-3"
          : "bg-white/80 backdrop-blur-md border-b border-slate-100 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo Brand Title */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center space-x-3 group focus:outline-none"
            id="nav-brand-logo"
          >
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center shadow-md shadow-teal-600/10 group-hover:scale-105 transition-all">
              <Heart className="h-4.5 w-4.5 text-white fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-lg tracking-tight text-teal-800 underline decoration-teal-500/30 group-hover:text-teal-900 transition-colors">
                {DOCTOR_DETAILS.clinicName}
              </span>
              <span className="text-[9px] text-slate-400 font-bold tracking-widest uppercase">
                {DOCTOR_DETAILS.specialization} &bull; Dr. Vance
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const id = item.href.substring(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  id={`nav-link-${id}`}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "text-teal-600 bg-teal-50"
                      : "text-slate-500 hover:text-teal-600"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Desktop Action CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={`tel:${DOCTOR_DETAILS.phone.replace(/[^0-9+]/g, "")}`}
              className="flex items-center text-slate-500 hover:text-teal-600 font-semibold text-xs tracking-wide px-3 py-1.5 transition-colors"
              id="desktop-nav-call"
            >
              <Phone className="h-3.5 w-3.5 mr-1" />
              {DOCTOR_DETAILS.phone}
            </a>
            <button
              onClick={onBookClick}
              id="desktop-nav-booking-cta"
              className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all shadow-md shadow-teal-600/10 hover:shadow-lg active:scale-95 cursor-pointer"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Hamburger Trigger */}
          <div className="flex items-center space-x-2 lg:hidden">
            <a
              href={`tel:${DOCTOR_DETAILS.phone.replace(/[^0-9+]/g, "")}`}
              className="p-2 text-slate-600 hover:text-teal-600 hover:bg-slate-100 rounded-lg"
              title="Call Clinic"
              id="mobile-nav-quick-call"
            >
              <Phone className="h-5 w-5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-toggle-btn"
              className="p-2 text-slate-700 hover:text-teal-600 hover:bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/30"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Sidebar/Drawer */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl overflow-hidden animate-in slide-in-from-top-4 duration-200">
          <div className="px-4 py-4 space-y-1.5 bg-slate-50/80">
            {navItems.map((item) => {
              const id = item.href.substring(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  id={`mobile-nav-link-${id}`}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "text-teal-800 bg-teal-100/60 font-semibold"
                      : "text-slate-700 hover:text-teal-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-4 border-t border-slate-200 flex flex-col space-y-3.5 px-4 pb-2">
              <a
                href={`tel:${DOCTOR_DETAILS.phone.replace(/[^0-9+]/g, "")}`}
                className="flex items-center justify-center space-x-2 w-full border border-slate-300 text-slate-700 font-semibold py-2.5 rounded-xl hover:bg-slate-100 transition-all text-sm"
                id="mobile-nav-drawer-call"
              >
                <Phone className="h-4 w-4" />
                <span>Call {DOCTOR_DETAILS.phone}</span>
              </a>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onBookClick();
                }}
                id="mobile-nav-drawer-booking-cta"
                className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold py-2.5 rounded-xl shadow-md hover:from-teal-700 hover:to-cyan-700 transition-all text-sm"
              >
                <Calendar className="h-4 w-4" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
