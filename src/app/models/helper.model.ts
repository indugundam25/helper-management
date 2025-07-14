export interface Helper {
  photo?: File | string;         
  role: string;
  organization: string;
  name: string;
  languages: string[];
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email?: string;
}
