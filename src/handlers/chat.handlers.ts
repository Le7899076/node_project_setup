import chatController from "@controllers/user/chat.controller";

export const chatHandler = (event: string, data: any[], socket: any, io: any) => {
    switch (event) {
        case 'message':
            chatController.handleMessage(data, socket, io);
            break;
        default:
            console.warn(`Unhandled event: ${event}`);
    }
};

