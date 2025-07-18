import mongoose, { Schema, Document } from 'mongoose';

export interface IDocument {
  type: string;
  fileName: string;
  base64Data: string;
}

export interface IHelper extends Document {
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

const DocumentSchema: Schema = new Schema({
  type: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  base64Data: {
    type: String,
    required: true,
  }
});

const HelperSchema: Schema = new Schema(
  {
    photo: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    organization: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    languages: {
      type: [String],
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      match: /.+\@.+\..+/,
    },
    vehicleType: {
      type: String
    },
    number: {
      type: String
    },
    documents: [DocumentSchema]
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IHelper>('Helper', HelperSchema);
