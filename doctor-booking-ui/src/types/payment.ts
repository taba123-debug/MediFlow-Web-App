export type Payment = {
  id: string;
  appointmentId: string;
  patientName: string;
  doctorName: string;
  amount: number;
  method: "Card" | "Insurance" | "Wallet" | "Cash";
  status: "paid" | "pending" | "failed" | "refunded";
  date: string;
};
