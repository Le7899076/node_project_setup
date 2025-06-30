import mongoose from 'mongoose';

export const connectMongo = async (): Promise<void> => {
  const { MONGO_URL } = process.env;
  if (!MONGO_URL) throw new Error('MONGO_URL not set');

  try {
    await mongoose.connect(MONGO_URL);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
};
