export const users: any = {};
export const admins:any={};

export const setUser = (userId: string, socketId: string) => {
    users[+userId] = socketId;
    return userId;
}

export const getUser = (userId: string) => {
    return users[+userId];
}

export const fetchAllUsers = ()=>{
    return users
}

export const getUTCDateTime = () => {
    return new Date().toISOString().slice(0, 19).replace('T', ' ')
}