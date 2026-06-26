import { Doctor } from "@/types/doctor";

export const doctors: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Amelia Carter",
    specialty: "Cardiology",
    clinic: "Northwind Medical Center",
    location: "Boston, MA",
    experience: 12,
    fee: 180,
    rating: 4.9,
    reviewsCount: 124,
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
    about:
      "Specialist in preventive cardiology and chronic heart care with a strong focus on patient education.",
    languages: ["English", "Spanish"],
    tags: ["Top Rated", "Video Visits", "Same Week"],
    education: ["MD, Johns Hopkins University", "Fellowship, Mass General"],
    highlights: [
      "Heart failure care",
      "Preventive screenings",
      "Lifestyle treatment plans",
    ],
    availability: [
      { day: "Mon", slots: ["09:00 AM", "10:30 AM", "02:00 PM"] },
      { day: "Tue", slots: ["11:00 AM", "01:00 PM", "04:30 PM"] },
      { day: "Thu", slots: ["09:30 AM", "12:00 PM", "03:30 PM"] },
    ],
    reviews: [
      {
        patientName: "Sophia Lee",
        rating: 5,
        comment: "Very clear consultation and a thoughtful follow-up plan.",
        date: "2026-06-10",
      },
      {
        patientName: "David Hall",
        rating: 5,
        comment: "Explained everything in simple terms and made me feel at ease.",
        date: "2026-05-28",
      },
    ],
  },
  {
    id: "doc-2",
    name: "Dr. Noah Bennett",
    specialty: "Dermatology",
    clinic: "Harbor Care Clinic",
    location: "Seattle, WA",
    experience: 9,
    fee: 140,
    rating: 4.8,
    reviewsCount: 89,
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
    about:
      "Treats chronic skin conditions, acne programs, and digital dermatology follow-ups.",
    languages: ["English", "French"],
    tags: ["Fast Booking", "Photo Review"],
    education: ["MD, UCLA", "Residency, Stanford Health"],
    highlights: ["Acne treatment", "Eczema care", "Laser consultations"],
    availability: [
      { day: "Wed", slots: ["08:30 AM", "10:00 AM", "01:30 PM"] },
      { day: "Fri", slots: ["09:00 AM", "11:30 AM", "03:00 PM"] },
    ],
    reviews: [
      {
        patientName: "Ava Moore",
        rating: 4,
        comment: "Great treatment plan and the photo upload process was easy.",
        date: "2026-06-08",
      },
    ],
  },
  {
    id: "doc-3",
    name: "Dr. Olivia Shah",
    specialty: "Pediatrics",
    clinic: "WellSpring Health Hub",
    location: "Austin, TX",
    experience: 14,
    fee: 120,
    rating: 4.9,
    reviewsCount: 201,
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80",
    about:
      "Family-centered pediatrician offering preventive visits, same-day care, and growth tracking.",
    languages: ["English", "Hindi"],
    tags: ["Family Favorite", "Weekend Hours"],
    education: ["MD, Baylor College of Medicine"],
    highlights: ["Vaccination plans", "Infant care", "Asthma management"],
    availability: [
      { day: "Mon", slots: ["09:00 AM", "11:00 AM", "03:00 PM"] },
      { day: "Sat", slots: ["10:00 AM", "12:30 PM"] },
    ],
    reviews: [
      {
        patientName: "Emma Brooks",
        rating: 5,
        comment: "Wonderful with kids and always punctual.",
        date: "2026-06-14",
      },
    ],
  },
  {
    id: "doc-4",
    name: "Dr. Ethan Ramirez",
    specialty: "Neurology",
    clinic: "Greenline Family Practice",
    location: "Chicago, IL",
    experience: 11,
    fee: 210,
    rating: 4.7,
    reviewsCount: 76,
    image:
      "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=800&q=80",
    about:
      "Supports headache, migraine, and cognitive care with coordinated digital monitoring.",
    languages: ["English"],
    tags: ["Consultation Notes", "Care Plans"],
    education: ["MD, Northwestern University"],
    highlights: ["Migraine management", "Sleep-related neurology", "MRI review"],
    availability: [
      { day: "Tue", slots: ["10:00 AM", "12:00 PM", "02:30 PM"] },
      { day: "Thu", slots: ["09:00 AM", "01:00 PM"] },
    ],
    reviews: [
      {
        patientName: "James Reed",
        rating: 4,
        comment: "Took time to review prior reports before the visit.",
        date: "2026-06-02",
      },
    ],
  },
];
