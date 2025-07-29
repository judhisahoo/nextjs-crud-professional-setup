import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error('Mongo URI is missing!');

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) console.log('Mongo DB connected successfully !!');

  return mongoose.connect(MONGODB_URI);
};
