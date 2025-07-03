
import { setUser } from '@utils/socket.utils';


const socketMiddleware = async (socket: any, next: any) => {

    const userId = socket.handshake.query.userId;
    const userRole = socket.handshake.query.userRole;
    const key = socket.handshake.query.key;

    if (key !== 'socket_001') {
        const err = new Error("Invalid key");
        socket.disconnect(true);
        next(err);
    }

    if (!userId || !userRole) {
        const err = new Error("Invalid user id or user role");
        socket.disconnect(true);
        next(err);
    }

    setUser(userId, socket.id);
    socket.userId = userId;
    next();
}

export default socketMiddleware;