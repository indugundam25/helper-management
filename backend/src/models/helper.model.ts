import mongoose, { Schema, Document } from 'mongoose';

export interface IDocument {
  type: string;
  fileName: string;
  base64Data: string;
}
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
  empCode?: number;
}

// 3. Document schema
const DocumentSchema: Schema = new Schema({
  type: { type: String, required: true },
  fileName: { type: String, required: true },
  base64Data: { type: String, required: true },
});

// 4. Helper schema
const HelperSchema: Schema = new Schema(
  {
    photo: { type: String },
    empId: { type: Number },
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
    empCode: {
      type: Number,
      required: true,
      unique: true,
    },
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
      this.empId = this.empCode + 1;
      next();
    } catch (err) {
      // next(err);
    }
  } else {
    next();
  }
});

export default mongoose.model<IHelper>('Helper', HelperSchema);
