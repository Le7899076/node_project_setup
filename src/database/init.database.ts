import { connectMongo } from '@database/mongo.database';

export const initializeDatabases = async (): Promise<void> => {
  try {
    await connectMongo();
  } catch (err) {
    console.error('❌ Error initializing databases:', err);
    process.exit(1);
  }
};
