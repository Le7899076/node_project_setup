
import Controller from "@controllers/controller";
import { errorSocket } from "@utils/error.socket";
import logger from "@utils/winston.logger.utils";
export default class chatSocketController extends Controller {
    public static async handleMessage(data: any, socket: any, io: any) {
        try {
            console.log(`user room : ${data.receiverId}`);
            socket.to(`USER_${data.receiverId}`).emit('message', data);
            // logger.info("socket user id: " + socket.userId + " & socket id: " + socket.id);
            // console.log(socket);
            // socket.emit('message', data); // send message to sender only
            // socket.broadcast.emit('message', data); // send message to all users except sender
            // io.emit('message', data); // send message to all users including sender
            // io.to(socket.id).emit('message', data); // send message to specific user
            // socket.broadcast.to('users').emit('message', data); // to room except sender
            // socket.emit('message', data); // send message to sender only
            // socket.broadcast.emit('message', data); // send message to all users except sender
            // io.to('users').emit('message', data); //send to a room (all in room, including sender)
            // io.to(['room1', 'room2']).emit('message', data);// sends to multiple rooms
            // io.except(socket.id).emit('message', data); //send to all sockets except some (using except)
            // io.of('/chat').except(socket.id).emit('message', data); // Using namespaces (if you use io.of('/chat'))

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