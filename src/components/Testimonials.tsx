import { MessageSquare, Star, Quote, Heart } from "lucide-react";
import { TESTIMONIALS } from "../data";

export default function Testimonials() {
  // Render stars based on count
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-amber-400 fill-amber-400" : "text-slate-200"
        }`}
      />
    ));
  };

  // Helper to extract patient initials for avatar placeholder
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-slate-50 selection:bg-teal-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-teal-100/60 text-teal-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <MessageSquare className="h-4 w-4 text-teal-600" />
            <span>Patient Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
            Loved & Trusted by Patients
          </h2>
          <div className="mx-auto w-16 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Read positive feedback from individuals whom Dr. Vance has guided on their path to cardiorespiratory health. These testimonials reflect realistic, everyday healthcare outcomes.
          </p>
        </div>

        {/* Testimonials Grid Card mapping */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md relative hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Giant decorative quote symbol */}
              <div className="absolute right-6 top-6 text-teal-100 opacity-30 select-none -z-0">
                <Quote className="h-10 w-10 rotate-180 fill-teal-50 text-teal-50" />
              </div>

              {/* Card Body */}
              <div className="space-y-4 relative z-10">
                {/* Star rating and category badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {renderStars(item.rating)}
                  </div>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold bg-teal-50 text-teal-700 px-2 py-0.5 rounded-md border border-teal-100/40">
                    Verified Checkout
                  </span>
                </div>

                {/* Review comment */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic pr-2">
                  "{item.comment}"
                </p>
              </div>

              {/* Card footer / patient info */}
              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center space-x-4 relative z-10">
                {/* Circular Initials Avatar */}
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-teal-600 to-teal-800 text-white flex items-center justify-center font-bold text-xs ring-4 ring-teal-50 shadow-md">
                  {getInitials(item.name)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 leading-snug">{item.name}</h4>
                  <p className="text-[10px] sm:text-xs font-semibold text-slate-400 flex items-center">
                    {item.role}
                    <span className="text-slate-350 mx-1.5">&bull;</span>
                    {item.date}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Top-tier Featured Patient Quote aligned with the Sleek Interface theme */}
        <div className="mt-16 max-w-2xl mx-auto bg-teal-50/70 p-5 sm:p-6 rounded-2xl border border-teal-100/80 flex flex-col justify-center items-center">
          <p className="italic text-xs sm:text-sm text-teal-850 text-center mb-2 leading-relaxed font-semibold">
            "Dr. Vance is exceptionally professional and deeply caring. She took the time to explain my complex cardiovascular condition in simple, practical terms without typical medical jargon."
          </p>
          <p className="text-[10px] font-bold text-teal-600 text-center uppercase tracking-wider">
            &mdash; Sarah M., Cardiology Patient
          </p>
        </div>

        {/* Small Trust Footnote */}
        <div className="mt-12 text-center text-slate-400 font-semibold text-[10px] uppercase tracking-wider flex items-center justify-center space-x-1.5 select-none">
          <Heart className="h-4 w-4 text-teal-500 fill-teal-150 animate-pulse" />
          <span>Patient records are protected under HIPAA and shared with explicit authorization.</span>
        </div>

      </div>
    </section>
  );
}
