import { Service, Testimonial, FAQ, ClinicTiming } from './types';

export const DOCTOR_DETAILS = {
  fullName: "Dr. Evelyn Vance",
  titleName: "Dr. Evelyn Vance, MD, FACC",
  specialization: "Cardiologist & General Physician",
  tagline: "Compassionate, clinical excellence for your heart and lifelong wellbeing.",
  qualification: "MD, Harvard Medical School; Fellowship in Cardiology, Johns Hopkins Hospital",
  experience: "14+ Years of Expert Practice",
  clinicName: "Vance Heart & Wellness Clinic",
  address: "450 Sutter Street, Suite 1800, San Francisco, CA 94108",
  phone: "+92 335 7654162",
  whatsapp: "923357654162",
  email: "contact@vanceclinic.com",
};

export const CLINIC_TIMINGS: { MonFri: ClinicTiming; Sat: ClinicTiming; Sun: ClinicTiming } = {
  MonFri: {
    days: "Monday - Friday",
    hours: "08:30 AM - 05:30 PM",
    isClosed: false
  },
  Sat: {
    days: "Saturday",
    hours: "09:00 AM - 02:00 PM",
    isClosed: false
  },
  Sun: {
    days: "Sunday",
    hours: "Closed",
    isClosed: true
  }
};

export const SERVICES: Service[] = [
  {
    id: "general-consult",
    title: "General Consultation",
    description: "Comprehensive medical evaluations focusing on full-body wellness, acute symptom diagnosis, and customized medical care plans.",
    iconName: "Stethoscope",
    category: "Primary Care",
    bulletPoints: [
      "Thorough physical examinations",
      "Acute illness diagnosis & treatment",
      "Routine screenings & risk checks",
      "Prescription management"
    ]
  },
  {
    id: "cardiac-screening",
    title: "Cardiovascular Screening",
    description: "Advanced cardiac risk assessment utilizing high-precision resting ECG, lipid profiles, and cardiovascular risk calculators.",
    iconName: "Heart",
    category: "Specialized Cardiology",
    bulletPoints: [
      "Symptom assessment (palpitations, chest pain)",
      "High-resolution resting ECG",
      "Early atherosclerosis checks",
      "Aneurysm and peripheral risk appraisal"
    ]
  },
  {
    id: "hypertension-mgmt",
    title: "Hypertension & Cholesterol Carey",
    description: "Evidence-based clinical protocols to manage elevated blood pressure and hyperlipidemia, mitigating stroke and heart risks.",
    iconName: "Activity",
    category: "Specialized Cardiology",
    bulletPoints: [
      "Custom pharmacotherapy assessment",
      "Dietary and metabolic intervention",
      "Continuous arterial monitoring",
      "Organ damage prevention tracking"
    ]
  },
  {
    id: "preventative-health",
    title: "Preventive Health Advice",
    description: "Individualized lifestyle blueprints designed to preempt hereditary genetic risks and support robust cardiac performance.",
    iconName: "ShieldCheck",
    category: "Preventative",
    bulletPoints: [
      "Genetic history risk counseling",
      "Vascular age assessments",
      "Stress-reduction clinical strategies",
      "Tailored screening frequencies"
    ]
  },
  {
    id: "followup-care",
    title: "Continuous Follow-up Care",
    description: "Structured medical oversight for chronic symptoms and post-discharge rehabilitation to ensure steady recovery goals.",
    iconName: "Clock",
    category: "Primary Care",
    bulletPoints: [
      "Post-procedure cardiac monitoring",
      "Graduated functional therapy adjustments",
      "Frequent response checkups",
      "Coordinated laboratory reviews"
    ]
  },
  {
    id: "lifestyle-diet",
    title: "Cardiometabolic Counseling",
    description: "Structured dietary and metabolic counseling to optimize insulin sensitivity, vascular elasticity, and natural energy.",
    iconName: "Award",
    category: "Preventative",
    bulletPoints: [
      "Clinical nutritional planning",
      "Safe exercise prescription",
      "Sleep quality optimization",
      "Weight-to-lipid metabolism analysis"
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Jenkins",
    role: "Patient since 2023",
    rating: 5,
    comment: "Dr. Vance is exceptionally professional and caring. She took the time to answer all my questions about my heart condition. I never felt rushed, and the clinic staff is wonderful.",
    date: "May 2026"
  },
  {
    id: "t2",
    name: "Michael Thornton",
    role: "Patient since 2021",
    rating: 5,
    comment: "I've been visiting Vance Clinic for my blood pressure management. The care is exceptionally personal, and Dr. Vance's guidance on lifestyle changes helped me reduce my medication safely. Highly recommend!",
    date: "April 2026"
  },
  {
    id: "t3",
    name: "Amara Patel",
    role: "Patient since 2024",
    rating: 5,
    comment: "The clinic is immaculate, pristine and relaxing. Direct, clear medical advice with zero jargon. Scheduling via the website was smooth, and the follow-up support is highly proactive.",
    date: "June 2026"
  }
];

export const FAQS: FAQ[] = [
  {
    id: "f1",
    question: "How can I book an appointment?",
    answer: "You can easily book using our online form on this website, or call us directly at +92 335 7654162. We also offer quick scheduling through WhatsApp.",
    category: "Appointments"
  },
  {
    id: "f2",
    question: "What should I bring for my first consultation?",
    answer: "Please bring any past medical records, diagnostic test results, a list of current medications, and a valid photo ID. Arriving 10 minutes early helps us complete check-in smoothly.",
    category: "General"
  },
  {
    id: "f3",
    question: "Do you accept walk-in patients?",
    answer: "While we prioritize scheduled appointments to avoid wait times, we do accept walk-ins for urgent non-emergency General Physician consultations, subject to doctor availability.",
    category: "General"
  },
  {
    id: "f4",
    question: "What are the clinic timings?",
    answer: "We are open Monday through Friday from 08:30 AM to 05:30 PM, and Saturday from 09:00 AM to 02:00 PM. We are closed on Sundays.",
    category: "Scheduling"
  },
  {
    id: "f5",
    question: "Can I book through WhatsApp?",
    answer: "Yes absolutely! Clicking our 'Chat on WhatsApp' button will connect you directly to our front desk coordinator, who can schedule your consultation or answer routine queries.",
    category: "Appointments"
  }
];

export const WHY_CHOOSE_US = [
  {
    id: "wc1",
    title: "Experienced Doctor",
    description: "Dr. Vance brings over 14 years of clinical practice in cardiology and primary care from world-renowned medical hospitals."
  },
  {
    id: "wc2",
    title: "Patient-Centered Care",
    description: "We treat you as a whole person, not just a set of symptoms. Your unique lifestyle, comfort, and aspirations inform our care plans."
  },
  {
    id: "wc3",
    title: "Clean and Comfortable Clinic",
    description: "Our state-of-the-art office maintains rigorous medical sterilization protocols while keeping a warm, relaxing, quiet ambiance."
  },
  {
    id: "wc4",
    title: "Easy Appointment Booking",
    description: "Schedule sessions easily through our web booking tool, direct phone line, or via real-time messaging on WhatsApp."
  },
  {
    id: "wc5",
    title: "Clear Medical Guidance",
    description: "Your health conditions and care options are explained with utmost clarity—devoid of complex medical jargon."
  },
  {
    id: "wc6",
    title: "Friendly & Empathetic Environment",
    description: "From our dedicated front-desk staff to Dr. Vance herself, our entire clinic team approaches your care with kindness."
  }
];
