import dotenv from 'dotenv';

dotenv.config();

export default {
    // 'default': process.env.DB_CONNECTION!,
    'connections': {
        'mysql': {
            'url': process.env.DATABASE_URL!,
            'host': process.env.DATABASE_HOST!,
            'port': Number(process.env.DATABASE_PORT!),
            'database': process.env.DATABASE_NAME!,
            'username': process.env.DATABASE_USERNAME!,
            'password': process.env.DATABASE_PASSWORD!,
        },
        'mongo': {
            'url': process.env.MONGO_URL!,
            'host': process.env.MONGO_HOST!,
            'port': Number(process.env.MONGO_PORT!),
            'database': process.env.MONGO_DATABASE!,
            'username': process.env.MONGO_USERNAME!,
            'password': process.env.MONGO_PASSWORD!,
        },
    },
    
    'redis': {

    }
};
