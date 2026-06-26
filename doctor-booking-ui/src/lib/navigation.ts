import {
  CalendarClock,
  CalendarHeart,
  CircleDollarSign,
  ClipboardList,
  FileBarChart2,
  FileHeart,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Star,
  Stethoscope,
  Users,
  Wallet,
} from "lucide-react";
import { SidebarItem } from "@/components/layout/sidebar";

export const patientSidebar: SidebarItem[] = [
  { href: "/patient/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/patient/book", label: "Book Appointment", icon: CalendarHeart },
  { href: "/patient/appointments", label: "My Appointments", icon: CalendarClock },
  { href: "/patient/profile", label: "Profile", icon: Users },
  { href: "/patient/medical-records", label: "Medical Records", icon: FileHeart },
  { href: "/patient/reviews", label: "Reviews", icon: Star },
];

export const doctorSidebar: SidebarItem[] = [
  { href: "/doctor/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/doctor/profile", label: "Profile", icon: Stethoscope },
  { href: "/doctor/availability", label: "Availability", icon: CalendarClock },
  { href: "/doctor/appointments", label: "Appointments", icon: ClipboardList },
  { href: "/doctor/patients", label: "Patients", icon: Users },
  { href: "/doctor/earnings", label: "Earnings", icon: CircleDollarSign },
];

export const adminSidebar: SidebarItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/doctors", label: "Doctors", icon: Stethoscope },
  { href: "/admin/patients", label: "Patients", icon: Users },
  { href: "/admin/appointments", label: "Appointments", icon: ClipboardList },
  { href: "/admin/specialties", label: "Specialties", icon: ShieldCheck },
  { href: "/admin/clinics", label: "Clinics", icon: FileHeart },
  { href: "/admin/payments", label: "Payments", icon: Wallet },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/reports", label: "Reports", icon: FileBarChart2 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];
