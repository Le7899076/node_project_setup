
import { errorSocket } from "@utils/error.socket"

export default class chatSocketController {
    public static async handleMessage(data: any, socket: any, io: any) {
        try {
            socket.broadcast.emit('message', data);
        } catch (error: any) {
            console.log("Error to handle message event", error.message);
            errorSocket(io, socket, error);
        }
    }
}