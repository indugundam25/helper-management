export interface IDocument {
    type: string;
    fileName: string;
    url: string;
    publicId: string;
}

export interface IHelper {
    createdAt: string | undefined;
    _id?: string;
    photo?: string;
    photoUrl?: string;
    empCode: number;
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