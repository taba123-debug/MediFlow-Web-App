export type AppointmentStatus =
  | "confirmed"
  | "pending"
  | "completed"
  | "cancelled"
  | "rescheduled";

export type Appointment = {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  clinic: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  type: "In-person" | "Video";
  reason: string;
  notes?: string;
  paymentStatus: "paid" | "unpaid" | "refunded";
};
