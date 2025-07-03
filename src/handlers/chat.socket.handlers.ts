import chatSocketController from "@controllers/user/chat.socket.controller";

export const chatHandler = (event: string, data: any[], socket: any, io: any) => {

    console.log(`Event: ${event}`, data);

    switch (event) {
        case 'message':
            chatSocketController.handleMessage(data, socket, io);
            break;
        default:
            console.warn(`Unhandled event: ${event}`);
    }
};

