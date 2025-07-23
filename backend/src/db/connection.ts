import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  const URI = process.env.MONGODB_URI;
  if (!URI) {
    throw new Error('MONGODB_URI not defined in environment variables');
  }

  try {
    await mongoose.connect(URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
