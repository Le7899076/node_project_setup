import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const useRedis = process.env.SOCKET_STORE_DRIVER === 'redis';

const memoryStore = new Map<number, string>();
let redisClient: ReturnType<typeof createClient>;

if (useRedis) {
  redisClient = createClient({ url: process.env.REDIS_URL });
  redisClient.connect().catch(console.error);
}

export const setUser = async (userId: string | number, socketId: string) => {
  const key = `socket:${userId}`;
  if (useRedis) {
    await redisClient.set(key, socketId);
  } else {
    memoryStore.set(Number(userId), socketId);
  }
};

export const getUser = async (userId: string | number): Promise<string | undefined> => {
  const key = `socket:${userId}`;
  if (useRedis) {
    return await redisClient.get(key) || undefined;
  } else {
    return memoryStore.get(Number(userId));
  }
};

export const removeUser = async (userId: string | number) => {
  const key = `socket:${userId}`;
  if (useRedis) {
    await redisClient.del(key);
  } else {
    memoryStore.delete(Number(userId));
  }
};

export const fetchAllUsers = async (): Promise<Record<number, string>> => {
  if (useRedis) {
    const keys = await redisClient.keys('socket:*');
    const result: Record<number, string> = {};
    for (const key of keys) {
      const userId = key.replace('socket:', '');
      const socketId = await redisClient.get(key);
      if (socketId) result[+userId] = socketId;
    }
    return result;
  } else {
    return Object.fromEntries(memoryStore.entries());
  }
};

export const getUTCDateTime = (): string => {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
};
