import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/helper-management';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}; 