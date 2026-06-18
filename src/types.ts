export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // Refers to the Lucide icon name
  category: string;
  bulletPoints: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  phoneNumber: string;
  email: string;
  date: string;
  time: string;
  reason: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface ClinicTiming {
  days: string;
  hours: string;
  isClosed: boolean;
}
