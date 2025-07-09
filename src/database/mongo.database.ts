import log from '@utils/logger.utils';
import mongoose from 'mongoose';
import config from '@config/database.config';

export const connectMongo = async (): Promise<void> => {
  try {
    const { url } = config.connections.mongo;

    if (!url) {
      throw new Error('Please config {MONGO_URL} in your env file.');
    }

    await mongoose.connect(url);
    log('✅ MongoDB connected successfully.');
  } catch (err) {
    log('❌ MongoDB connection failed: ', err);
    throw err;
  }
};
