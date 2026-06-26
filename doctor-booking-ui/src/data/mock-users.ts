import { User } from "@/types/user";

export const patientUsers: User[] = [
  {
    id: "pat-1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 555 204 9981",
    role: "patient",
    location: "Austin, TX",
    joinedAt: "2025-11-04",
    status: "active",
  },
  {
    id: "pat-2",
    name: "Michael Torres",
    email: "michael.torres@example.com",
    phone: "+1 555 882 0014",
    role: "patient",
    location: "Seattle, WA",
    joinedAt: "2026-01-18",
    status: "active",
  },
  {
    id: "pat-3",
    name: "Nina Patel",
    email: "nina.patel@example.com",
    phone: "+1 555 239 4401",
    role: "patient",
    location: "Boston, MA",
    joinedAt: "2026-03-12",
    status: "pending",
  },
];

export const doctorUsers: User[] = [
  {
    id: "doc-user-1",
    name: "Dr. Amelia Carter",
    email: "amelia.carter@northwind.com",
    phone: "+1 555 433 2201",
    role: "doctor",
    location: "Boston, MA",
    joinedAt: "2025-08-20",
    status: "active",
  },
  {
    id: "doc-user-2",
    name: "Dr. Olivia Shah",
    email: "olivia.shah@wellspring.com",
    phone: "+1 555 400 7801",
    role: "doctor",
    location: "Austin, TX",
    joinedAt: "2025-06-12",
    status: "active",
  },
];

export const adminUsers: User[] = [
  {
    id: "admin-1",
    name: "Jordan Ellis",
    email: "jordan@medflowhq.com",
    phone: "+1 555 743 0001",
    role: "admin",
    location: "Remote",
    joinedAt: "2025-01-10",
    status: "active",
  },
];
