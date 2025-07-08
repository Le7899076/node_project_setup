import { connectMongo } from '@database/mongo.database';
import { connectPostgres } from '@database/postgres.database';

export const initializeDatabases = async (): Promise<void> => {
  try {
    await connectMongo();
    await connectPostgres();
  } catch (err) {
    console.error('❌ Error initializing databases:', err);
    process.exit(1);
  }
};
