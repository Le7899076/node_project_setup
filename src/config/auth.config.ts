import dotenv from 'dotenv';

dotenv.config();

export default {
    'jwt' : {
        'secret' : process.env.JWT_SECRET!,
    }
};
