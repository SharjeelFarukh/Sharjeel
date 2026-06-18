import { ShieldCheck, Award, ThumbsUp, Activity, Sparkles, Smile, Clock, HeartHandshake } from "lucide-react";
import { WHY_CHOOSE_US } from "../data";

export default function WhyChooseUs() {
  const getFeatureIcon = (id: string) => {
    switch (id) {
      case "wc1":
        return <Award className="h-6 w-6 text-teal-600" />;
      case "wc2":
        return <HeartHandshake className="h-6 w-6 text-teal-600" />;
      case "wc3":
        return <Sparkles className="h-6 w-6 text-teal-600" />;
      case "wc4":
        return <Clock className="h-6 w-6 text-teal-600" />;
      case "wc5":
        return <Activity className="h-6 w-6 text-teal-600" />;
      case "wc6":
        return <Smile className="h-6 w-6 text-teal-600" />;
      default:
        return <ShieldCheck className="h-6 w-6 text-teal-600" />;
    }
  };

  return (
    <section id="why-choose-us" className="py-20 lg:py-28 bg-white selection:bg-teal-100 relative overflow-hidden">
      {/* Absolute decorative circle */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-gradient-to-tr from-teal-200/10 to-teal-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Patient Safety & Comfort</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
              Standardized Care You Can Implicitly Trust
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mx-auto lg:mx-0"></div>
          </div>
          <div className="lg:col-span-4 text-center lg:text-right">
            <p className="text-slate-500 text-sm font-semibold max-w-sm mx-auto lg:mr-0">
              Dr. Sharjeel's private clinic blends therapeutic environments with state-of-the-art diagnostics, supporting your heart's long-term health safely.
            </p>
          </div>
        </div>

        {/* Feature Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 bg-slate-50/50 rounded-3xl border border-slate-200/80 hover:bg-white hover:border-teal-200 hover:shadow-xl transition-all duration-300 relative group"
            >
              <div className="space-y-4">
                {/* Icon Wrapper with glowing hover ring */}
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-150 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getFeatureIcon(item.id)}
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <h3 className="text-md sm:text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Number tag */}
              <div className="absolute right-6 top-6 text-[32px] font-display font-black text-teal-700/5 select-none transition-colors group-hover:text-teal-600/10">
                0{idx + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Banner at the foot */}
        <div className="mt-16 bg-gradient-to-r from-teal-600/5 to-cyan-600/5 border border-teal-500/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-teal-900 flex items-center justify-center sm:justify-start">
              <ThumbsUp className="h-4.5 w-4.5 text-teal-600 mr-2" />
              Your First Visit? We've Got You Covered
            </h4>
            <p className="text-slate-500 text-xs font-semibold">
              Get familiar with Dr. Sharjeel's calm treatment philosophy. No stress, no high-pressure jargon.
            </p>
          </div>
          <a
            href="#booking"
            className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-md cursor-pointer shrink-0 transition-colors"
          >
            Ready to Schedule
          </a>
        </div>

      </div>
    </section>
  );
}
