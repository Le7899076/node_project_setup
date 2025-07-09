import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/testing', {
    timezone: '+00:00',
    logging: false,
});

export default sequelize;

