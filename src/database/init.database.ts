import { connectMongo } from '@database/mongo.database';
import sequelize from '@database/postgres.database';
import User from '@models/sequelize/user.model';

import bcrypt from 'bcrypt';
// import { connectPostgres } from '@database/postgres.database';

export const initializeDatabases = async (): Promise<void> => {

  await connectMongo();

  try {
    await sequelize.authenticate();
    console.log('✅ Connected to PostgreSQL');

    await sequelize.sync({ alter: true }); // or { force: true } for dropping and recreating
    console.log('✅ Tables synced');

   
  } catch (error) {
    console.error('❌ DB init error:', error);
  }
};
