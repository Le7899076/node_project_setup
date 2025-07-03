
import { setUser } from '@utils/socket.utils';


const socketMiddleware = async (socket: any, next: any) => {

    const userId = socket.handshake.query.userId;
    const key = socket.handshake.query.key;

    if (key !== 'socket_001') {
        const err = new Error("Invalid key");
        next(err);
    }

    if (!userId) {
        const err = new Error("Invalid user id");
        next(err);
    }

    setUser(userId, socket.id);
    socket.userId = userId;
    next();
}

export default socketMiddleware;