import { Phone, Mail, MapPin, MessageCircle, Share2, Facebook, Linkedin, Youtube, Heart } from "lucide-react";
import { DOCTOR_DETAILS } from "../data";

export default function Contact() {
  const socialMedias = [
    { icon: <Facebook className="h-4.5 w-4.5" />, href: "#", label: "Facebook", id: "fb" },
    { icon: <Linkedin className="h-4.5 w-4.5" />, href: "#", label: "LinkedIn", id: "li" },
    { icon: <Share2 className="h-4.5 w-4.5" />, href: "#", label: "Twitter", id: "tw" },
    { icon: <Youtube className="h-4.5 w-4.5" />, href: "#", label: "YouTube", id: "yt" },
  ];

  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-50 selection:bg-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-teal-100/60 text-teal-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Phone className="h-4 w-4 text-teal-600" />
            <span>Connect With Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
            Contact Dr. Vance's Team
          </h2>
          <div className="mx-auto w-16 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Have clinical questions or need general guidance? Feel free to contact our support desk directly via phone, WhatsApp, or email. We are happy to help!
          </p>
        </div>

        {/* Tiles Grid split into Contact Details vs Communication CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto">
          
          {/* Left: Contact Detail Tiles (Lg: Col-span 7) */}
          <div className="lg:col-span-7 space-y-5 flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Phone Card Tile */}
              <a
                href={`tel:${DOCTOR_DETAILS.phone.replace(/[^0-9+]/g, "")}`}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-teal-300 shadow-sm hover:shadow-md transition-all duration-300 space-y-4"
                id="contact-tile-phone"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <dt className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Emergency Phone</dt>
                  <dd className="text-sm font-extrabold text-slate-800">{DOCTOR_DETAILS.phone}</dd>
                  <p className="text-[10px] text-slate-450 leading-tight">Mon-Fri (08:30am - 05:30pm)</p>
                </div>
              </a>

              {/* Email Card Tile */}
              <a
                href={`mailto:${DOCTOR_DETAILS.email}`}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-teal-300 shadow-sm hover:shadow-md transition-all duration-300 space-y-4"
                id="contact-tile-email"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <dt className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Email Coordinates</dt>
                  <dd className="text-sm font-extrabold text-slate-800 break-all">{DOCTOR_DETAILS.email}</dd>
                  <p className="text-[10px] text-slate-450 leading-tight">Response guaranteed in 2 hours</p>
                </div>
              </a>

            </div>

            {/* Address Card Tile */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-11.5 h-11.5 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <MapPin className="h-5.5 w-5.5" />
                </div>
                <div className="space-y-1 text-left">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Physical Office</span>
                  <h4 className="text-sm font-extrabold text-slate-900 leading-snug">{DOCTOR_DETAILS.clinicName}</h4>
                  <p className="text-xs sm:text-sm font-semibold text-slate-650 pr-4 leading-relaxed">
                    {DOCTOR_DETAILS.address}
                  </p>
                  <p className="text-[11px] text-teal-600 font-bold">18th Floor • Suite 1800 • Elevator Access</p>
                </div>
              </div>
            </div>

            {/* Structured Social channels and community guidelines */}
            <div className="p-4 sm:p-6 bg-slate-50 border border-slate-200/60 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left space-y-0.5">
                <h4 className="text-xs font-bold text-slate-800 flex items-center justify-center sm:justify-start">
                  <Heart className="h-3.5 w-3.5 text-teal-600 mr-1.5" />
                  Clinical Community
                </h4>
                <p className="text-[11px] text-slate-450 leading-tight">Follow us for vetted lifestyle tips and health posts.</p>
              </div>
              
              {/* Dynamic Social Icons */}
              <div className="flex items-center space-x-2.5">
                {socialMedias.map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    title={s.label}
                    id={`social-${s.id}`}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:border-teal-500 text-slate-500 hover:text-teal-600 hover:bg-teal-50/50 flex items-center justify-center transition-all shadow-tiny"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Immersive Fast scheduling CTA column (Lg: Col-span 5) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-teal-800 to-teal-950 text-white rounded-3xl p-6 sm:p-9 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 bg-teal-600/10 rounded-full blur-3xl"></div>
            
            <div className="space-y-6 relative z-10">
              <span className="text-[10px] font-black uppercase tracking-widest text-teal-300 bg-teal-900/60 border border-teal-700/60 px-2.5 py-1 rounded-md">
                Fast-Response Option
              </span>

              <h3 className="text-xl sm:text-2xl font-bold font-display leading-snug">
                Connect Directly via WhatsApp Support
              </h3>

              <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed font-medium">
                Our medical reception coordinator is online to answer questions regarding pricing, schedule appointments, coordinate diagnostic requirements, and handle insurance queries.
              </p>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center space-x-2 bg-teal-900/40 p-2.5 rounded-xl border border-teal-800/30">
                  <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                  <span className="font-semibold text-teal-100">Live chat agent actively online now</span>
                </div>
                <div className="flex items-center space-x-2 bg-teal-900/40 p-2.5 rounded-xl border border-teal-800/30">
                  <span className="h-2 w-2 rounded-full bg-teal-400"></span>
                  <span className="font-semibold text-teal-100">Booking confirmation in under 5 minutes</span>
                </div>
              </div>
            </div>

            <div className="pt-8 relative z-10">
              <a
                href={`https://wa.me/${DOCTOR_DETAILS.whatsapp}?text=${encodeURIComponent("Hello Dr. Vance clinic, I would like to schedule an appointment consultation.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 w-full bg-emerald-650 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-900/20 text-sm group cursor-pointer"
                id="contact-whatsapp-btn"
              >
                <MessageCircle className="h-5 w-5 mr-1 text-white animate-bounce group-hover:scale-110 transition-transform" />
                <span>Chat Now on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
