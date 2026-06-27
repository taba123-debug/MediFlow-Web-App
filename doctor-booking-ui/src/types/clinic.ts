export type Clinic = {
  id: string;
  name: string;
  address?: string;
  description?: string;
  location?: string;
  [key: string]: unknown;
};
