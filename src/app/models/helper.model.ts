export interface ApiResponse<T> {
  message?: string;
  helpers: T;
}

export interface IDocument {
  type: string;
  fileName: string;
  base64Data: string;
}

export interface IHelper {
  _id?: string;
  photo?: string;
  photoUrl?: string;
  photoPublicId?: string;
  empId: number;
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
