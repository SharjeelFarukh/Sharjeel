import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { FAQS, DOCTOR_DETAILS } from "../data";

export default function FAQs() {
  const [openId, setOpenId] = useState<string | null>("f1"); // pre-open first FAQ item

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-20 lg:py-28 bg-white selection:bg-teal-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-teal-50 text-teal-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="h-4 w-4 text-teal-600" />
            <span>Faq Accords</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight text-center">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto w-16 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-center">
            Have questions about booking slots, timing, or how to prepare for your cardiology appraisal? Find immediate clinical answers below.
          </p>
        </div>

        {/* Structured Accordion Grid */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className={`bg-slate-50 border rounded-2xl transition-all duration-350 overflow-hidden ${
                  isOpen ? "border-teal-300 ring-2 ring-teal-500/5 bg-white shadow-sm" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                {/* Accordion Toggle Header button */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  id={`faq-btn-${faq.id}`}
                  className="w-full text-left px-5 sm:px-6 py-4.5 flex justify-between items-center space-x-3.5 focus:outline-none focus:bg-teal-50/10 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-teal-700">
                    {faq.question}
                  </span>
                  
                  {/* Rotating Chevron indicator */}
                  <div className={`p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 transition-transform ${isOpen ? "rotate-180 text-teal-600 border-teal-200" : ""}`}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {/* Collapsible Content Area */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[300px] border-t border-slate-100" : "max-h-0 pointer-events-none"
                  }`}
                >
                  <div className="px-5 sm:px-6 py-4.5 text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold bg-slate-50/50">
                    {faq.answer}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Dynamic WhatsApp Callout footer */}
        <div className="mt-12 p-6.5 rounded-3xl bg-teal-50/40 border border-teal-500/10 max-w-xl mx-auto text-center space-y-4">
          <p className="text-xs sm:text-sm text-slate-600 font-semibold">
            Still have queries or need assistance with custom billing/insurance reports?
          </p>
          <a
            href={`https://wa.me/${DOCTOR_DETAILS.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-white hover:bg-slate-50 border border-slate-300 hover:border-teal-500 text-slate-700 hover:text-teal-700 py-2.5 px-6 rounded-xl font-bold text-xs shadow-tiny transition-all cursor-pointer"
            id="faq-whatsapp-cta"
          >
            <MessageCircle className="h-4.5 w-4.5 text-emerald-600 animate-pulse fill-emerald-500/10" />
            <span>Chat Instant with Coordinator</span>
          </a>
        </div>

      </div>
    </section>
  );
}
