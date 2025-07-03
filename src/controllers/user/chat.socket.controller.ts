
import { errorSocket } from "@utils/error.socket";
import logger from "@utils/winston.logger.utils";
export default class chatSocketController {
    public static async handleMessage(data: any, socket: any, io: any) {
        try {
            logger.info("socket user id: " + socket.userId + " & socket id: " + socket.id);
            // socket.emit('message', data); // send message to sender only
            // socket.broadcast.emit('message', data); // send message to all users except sender

            // io.emit('message', data); // send message to all users including sender
            // io.to(socket.id).emit('message', data); // send message to specific user
            socket.broadcast.to('users').emit('message', data); // to room except sender

        } catch (error: any) {
            logger.error("Error to handle message event", error.message);
            errorSocket(io, socket, error);
        }
    }
    public static async handleJoinRoom(data: any, socket: any, io: any) {
        try {
            socket.join(data.room);

            socket.emit('ACK_JOIN_ROOM', {
                status: true,
                message: `${socket.userId} joined room ${data.room} successfully`,
                data: {
                    is_in_room: socket.rooms.has(data.room)
                }
            });

        } catch (error: any) {
            logger.error("Error to handle join room event", error.message);
            errorSocket(io, socket, error);
        }
    }
}