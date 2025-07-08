import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/testing');

// Test connection
export const connectPostgres = async () => {
    try {
        await sequelize.authenticate();
        console.log('Postgres connected.');
    } catch (error) {
        console.error('Postgres connection error: ', error);
    }
};


