export interface ApiResponse<T> {
  message?: string;
  data: T;
}

export interface IDocument {
  type: string;
  fileName: string;
  base64Data: string;
}

export interface IHelper {
  _id?: string;
  photo?: string;
  role: string;
  organization: string;
  name: string;
  languages: string[];
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email?: string;
  vehicleType?: string;
  number?: string;
  documents?: IDocument[];
}
