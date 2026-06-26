export type DoctorAvailability = {
  day: string;
  slots: string[];
};

export type DoctorReview = {
  patientName: string;
  rating: number;
  comment: string;
  date: string;
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  clinic: string;
  location: string;
  experience: number;
  fee: number;
  rating: number;
  reviewsCount: number;
  image: string;
  about: string;
  languages: string[];
  availability: DoctorAvailability[];
  tags: string[];
  education: string[];
  highlights: string[];
  reviews: DoctorReview[];
};
