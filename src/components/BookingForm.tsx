import React, { useState, useEffect } from "react";
import { Calendar, Phone, AlertTriangle, CheckCircle2, User, Clock, MessageSquare, Mail, HelpCircle, Trash2, X, Database, RefreshCw } from "lucide-react";
import { DOCTOR_DETAILS } from "../data";
import { Appointment } from "../types";
import { createClient } from "@supabase/supabase-js";

// Initialize client-side Supabase client as fallback/primary for static deployments (e.g. Netlify)
const SUPABASE_URL = (import.meta as any).env.VITE_SUPABASE_URL || "https://mwpxaauncwdtytpyuecf.supabase.co";
const SUPABASE_ANON_KEY = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || "sb_publishable_S3718MagS5_TD5nqSPmTbg_NrWEMN9l";

const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY) ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

export default function BookingForm() {
  const [patientName, setPatientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [reason, setReason] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastBooking, setLastBooking] = useState<Appointment | null>(null);
  const [allBookings, setAllBookings] = useState<Appointment[]>([]);

  // Supabase states
  const [supabaseTableMissing, setSupabaseTableMissing] = useState(false);
  const [dbLoading, setDbLoading] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  // Fetch bookings helper
  const fetchBookings = async () => {
    setDbLoading(true);
    setDbError(null);

    // 1. Try direct Supabase client-side connection first (perfect for Netlify static deployments)
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from("appointments")
          .select("*")
          .order("created_at_db", { ascending: false });

        if (error) {
          console.warn("Direct client-side Supabase connection database query skipped:", error.message);
          if (error.code === "PGRST116" || error.code === "42P01") {
            setSupabaseTableMissing(true);
          }
          throw error;
        }

        const formatted = (data || []).map((row: any) => ({
          id: row.id,
          patientName: row.patient_name,
          phoneNumber: row.phone_number,
          email: row.email,
          date: row.appointment_date,
          time: row.appointment_time,
          reason: row.reason,
          status: row.status || "pending",
          createdAt: row.created_at,
        }));

        setAllBookings(formatted);
        localStorage.setItem("vance_clinic_bookings", JSON.stringify(formatted));
        setSupabaseTableMissing(false);
        setDbLoading(false);
        return;
      } catch (err: any) {
        console.warn("Direct browser-to-Supabase query failed, falling back to backend API proxy...", err.message);
      }
    }

    // 2. Fallback to Express backend server API proxy
    try {
      const response = await fetch("/api/bookings");
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        if (errData.error === "table_missing") {
          setSupabaseTableMissing(true);
        }
        throw new Error(errData.message || `API error ${response.status}`);
      }
      const data = await response.json();
      setAllBookings(data);
      // Keep localStorage in sync
      localStorage.setItem("vance_clinic_bookings", JSON.stringify(data));
      setSupabaseTableMissing(false);
    } catch (err: any) {
      console.warn("Could not retrieve bookings from Supabase, loading from client memory:", err.message);
      setDbError(err.message || "Failed to load clinic database records.");
      
      // Fallback to offline local storage
      try {
        const stored = localStorage.getItem("vance_clinic_bookings");
        if (stored) {
          setAllBookings(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Could not parse vance clinic bookings:", e);
      }
    } finally {
      setDbLoading(false);
    }
  };

  // Load existing bookings on mount
  useEffect(() => {
    fetchBookings();
  }, []);

  // Save bookings helper (fallback)
  const saveBookings = (newBookings: Appointment[]) => {
    setAllBookings(newBookings);
    try {
      localStorage.setItem("vance_clinic_bookings", JSON.stringify(newBookings));
    } catch (e) {
      console.error("Could not save bookings to localStorage:", e);
    }
  };

  // Get current date representation for setting min attribute on HTML date picker
  const getMinDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleValidation = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!patientName.trim()) tempErrors.patientName = "Patient full name is required";
    
    const phonePattern = /^[+]?[0-9\s-]{7,15}$/;
    if (!phoneNumber) {
      tempErrors.phoneNumber = "Phone number is required";
    } else if (!phonePattern.test(phoneNumber.replace(/\s/g, ""))) {
      tempErrors.phoneNumber = "Please enter a valid phone number (e.g. +923357654162)";
    }

    if (!email) {
      tempErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    if (!bookingDate) {
      tempErrors.bookingDate = "Preferred date is required";
    } else {
      const selected = new Date(bookingDate);
      const day = selected.getUTCDay();
      if (day === 0) {
        tempErrors.bookingDate = "The clinic is closed on Sundays. Please select Mon - Sat.";
      }
    }

    if (!bookingTime) {
      tempErrors.bookingTime = "Preferred timing slot is required";
    }
    if (!reason.trim()) {
      tempErrors.reason = "Please enter a brief reason for your consultation";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidation()) return;

    const newBooking: Appointment = {
      id: "VN-" + Math.floor(1000 + Math.random() * 9000),
      patientName: patientName.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim(),
      date: bookingDate,
      time: bookingTime,
      reason: reason.trim(),
      status: "pending",
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Optimistically update frontend table & localStorage fallback
    const updated = [newBooking, ...allBookings];
    saveBookings(updated);
    setLastBooking(newBooking);
    setIsSubmitted(true);

    // Reset Form inputs
    setPatientName("");
    setPhoneNumber("");
    setEmail("");
    setBookingDate("");
    setBookingTime("");
    setReason("");
    setErrors({});

    // 1. Try direct Supabase client-side insert (perfect for Netlify static deployments)
    let savedDirectly = false;
    if (supabase) {
      try {
        const payload = {
          id: newBooking.id,
          patient_name: newBooking.patientName,
          phone_number: newBooking.phoneNumber,
          email: newBooking.email,
          appointment_date: newBooking.date,
          appointment_time: newBooking.time,
          reason: newBooking.reason,
          status: newBooking.status,
          created_at: newBooking.createdAt,
        };

        const { error } = await supabase
          .from("appointments")
          .insert([payload]);

        if (error) {
          if (error.code === "42P01") {
            setSupabaseTableMissing(true);
          }
          throw error;
        }

        savedDirectly = true;
        fetchBookings();
      } catch (err: any) {
        console.warn("Direct browser-to-Supabase submit skipped/failed, using API route fallback:", err.message);
      }
    }

    // 2. Fallback to Server API proxy
    if (!savedDirectly) {
      try {
        const response = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBooking),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          if (errData.error === "table_missing") {
            setSupabaseTableMissing(true);
          }
          throw new Error(errData.message || "Failed to submit booking request to Cloud Server.");
        }
        
        // Refresh the live bookings from the database
        fetchBookings();
      } catch (err: any) {
        console.warn("Could not save to db, using localStorage fallback:", err.message);
      }
    }
  };

  const handleCancelBooking = async (id: string) => {
    // Local memory/offline cancellation
    const updated = allBookings.map((b) => {
      if (b.id === id) {
        return { ...b, status: "cancelled" as const };
      }
      return b;
    });
    setAllBookings(updated);
    localStorage.setItem("vance_clinic_bookings", JSON.stringify(updated));

    // 1. Try direct Supabase client-side cancellation (perfect for Netlify)
    let cancelledDirectly = false;
    if (supabase) {
      try {
        const { error } = await supabase
          .from("appointments")
          .update({ status: "cancelled" })
          .eq("id", id);

        if (!error) {
          cancelledDirectly = true;
          fetchBookings();
        }
      } catch (e: any) {
        console.warn("Direct cancellation query failed:", e.message);
      }
    }

    // 2. Try server API proxy
    if (!cancelledDirectly) {
      try {
        const target = allBookings.find((b) => b.id === id);
        if (target) {
          await fetch("/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...target, status: "cancelled" }),
          });
          fetchBookings();
        }
      } catch (e: any) {
        console.warn("Server cancellation bypassed:", e.message);
      }
    }
  };

  const handleDeleteRecord = async (id: string) => {
    // Local deletion
    const updated = allBookings.filter((b) => b.id !== id);
    setAllBookings(updated);
    localStorage.setItem("vance_clinic_bookings", JSON.stringify(updated));

    // 1. Try direct Supabase client-side deletion (perfect for Netlify)
    let deletedDirectly = false;
    if (supabase) {
      try {
        const { error } = await supabase
          .from("appointments")
          .delete()
          .eq("id", id);

        if (!error) {
          deletedDirectly = true;
          fetchBookings();
        }
      } catch (e: any) {
        console.warn("Direct deletion query failed:", e.message);
      }
    }

    // 2. Try server API proxy
    if (!deletedDirectly) {
      try {
        await fetch(`/api/bookings/${id}`, {
          method: "DELETE",
        });
        fetchBookings();
      } catch (e: any) {
        console.warn("Server deletion bypassed:", e.message);
      }
    }
  };

  return (
    <section id="booking" className="py-20 lg:py-28 bg-slate-50 selection:bg-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-teal-100/60 text-teal-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Calendar className="h-4 w-4 text-teal-600" />
            <span>Appointment Requests</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
            Schedule Your Consultation
          </h2>
          <div className="mx-auto w-16 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Submit your details below to request an appointment slot. Our front-desk health coordinator will review the slot and reach out to you via SMS or phone within 2 hours.
          </p>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Booking Form Card (Lg: Col-span 7) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md relative">
            
            {/* Real-time Confirmation Overlay */}
            {isSubmitted && lastBooking && (
              <div className="absolute inset-0 bg-white z-20 rounded-2xl p-6 sm:p-8 flex flex-col justify-center items-center text-center space-y-6 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shadow-inner">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900">Request Successfully Filed!</h3>
                  <p className="text-slate-500 text-sm max-w-md mx-auto">
                    Your request has been securely queued under Booking ID <strong className="text-teal-700">#{lastBooking.id}</strong>. We've sent a placeholder notification to <span className="font-semibold">{lastBooking.email}</span>.
                  </p>
                </div>

                {/* Booking summary ticket representation */}
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-left w-full max-w-md space-y-3.5">
                  <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Appointment Ticket</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-md">
                      Pending Confirmation
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-3 text-xs">
                    <div>
                      <p className="text-slate-400 font-medium">Patient</p>
                      <p className="text-slate-800 font-bold">{lastBooking.patientName}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-medium">Phone</p>
                      <p className="text-slate-800 font-bold">{lastBooking.phoneNumber}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-medium">Proposed Date</p>
                      <p className="text-slate-800 font-bold">
                        {new Date(lastBooking.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-medium">Requested Time</p>
                      <p className="text-slate-800 font-bold">{lastBooking.time}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs tracking-wide transition-colors cursor-pointer"
                  >
                    Set Another Slot
                  </button>
                  <a
                    href="#timings-location"
                    className="w-full sm:w-auto px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs tracking-wide text-center transition-colors shadow-sm cursor-pointer"
                  >
                    View Clinic Route
                  </a>
                </div>
              </div>
            )}

            {/* Title inside card */}
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
              Request Booking Form
            </h3>

            {/* Core Form Element */}
            <form onSubmit={handleSubmit} className="space-y-4" id="appointment-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Patient Name */}
                <div className="space-y-1">
                  <label htmlFor="patientName" className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center">
                    <User className="h-3 w-3 text-teal-600 mr-1.5 shrink-0" />
                    Patient Full Name
                  </label>
                  <input
                    type="text"
                    id="patientName"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter full name"
                    className={`w-full px-3 py-2 md:py-2.5 bg-slate-50 border ${
                      errors.patientName ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-teal-500 focus:bg-white"
                    } rounded-lg text-xs outline-none focus:ring-1 focus:ring-teal-500 text-slate-700 font-semibold transition-all`}
                  />
                  {errors.patientName && (
                    <p className="text-[10px] font-semibold text-rose-600 mt-1">{errors.patientName}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label htmlFor="phoneNumber" className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center">
                    <Phone className="h-3 w-3 text-teal-600 mr-1.5 shrink-0" />
                    Phone/WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. +923357654162"
                    className={`w-full px-3 py-2 md:py-2.5 bg-slate-50 border ${
                      errors.phoneNumber ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-teal-500 focus:bg-white"
                    } rounded-lg text-xs outline-none focus:ring-1 focus:ring-teal-500 text-slate-700 font-semibold transition-all`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-[10px] font-semibold text-rose-600 mt-1">{errors.phoneNumber}</p>
                  )}
                </div>

              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label htmlFor="email" className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center">
                  <Mail className="h-3 w-3 text-teal-600 mr-1.5 shrink-0" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className={`w-full px-3 py-2 md:py-2.5 bg-slate-50 border ${
                    errors.email ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-teal-500 focus:bg-white"
                  } rounded-lg text-xs outline-none focus:ring-1 focus:ring-teal-500 text-slate-700 font-semibold transition-all`}
                />
                {errors.email && (
                  <p className="text-[10px] font-semibold text-rose-600 mt-1">{errors.email}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Date Preferred */}
                <div className="space-y-1">
                  <label htmlFor="bookingDate" className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center">
                    <Calendar className="h-3 w-3 text-teal-600 mr-1.5 shrink-0" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    id="bookingDate"
                    min={getMinDateString()}
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className={`w-full px-3 py-2 md:py-2.5 bg-slate-50 border ${
                      errors.bookingDate ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-teal-500 focus:bg-white"
                    } rounded-lg text-xs outline-none focus:ring-1 focus:ring-teal-500 text-slate-700 font-semibold transition-all`}
                  />
                  {errors.bookingDate && (
                    <p className="text-[10px] font-semibold text-rose-600 mt-1">{errors.bookingDate}</p>
                  )}
                </div>

                {/* Preferred Hours slot */}
                <div className="space-y-1">
                  <label htmlFor="bookingTime" className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center">
                    <Clock className="h-3 w-3 text-teal-600 mr-1.5 shrink-0" />
                    Preferred Timing Slot
                  </label>
                  <select
                    id="bookingTime"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className={`w-full px-3 py-2 md:py-2.5 bg-slate-50 border ${
                      errors.bookingTime ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-teal-500 focus:bg-white"
                    } rounded-lg text-xs outline-none focus:ring-1 focus:ring-teal-500 text-slate-700 font-semibold transition-all`}
                  >
                    <option value="">Select a clinic hour slot</option>
                    <option value="08:30 AM - 10:00 AM">Morning Early: 08:30 AM - 10:00 AM</option>
                    <option value="10:00 AM - 12:00 PM">Morning late: 10:00 AM - 12:00 PM</option>
                    <option value="12:00 PM - 02:00 PM">Mid-day slot: 12:00 PM - 02:00 PM</option>
                    <option value="02:00 PM - 04:00 PM">Afternoon early: 02:00 PM - 04:00 PM</option>
                    <option value="04:00 PM - 05:30 PM">Late Afternoon: 04:00 PM - 05:30 PM</option>
                  </select>
                  {errors.bookingTime && (
                    <p className="text-[10px] font-semibold text-rose-600 mt-1">{errors.bookingTime}</p>
                  )}
                </div>

              </div>

              {/* Reason for Visit */}
              <div className="space-y-1">
                <label htmlFor="reason" className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center">
                  <MessageSquare className="h-3 w-3 text-teal-600 mr-1.5 shrink-0" />
                  Reason for Consultation Visit
                </label>
                <textarea
                  id="reason"
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Cardiovascular screening, high blood pressure followup, general physical wellness chest pain assessment, etc."
                  className={`w-full px-3 py-2 bg-slate-50 border ${
                    errors.reason ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-teal-500 focus:bg-white"
                  } rounded-lg text-xs outline-none focus:ring-1 focus:ring-teal-500 text-slate-700 font-semibold transition-all`}
                ></textarea>
                {errors.reason && (
                  <p className="text-[10px] font-semibold text-rose-600 mt-1">{errors.reason}</p>
                )}
              </div>

              {/* Core Disclaimer Warning */}
              <div className="flex items-start space-x-3 p-4 rounded-xl bg-amber-50 border border-amber-200 shadow-3xs text-[11px] text-amber-900 leading-relaxed font-semibold">
                <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-950 uppercase text-[9px] tracking-wider mb-0.5">Emergency Use Advisory Note</p>
                  "This form is for appointment requests only. For emergencies, please contact emergency services or visit the nearest hospital."
                </div>
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                id="submit-booking-btn"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition-all shadow-md shadow-teal-100 hover:shadow-lg active:scale-98 tracking-wide cursor-pointer text-xs flex items-center justify-center space-x-2"
              >
                <span>Confirm Request</span>
              </button>

            </form>

          </div>

          {/* Interactive "My Bookings" Tracker Sidebar (Lg: Col-span 5) */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-6 lg:mt-0">
            
            {/* Quick Assistance Reassurance */}
            <div className="bg-gradient-to-br from-teal-700 to-teal-950 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-600/20 rounded-full blur-2xl"></div>
              
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-white/10 rounded-xl">
                  <HelpCircle className="h-6 w-6 text-teal-300" />
                </div>
                <div>
                  <h4 className="text-md sm:text-lg font-bold font-display">Need Immediate Scheduling?</h4>
                  <p className="text-[11px] uppercase tracking-wider text-teal-200 font-bold">Fast-Lane Coordinators</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
                If you prefer instant chat scheduling, you can bypass this form entirely. Reach out to our receptionist directly over WhatsApp for a real-time reservation.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${DOCTOR_DETAILS.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-xl transition-colors shadow-inner"
                  id="booking-whatsapp-direct"
                >
                  <svg className="h-4.5 w-4.5 fill-white" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-11.12c-.124-.207-.463-.33-.977-.587-.514-.257-3.04-1.502-3.515-1.674-.475-.171-.822-.257-1.169.257-.348.514-1.348 1.674-1.653 2.017-.306.343-.611.386-1.125.129-.514-.257-2.172-.801-4.137-2.553-1.528-1.364-2.56-3.05-2.86-3.563-.306-.514-.033-.792.224-1.049.232-.23.514-.587.771-.88.257-.293.343-.497.514-.829.172-.33.086-.617-.043-.88-.129-.257-1.169-2.83-1.602-3.857-.422-1.02-.85-.882-1.17-.899-.302-.016-.648-.02-1.08-.02s-1.134.162-1.727.81c-.593.647-2.26 2.211-2.26 5.392 0 3.181 2.312 6.257 2.63 6.68.318.423 4.548 6.945 11.02 9.736 1.538.663 2.741 1.058 3.676 1.355 1.545.49 2.952.42 4.06.255 1.236-.185 3.04-1.243 3.47-2.441.43-1.2 1.43-2.21 1.134-2.44-.297-.23-1.115-.646-2.21-1.185z" fillRule="evenodd" clipRule="evenodd"/>
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href={`tel:${DOCTOR_DETAILS.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center justify-center space-x-2 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors shrink-0"
                >
                  <span>Direct Call Now</span>
                </a>
              </div>
            </div>

            {/* Supabase & Local Bookings Dashboard */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
              <div className="flex flex-col space-y-2 pb-3 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center">
                    <span className={`w-2.5 h-2.5 rounded-full ${supabaseTableMissing ? 'bg-amber-400 animate-pulse' : dbError ? 'bg-rose-500' : 'bg-emerald-500'} mr-2`}></span>
                    My Active Appt Requests ({allBookings.length})
                  </h4>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={fetchBookings}
                      title="Sync with cloud"
                      className="p-1 rounded text-slate-400 hover:text-teal-600 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <RefreshCw className={`h-3.5 w-3.5 ${dbLoading ? 'animate-spin text-teal-600' : ''}`} />
                    </button>
                    {allBookings.length > 0 && (
                      <button
                        onClick={() => {
                          if (confirm("Are you sure you want to clear your local booking history?")) {
                            saveBookings([]);
                          }
                        }}
                        className="text-[10px] text-slate-400 hover:text-rose-600 font-bold tracking-wide cursor-pointer"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                </div>

                {/* Connection Sub-Indicator */}
                <div className="flex items-center space-x-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  <Database className="h-3 w-3 text-slate-400" />
                  <span>
                    Database: {supabaseTableMissing ? (
                      <span className="text-amber-605">Table Setup Required</span>
                    ) : dbError ? (
                      <span className="text-rose-600">Offline Fallback</span>
                    ) : (
                      <span className="text-emerald-600">Supabase Connected</span>
                    )}
                  </span>
                </div>
              </div>

              {/* Table Missing Alert Box with SQL Editor Query */}
              {supabaseTableMissing && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-950 space-y-2.5">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-amber-950 uppercase text-[9px] tracking-wider">Supabase Table Required</h5>
                      <p className="text-slate-600 mt-0.5 leading-relaxed text-[10px]">
                        The connection works perfectly, but the <strong>appointments</strong> table is missing. Run this command in your <strong>Supabase SQL Editor</strong>:
                      </p>
                    </div>
                  </div>
                  <div className="relative bg-white border border-amber-100 rounded-lg overflow-hidden">
                    <pre className="p-3 text-[9px] font-mono whitespace-pre overflow-x-auto text-slate-700 bg-slate-50">
{`CREATE TABLE appointments (
  id TEXT PRIMARY KEY,
  patient_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL,
  reason TEXT,
  status TEXT DEFAULT 'pending',
  created_at TEXT NOT NULL,
  created_at_db TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);`}
                    </pre>
                  </div>
                  <p className="text-[10px] text-amber-800 leading-tight italic">
                    Once run, click the recycle spin icon above to synchronize instantly!
                  </p>
                </div>
              )}

              {allBookings.length === 0 ? (
                <div className="py-8 text-center text-slate-400 space-y-2">
                  <div className="text-3xl">📭</div>
                  <p className="text-xs font-semibold">No appointment requested from this device yet.</p>
                  <p className="text-[10px] max-w-xs mx-auto">Use the form on the left to submit an appointment request and track your pending status here!</p>
                </div>
              ) : (
                <div className="max-h-[300px] overflow-y-auto space-y-3.5 pr-1.5 custom-scrollbar">
                  {allBookings.map((b) => (
                    <div
                      key={b.id}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-150 relative space-y-2.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black text-slate-400">
                          ID: #{b.id}
                        </span>
                        
                        <div className="flex items-center space-x-2">
                          {b.status === "pending" && (
                            <span className="text-[10px] uppercase tracking-wider font-extrabold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-md animate-pulse">
                              Pending Setup
                            </span>
                          )}
                          {b.status === "cancelled" && (
                            <span className="text-[10px] uppercase tracking-wider font-extrabold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md">
                              Cancelled
                            </span>
                          )}

                          <button
                            onClick={() => handleDeleteRecord(b.id)}
                            className="p-1 rounded-md text-slate-300 hover:text-rose-600 hover:bg-rose-50"
                            title="Delete record from this list"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="text-xs">
                        <p className="font-bold text-slate-900">{b.patientName}</p>
                        <p className="text-slate-500 font-medium">Proposed: {b.date} &bull; {b.time}</p>
                        <p className="text-slate-400 mt-1 line-clamp-1 italic text-[11px]">Reason: "{b.reason}"</p>
                      </div>

                      {b.status === "pending" && (
                        <div className="flex items-center justify-end pt-1">
                          <button
                            onClick={() => handleCancelBooking(b.id)}
                            className="text-[10px] font-bold text-rose-600 hover:text-rose-800 flex items-center"
                          >
                            <X className="h-3 w-3 mr-0.5" />
                            Cancel booking request
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
