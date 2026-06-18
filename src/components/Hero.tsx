import { Calendar, Phone, Award, ShieldCheck, HeartPulse, Sparkles } from "lucide-react";
import { DOCTOR_DETAILS } from "../data";

const doctorImg = "/src/assets/images/dr_evelyn_vance_custom_1781758424016.jpg";

interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  const handleCallNow = () => {
    window.location.href = `tel:${DOCTOR_DETAILS.phone.replace(/[^0-9+]/g, "")}`;
  };

  return (
    <section
      id="home"
      className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-gradient-to-br from-slate-50 via-teal-50/20 to-sky-100/30"
    >
      {/* Background Decorative Patterns */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute bottom-10 left-10 -z-10 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl opacity-70"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="space-y-6 lg:max-w-xl text-center lg:text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center space-x-1.5 bg-teal-100/60 border border-teal-200 rounded-full px-3 py-1 text-xs text-teal-800 font-semibold uppercase tracking-wider mx-auto lg:mx-0 shadow-sm animate-pulse">
              <Sparkles className="h-3 w-3 fill-teal-100" />
              <span>Dedicated Family Cardiology & Primary Care</span>
            </div>

            {/* Main Headlines */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] leading-[1.15] font-display font-extrabold text-slate-950 tracking-tight">
              Compassionate Care For Your{" "}
              <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Heart & Wellbeing
              </span>
            </h1>

            {/* Tagline / Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
              {DOCTOR_DETAILS.tagline} Welcome to <span className="font-semibold text-teal-700">{DOCTOR_DETAILS.clinicName}</span>, combining advanced medical clinical experience with personalized, caring service.
            </p>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-2 gap-4 pb-2 text-left max-w-sm sm:max-w-md mx-auto lg:mx-0">
              <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-white/70 border border-slate-200 shadow-xs">
                <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium leading-tight">Board Certified</p>
                  <p className="text-sm font-bold text-slate-800">Cardiology Specialist</p>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-white/70 border border-slate-200 shadow-xs">
                <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
                  <HeartPulse className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium leading-tight">Clinical Practice</p>
                  <p className="text-sm font-bold text-slate-800">{DOCTOR_DETAILS.experience}</p>
                </div>
              </div>
            </div>

            {/* Visual Action Button Triggers */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onBookClick}
                id="hero-book-btn"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-teal-700/20 hover:shadow-xl hover:from-teal-700 hover:to-emerald-700 transition-all cursor-pointer group hover:-translate-y-0.5 active:translate-y-0 text-md"
              >
                <Calendar className="h-5 w-5 mr-1 group-hover:scale-110 transition-transform" />
                <span>Book Appointment</span>
              </button>
              
              <button
                onClick={handleCallNow}
                id="hero-call-btn"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white text-slate-700 font-semibold px-7 py-3.5 rounded-xl border border-slate-300 shadow-sm hover:border-teal-500 hover:text-teal-700 hover:bg-teal-50/50 transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0 text-md"
              >
                <Phone className="h-5 w-5 text-teal-600 animate-bounce" />
                <span>Call {DOCTOR_DETAILS.phone}</span>
              </button>
            </div>

            {/* Quick reassurance notes */}
            <div className="flex items-center justify-center lg:justify-start space-x-4 pt-2 text-xs text-slate-500 font-semibold">
              <span className="flex items-center">
                <ShieldCheck className="h-4 w-4 text-emerald-600 mr-1" />
                Secured Booking
              </span>
              <span className="text-slate-300">•</span>
              <span>Available for Walk-ins</span>
            </div>
          </div>

          {/* Right Column / Image Area */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[440px] lg:h-[440px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-teal-50 group">
              {/* Image element with required parameters */}
              <img
                src={doctorImg}
                alt={DOCTOR_DETAILS.fullName}
                id="hero-doctor-profile-image"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Float Badge 1 (Quals) */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-slate-100 flex items-center space-x-2 max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200">
                <div className="bg-emerald-100 p-2 rounded-xl text-emerald-700">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Education</p>
                  <p className="text-xs font-extrabold text-slate-800 leading-tight">Harvard Medical Alum</p>
                </div>
              </div>

              {/* Float Badge 2 (Accepting) */}
              <div className="absolute top-4 right-4 bg-teal-600/90 backdrop-blur-md text-white rounded-xl px-3 py-1 text-xs font-bold shadow-md shadow-teal-900/10 flex items-center space-x-1">
                <span className="h-2 w-2 bg-emerald-400 rounded-full animate-ping mr-1"></span>
                <span>Accepting New Patients</span>
              </div>
            </div>

            {/* Decorative Grid Behind Image */}
            <div className="absolute -bottom-6 -right-6 -z-10 w-48 h-48 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
