import { useState } from "react";
import { Stethoscope, Heart, Activity, ShieldCheck, Clock, Award, ChevronRight, X, Sparkles, Check } from "lucide-react";
import { SERVICES } from "../data";
import { Service } from "../types";

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Map icon strings to Lucide components
  const getIcon = (name: string) => {
    switch (name) {
      case "Stethoscope":
        return <Stethoscope className="h-6 w-6" />;
      case "Heart":
        return <Heart className="h-6 w-6" />;
      case "Activity":
        return <Activity className="h-6 w-6" />;
      case "ShieldCheck":
        return <ShieldCheck className="h-6 w-6" />;
      case "Clock":
        return <Clock className="h-6 w-6" />;
      case "Award":
        return <Award className="h-6 w-6" />;
      default:
        return <Stethoscope className="h-6 w-6" />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-slate-50 selection:bg-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-teal-100/60 text-teal-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Heart className="h-4 w-4 text-teal-600 fill-teal-100" />
            <span>Our Clinical Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
            Comprehensive Care and Treatment
          </h2>
          <div className="mx-auto w-16 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From routine checkups to state-of-the-art diagnostic cardio evaluations, Dr. Vance offers evidence-based diagnostic blueprints tailored to protect your long-term health.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 hover:border-teal-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Soft decorative hover circle in top-right */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-teal-50 rounded-full group-hover:scale-150 transition-transform duration-300 -z-0"></div>

              <div className="space-y-6 relative z-10">
                {/* Service Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shadow-xs group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                  {getIcon(srv.iconName)}
                </div>

                {/* Service Text details */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-100/60 rounded-full px-2.5 py-0.5 uppercase tracking-wider">
                    {srv.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {srv.description}
                  </p>
                </div>
              </div>

              {/* Action trigger button */}
              <div className="pt-6 border-t border-slate-100 mt-6 relative z-10 flex items-center justify-between">
                <button
                  onClick={() => setSelectedService(srv)}
                  className="text-xs sm:text-sm text-teal-700 hover:text-teal-800 font-bold flex items-center group-hover:underline"
                  id={`srv-btn-${srv.id}`}
                >
                  Learn More & What's Included
                  <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Dynamic Detail Modal */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal backdrop background */}
            <div
              className="absolute inset-0 bg-slate-950/65 backdrop-blur-xs transition-opacity"
              onClick={() => setSelectedService(null)}
            ></div>

            {/* Modal Dialog Content */}
            <div className="bg-white rounded-3xl shadow-2xl relative w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
              {/* Gradient Banner */}
              <div className="bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-700 px-6 py-6 text-white flex justify-between items-center">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-white">
                    {getIcon(selectedService.iconName)}
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-teal-100 uppercase tracking-widest leading-none">
                      {selectedService.category}
                    </span>
                    <h4 className="text-base font-bold leading-tight mt-0.5">{selectedService.title}</h4>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                  aria-label="Close details"
                  id="modal-close-btn"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Core Body Content */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Service Summary</h5>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {selectedService.description}
                  </p>
                </div>

                <div className="space-y-3.5">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1">
                    <Sparkles className="h-3.5 w-3.5 text-teal-600" />
                    <span>Key Inclusions & Diagnostic Checks</span>
                  </h5>
                  <div className="grid grid-cols-1 gap-2.5">
                    {selectedService.bulletPoints.map((pt, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100 shadow-2xs">
                        <Check className="h-4 w-4 text-teal-600 mt-0.5 shrink-0" />
                        <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-tight">
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form quick action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <a
                    href="#booking"
                    onClick={() => {
                      setSelectedService(null);
                      const bookingSection = document.getElementById("booking");
                      if (bookingSection) {
                        bookingSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
                  >
                    Form Request Booking
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
