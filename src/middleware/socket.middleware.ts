import { setUser } from '@utils/socket.utils';
import config from '@config/auth.config';
import app_config from '@config/app.config';
import { JwtPayload, verify } from 'jsonwebtoken';
import User from '@models/user.model';

const socketMiddleware = async (socket: any, next: (err?: Error) => void) => {
    const { key } = socket.handshake.query;
    if (key !== app_config.socket_key) {
        return next(new Error("Invalid key."));
    }

    const token = socket.handshake.auth?.token || socket.handshake.headers['x-token'] || socket.handshake.headers['authorization'].split(' ')[1];

    if (!token) {
        return next(new Error("Authorization token required"));
    }

    try {
        const decoded = verify(token, config.jwt.secret) as JwtPayload;
        const user = await User.findById(decoded.id);
        if (!user) {
            return next(new Error("User not found"));
        }



        socket.data.user = user;

        await setUser(user.id, socket.id); // optional, only if you're mapping userId to socketId
        next();
    } catch (err: any) {
        next(err.message);
    }
};

export default socketMiddleware;
