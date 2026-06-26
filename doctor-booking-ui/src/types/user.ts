export type UserRole = "patient" | "doctor" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  location: string;
  joinedAt: string;
  status: "active" | "inactive" | "pending";
};
