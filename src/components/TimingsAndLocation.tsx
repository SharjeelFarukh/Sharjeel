import { useState, useEffect } from "react";
import { Clock, MapPin, Navigation, Calendar, Bus, Flame, Phone } from "lucide-react";
import { DOCTOR_DETAILS, CLINIC_TIMINGS } from "../data";

export default function TimingsAndLocation() {
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const checkClinicStatus = () => {
    const now = new Date();
    // Get local day and hours
    const day = now.getDay(); // 0: Sun, 1: Mon, ..., 6: Sat
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeValue = hours + minutes / 60; // Represents hour in decimal (e.g. 14:30 is 14.5)

    if (day === 0) {
      setIsOpenNow(false);
      setStatusMessage("Closed Today (Sunday)");
    } else if (day >= 1 && day <= 5) {
      // Mon-Fri: 08:30 AM (8.5) to 05:30 PM (17.5)
      if (timeValue >= 8.5 && timeValue < 17.5) {
        setIsOpenNow(true);
        setStatusMessage("Open Now • Closes at 05:30 PM");
      } else {
        setIsOpenNow(false);
        setStatusMessage("Closed • Clinic Hours: Mon - Fri 08:30 AM - 05:30 PM");
      }
    } else if (day === 6) {
      // Sat: 09:00 AM (9.0) to 02:00 PM (14.0)
      if (timeValue >= 9.0 && timeValue < 14.0) {
        setIsOpenNow(true);
        setStatusMessage("Open Today • Closes at 02:00 PM");
      } else {
        setIsOpenNow(false);
        setStatusMessage("Closed • Clinic Hours: Sat 09:00 AM - 02:00 PM");
      }
    }
  };

  useEffect(() => {
    checkClinicStatus();
    // Refresh check every minute
    const interval = setInterval(checkClinicStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="timings-location" className="py-20 lg:py-28 bg-white selection:bg-teal-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Joint Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-sky-50 text-sky-850 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <MapPin className="h-4 w-4 text-sky-600" />
            <span>Visit Our Office</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
            Clinic Timings & Location
          </h2>
          <div className="mx-auto w-16 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We are conveniently located in the medical district of Sutter Street, San Francisco. Reach out or visit during our structured physical consultation timings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Clinic Timings (Lg: Col-span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 bg-teal-100 rounded-xl text-teal-700">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-md sm:text-lg font-bold text-slate-900">Consultation Hours</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Time Slot Chart</p>
                  </div>
                </div>
                
                {/* Dynamic live status badge */}
                <span
                  title="Calculated from your computer's local clock"
                  className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-inner flex items-center space-x-1.5 ${
                    isOpenNow
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : "bg-slate-200 text-slate-700 border border-slate-300"
                  }`}
                  id="live-clinic-status"
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${isOpenNow ? "bg-emerald-500 animate-ping" : "bg-slate-400"}`}></span>
                  <span>{statusMessage.substring(0, 8)}</span>
                </span>
              </div>

              {/* Dynamic Status message in detail */}
              <div className="py-3 px-4 bg-white border border-slate-150 rounded-2xl text-[12px] text-slate-600 font-medium flex items-center space-x-2 mt-4 shadow-2xs">
                <Flame className="h-4 w-4 text-orange-500 shrink-0" />
                <span>{statusMessage}</span>
              </div>

              {/* Structured Timing Table */}
              <div className="space-y-3.5 mt-6">
                
                {/* Mon - Fri row */}
                <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-200">
                  <span className="font-semibold text-slate-700">{CLINIC_TIMINGS.MonFri.days}</span>
                  <span className="text-teal-700 font-bold">{CLINIC_TIMINGS.MonFri.hours}</span>
                </div>

                {/* Sat row */}
                <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-200">
                  <span className="font-semibold text-slate-700">{CLINIC_TIMINGS.Sat.days}</span>
                  <span className="text-teal-700 font-bold">{CLINIC_TIMINGS.Sat.hours}</span>
                </div>

                {/* Sun row */}
                <div className="flex justify-between items-center text-xs pb-1">
                  <span className="font-semibold text-slate-700">{CLINIC_TIMINGS.Sun.days}</span>
                  <span className="text-slate-400">{CLINIC_TIMINGS.Sun.hours}</span>
                </div>

              </div>

              {/* Booking Quick Tip */}
              <div className="mt-6 pt-5 border-t border-slate-200 text-xs text-slate-400 space-y-2 leading-relaxed">
                <p className="font-semibold text-slate-500">Scheduling Tips:</p>
                <p>&bull; Book at least 24 hours in advance to secure optimal slots.</p>
                <p>&bull; Saturday slots are highly requested. Confirm before arriving.</p>
              </div>

            </div>
          </div>

          {/* Right: Location Details & Mock Schematic Vector Map (Lg: Col-span 7) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-teal-700 font-bold bg-teal-50 border border-teal-100/60 px-2 rounded-full uppercase">San Francisco Office</span>
                  <h3 className="text-lg font-bold text-slate-900">{DOCTOR_DETAILS.clinicName}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm flex items-center">
                    <MapPin className="h-4.5 w-4.5 text-teal-600 mr-1.5 shrink-0" />
                    {DOCTOR_DETAILS.address}
                  </p>
                </div>
                
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(DOCTOR_DETAILS.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-teal-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-300 transition-all cursor-pointer shadow-tiny shrink-0"
                  id="direct-navigation-cta"
                >
                  <Navigation className="h-4 w-4" />
                  <span>Get Directions</span>
                </a>
              </div>

              {/* High-Fidelity Mock Vector Map schematic to bypass typical iframe restrictions */}
              <div className="relative h-64 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-end group">
                {/* Visual grid representation inside map */}
                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
                
                {/* SVG/CSS Street Mock representation */}
                <div className="absolute top-1/2 left-0 right-0 h-4 bg-slate-300/80 -translate-y-1/2"></div> {/* Main Sutter St */}
                <div className="absolute left-1/3 top-0 bottom-0 w-4 bg-slate-300/80"></div> {/* Powell St */}
                <div className="absolute left-2/3 top-0 bottom-0 w-4 bg-slate-300/80"></div> {/* Stockton St */}

                {/* Landmark blocks */}
                <div className="absolute top-4 left-4 p-2 bg-slate-200/70 border border-slate-300/40 rounded-lg text-[9px] font-bold text-slate-500">Powell Street Station</div>
                <div className="absolute bottom-4 right-4 p-2 bg-slate-200/70 border border-slate-300/40 rounded-lg text-[9px] font-bold text-slate-500">Stockton Tunnel</div>
                <div className="absolute top-4 right-1/4 p-2 bg-emerald-50/50 border border-emerald-200/30 rounded-lg text-[9px] font-bold text-emerald-600/70">Union Square Greenery</div>

                {/* Active Clinic PIN */}
                <div className="absolute left-[44%] top-[45%] z-10 flex flex-col items-center">
                  {/* Pin Circle Ripple */}
                  <div className="absolute -top-1 w-10 h-10 bg-teal-500/20 border border-teal-400/30 rounded-full animate-ping"></div>
                  {/* Pin element */}
                  <div className="w-10 h-10 p-2.5 bg-teal-600 ring-4 ring-teal-100 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                    <MapPin className="h-5 w-5" />
                  </div>
                  {/* Tooltip */}
                  <div className="mt-1.5 bg-slate-900 border border-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md shadow-slate-950/20 leading-none whitespace-nowrap">
                    Sharjeel Heart Clinic (Suite 1800)
                  </div>
                </div>

                {/* Map Control overlay (Mocking real zoom buttons for high-fidelity look) */}
                <div className="absolute bottom-3 left-3 p-1.5 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg shadow-sm flex flex-col space-y-1">
                  <button className="w-6 h-6 bg-slate-100 hover:bg-slate-250 font-bold border border-slate-250 flex items-center justify-center rounded-md text-xs">+</button>
                  <button className="w-6 h-6 bg-slate-100 hover:bg-slate-250 font-bold border border-slate-250 flex items-center justify-center rounded-md text-xs">-</button>
                </div>

                {/* Bottom map status label */}
                <div className="bg-slate-900/95 backdrop-blur-sm px-4 py-2 text-white/90 text-[10px] sm:text-xs flex items-center justify-between relative z-10">
                  <span className="font-semibold flex items-center">
                    <Bus className="h-4 w-4 mr-1.5 text-teal-400" />
                    SF Muni: Bus routes 2, 3, 76 stop within 1 block.
                  </span>
                  <span className="text-slate-400 font-bold">Standard Map</span>
                </div>
              </div>

              {/* Helpful Transit details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                  <h4 className="font-bold text-slate-800 flex items-center">
                    <Bus className="h-4 w-4 text-teal-600 mr-2" />
                    Public Transport Route
                  </h4>
                  <p className="text-slate-500 leading-normal">
                    Take BART/Muni and exit at Powell Street Station. Walk 4 blocks North up Powell St, turn right on Sutter Street. Suite is on the 18th floor.
                  </p>
                </div>
                
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                  <h4 className="font-bold text-slate-800 flex items-center">
                    <Navigation className="h-4 w-4 text-teal-600 mr-2" />
                    Parking Assistance
                  </h4>
                  <p className="text-slate-500 leading-normal">
                    Validation is available at the Sutter Stockton Garage, situated directly across from our clinic. Rates are $4.00/hour with validation ticket receipt.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
