import log from '@utils/logger.utils';
import mongoose from 'mongoose';
import config from '@config/database.config';

export const connectMongo = async (): Promise<void> => {
  const { url } = config.connections.mongo;
  
  if (!url) throw new Error('MONGO_URL not set');

  try {
    await mongoose.connect(url);
    log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
};
