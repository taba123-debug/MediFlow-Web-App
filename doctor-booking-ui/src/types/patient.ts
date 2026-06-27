export type PatientProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  location?: string;
  status?: "active" | "inactive" | "pending";
  notes?: string;
  [key: string]: unknown;
};
