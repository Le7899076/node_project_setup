
import { errorSocket } from "@utils/error.socket"
import logger from "@utils/winston.logger.utils";
export default class chatSocketController {
    public static async handleMessage(data: any, socket: any, io: any) {
        try {
            logger.info("socket user id: " + socket.userId + " & socket id: " + socket.id);
            socket.broadcast.emit('message', data);
        } catch (error: any) {
            logger.error("Error to handle message event", error.message);
            errorSocket(io, socket, error);
        }
    }
}