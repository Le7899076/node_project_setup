export const chatHandler = (event: string, data: any[], socket: any, io: any) => {
    if (event === 'message') {
        socket.broadcast.emit('message', data);
    }
};
