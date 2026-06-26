import { Payment } from "@/types/payment";

export const payments: Payment[] = [
  {
    id: "pay-100",
    appointmentId: "apt-1001",
    patientName: "Sarah Johnson",
    doctorName: "Dr. Amelia Carter",
    amount: 180,
    method: "Card",
    status: "paid",
    date: "2026-06-20",
  },
  {
    id: "pay-101",
    appointmentId: "apt-1002",
    patientName: "Michael Torres",
    doctorName: "Dr. Noah Bennett",
    amount: 140,
    method: "Insurance",
    status: "pending",
    date: "2026-06-22",
  },
  {
    id: "pay-102",
    appointmentId: "apt-1005",
    patientName: "Michael Torres",
    doctorName: "Dr. Amelia Carter",
    amount: 180,
    method: "Card",
    status: "refunded",
    date: "2026-06-15",
  },
];
