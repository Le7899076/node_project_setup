import jwt from 'jsonwebtoken';
import config from '@config/auth.config';

// Generate a JWT token
export const generateToken = (user: any): string => {
    const secret = config.jwt.secret;
     // Preferably use process.env.JWT_SECRET
    const payload = {
        id: user.id,
    };

    return jwt.sign(payload, secret, { expiresIn: '1h' });
};
