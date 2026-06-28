export type Clinic = {
  id: string;
  name: string;
  address?: string;
  description?: string;
  location?: string;
  city?: string;
  isActive?: boolean;
  [key: string]: unknown;
};
