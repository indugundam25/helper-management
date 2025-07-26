import mongoose, { Schema, Document } from 'mongoose';


export interface IDocument {
  type: string;
  fileName: string;
  url: string;
  publicId: string;
}
const DocumentSchema: Schema = new Schema({
  type: { type: String, required: true },
  fileName: { type: String, required: true },
  url: { type: String, required: true },
  publicId: { type: String, required: true }
});

export interface ICounter extends Document {
  _id: string;
  seq: number;
}

const CounterSchema: Schema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 10000 },
});

const CounterModel = mongoose.model<ICounter>('Counter', CounterSchema);

export interface IHelper extends Document {
  photo?: string;
  photoUrl?: string;
  photoPublicId?: string;
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

const HelperSchema: Schema = new Schema(
  {
    photo: { type: String },
    photoUrl: { type: String },
    photoPublicId: { type: String },
    empCode: { type: Number, unique: true },
    role: { type: String, required: true },
    organization: { type: String, required: true },
    name: { type: String, required: true },
    languages: { type: [String], required: true },
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
    vehicleType: { type: String },
    number: { type: String },
    documents: [DocumentSchema],
  },
  { timestamps: true }
);


HelperSchema.pre<IHelper>('validate', async function (next) {
  if (this.isNew) {
    try {
      const counter = await CounterModel.findByIdAndUpdate(
        { _id: 'empCode' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      this.empCode = counter.seq;
      next();
    } catch (err) {
      // next(err); // Proper error propagation
    }
  } else {
    next();
  }
});

export default mongoose.model<IHelper>('Helper', HelperSchema);
