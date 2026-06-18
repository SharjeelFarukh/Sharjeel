import React from "react";
import { Heart, Phone, Mail, MapPin } from "lucide-react";
import { DOCTOR_DETAILS } from "../data";

export default function Footer() {
  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About Dr. Sharjeel", href: "#about" },
    { label: "Our Services", href: "#services" },
    { label: "Why Choose Us", href: "#why-choose-us" },
    { label: "Timings & Route", href: "#timings-location" },
    { label: "Frequently Questions", href: "#faqs" },
    { label: "Contact Us", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800 selection:bg-teal-900 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core footer columns layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand details (Col-span 5) */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, "#home")}
              className="flex items-center space-x-2 group focus:outline-none"
              id="footer-brand"
            >
              <div className="bg-teal-600 text-white p-2 rounded-lg">
                <Heart className="h-4.5 w-4.5 fill-teal-105" />
              </div>
              <span className="font-display font-bold text-lg text-white group-hover:text-teal-400 transition-colors">
                {DOCTOR_DETAILS.clinicName}
              </span>
            </a>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Providing professional cardiovascular cardiology assessments and comprehensive family medicine clinical guidelines under Dr. Muhammad Sharjeel Farkh, MD, FACC.
            </p>

            <div className="text-xs space-y-2 pt-2">
              <p className="flex items-center">
                <Phone className="h-3.5 w-3.5 text-teal-500 mr-2 shrink-0" />
                <span>Call Clinic: {DOCTOR_DETAILS.phone}</span>
              </p>
              <p className="flex items-center">
                <Mail className="h-3.5 w-3.5 text-teal-500 mr-2 shrink-0" />
                <span>Email Support: {DOCTOR_DETAILS.email}</span>
              </p>
              <p className="flex items-center">
                <MapPin className="h-3.5 w-3.5 text-teal-500 mr-2 shrink-0 text-left" />
                <span>{DOCTOR_DETAILS.address}</span>
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links (Col-span 3) */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="hover:text-teal-400 hover:underline transition-colors block py-0.5"
                    id={`footer-link-${link.href.substring(1)}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Safe Medical Disclaimer (Col-span 4) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Legal & Medical Disclaimer</h4>
            <div className="text-[11px] leading-relaxed text-slate-500 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
              <p className="font-bold text-slate-400 mb-1">Attention Visitors:</p>
              The materials and case outcomes detailed on this website are for general informational, educational, and scheduling coordinates only. They are not intended as personal, official medical advice, diagnosis, or guaranteed treatment plans. Always ask a licensed physician for any clinical inquiries. This portal does not support emergency requests.
            </div>
          </div>

        </div>

        {/* Footnote Copyright & Credits aligned with Sleek Interface */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-wider font-semibold text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {DOCTOR_DETAILS.clinicName}. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-slate-400">Medical Disclaimer</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <span>&bull;</span>
            <span className="text-slate-300 font-bold">Health is Wealth.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
