import { Award, GraduationCap, CheckCircle2, ShieldCheck, Waves } from "lucide-react";
import { DOCTOR_DETAILS } from "../data";

export default function About() {
  const credentials = [
    {
      year: "2012",
      degree: "Doctor of Medicine (M.D.)",
      institution: "Harvard Medical School",
      detail: "Graduated with honors in cardiovascular biology research."
    },
    {
      year: "2015",
      degree: "Internal Medicine Residency",
      institution: "Massachusetts General Hospital",
      detail: "Three years of immersive clinical internal medicine training."
    },
    {
      year: "2018",
      degree: "Cardiovascular Disease Fellowship",
      institution: "Johns Hopkins Hospital",
      detail: "Two-year specialized clinical cardiovascular diagnostic fellowship."
    }
  ];

  const expertises = [
    "Preventative Cardiovascular Care",
    "Clinical Coronary Diagnostics",
    "Arterial Hypertension Protocols",
    "Metabolic & Lipid Optimization",
    "Holistic Chronic Care Coordination",
    "Evidence-based Health Counseling"
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-white selection:bg-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-teal-50 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-teal-700">
            <Award className="h-4.5 w-4.5" />
            <span>Meet the Doctor</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
            About {DOCTOR_DETAILS.fullName}
          </h2>
          <div className="mx-auto w-16 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            A leader in preventative care with over 14 years of dedicated medical experience. Dr. Vance takes an immersive, non-jargon approach, aligning cutting-edge science with gentle clinical care.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Biography Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                Dedicated to Patient Health & Clinical Excellence
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Dr. Evelyn Vance is an esteemed cardiologist and general practitioner based in San Francisco. After completing her medical degree at Harvard and specializing in cardiology at Johns Hopkins, she established her clinic to bridge the gap between complex disease management and daily practical wellness.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                With {DOCTOR_DETAILS.experience}, her patient-centered philosophy revolves around listening before prescribing. She believes patients deserve the time to explore their health factors, understand diagnosis pathways thoroughly, and play an active, confident role in physical rehabilitation.
              </p>
            </div>

            {/* Specialties & Core Expertise Pill Grid */}
            <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1">
                <Waves className="h-4 w-4 text-teal-600" />
                <span>Areas of Expert Study</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {expertises.map((exp, idx) => (
                  <div key={idx} className="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200/60 shadow-xs">
                    <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-slate-700">{exp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education Timeline / Experience Side Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100 space-y-6">
              
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
                <div className="p-2 bg-teal-100 text-teal-700 rounded-xl">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-md font-bold text-slate-800">Academic Trajectory</h4>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Education & Credentials</p>
                </div>
              </div>

              {/* Dynamic Credential Timeline */}
              <div className="relative border-l-2 border-teal-200/60 pl-5 ml-2.5 space-y-6">
                {credentials.map((cred, i) => (
                  <div key={i} className="relative group">
                    {/* Small Dot */}
                    <span className="absolute -left-7.5 top-1.5 w-3 h-3 bg-teal-600 border border-white rounded-full group-hover:scale-125 transition-transform"></span>
                    <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-100 rounded-full px-2 py-0.5">
                      {cred.year}
                    </span>
                    <h5 className="text-sm font-bold text-slate-900 mt-1.5">
                      {cred.degree}
                    </h5>
                    <p className="text-xs font-semibold text-slate-500">
                      {cred.institution}
                    </p>
                    <p className="text-xs text-slate-600 leading-normal mt-1 text-slate-500">
                      {cred.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Safe medical disclaimer note style */}
              <div className="pt-4 border-t border-slate-200/80 flex items-start space-x-2 text-[11px] text-slate-400">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Dr. Vance maintains active, unblemished licensure with the Medical Board of California and is highly regarded in national cardiology societies.</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
