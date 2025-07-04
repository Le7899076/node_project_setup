import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const useRedis = process.env.SOCKET_STORE_DRIVER === 'redis';

const memoryStore = new Map<string, string>();
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
    memoryStore.set(String(userId), socketId);
  }
};

export const getUser = async (userId: string | number): Promise<string | undefined> => {
  const key = `socket:${userId}`;
  if (useRedis) {
    return await redisClient.get(key) || undefined;
  } else {
    return memoryStore.get(String(userId));
  }
};

export const removeUser = async (userId: string | number) => {
  const key = `socket:${userId}`;
  if (useRedis) {
    await redisClient.del(key);
  } else {
    memoryStore.delete(String(userId));
  }
};

export const fetchAllUsers = async (): Promise<Record<string, string>> => {
  if (useRedis) {
    const keys = await redisClient.keys('socket:*');
    const result: Record<string, string> = {};
    for (const key of keys) {
      const userId = key.replace('socket:', '');
      const socketId = await redisClient.get(key);
      if (socketId) result[userId] = socketId;
    }
    return result;
  } else {
    return Object.fromEntries(memoryStore.entries());
  }
};
