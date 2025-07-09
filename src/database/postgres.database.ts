import logger from '@utils/winston.logger.utils';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/testing', {
    timezone: '+00:00',
    logging: (msg) => logger.info(`🧾 Sequelize: ${msg}`),
});

export default sequelize;

