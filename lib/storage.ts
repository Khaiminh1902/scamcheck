import { kv } from "@vercel/kv";
import { SharePayload } from "@/types/detective";

const globalForCache = global as unknown as {
  localCache: Map<string, SharePayload & { expiresAt: number }>;
};

const localCache = globalForCache.localCache || new Map();
if (process.env.NODE_ENV !== "production") {
  globalForCache.localCache = localCache;
}

export const storage = {
  async set<T>(key: string, value: T, options: { ex: number }) {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      return await kv.set(key, value, options);
    }

    const cacheValue = value as SharePayload;
    localCache.set(key, {
      ...cacheValue,
      expiresAt: Date.now() + options.ex * 1000,
    });
    return "OK";
  },

  async get<T>(key: string): Promise<T | null> {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      return await kv.get<T>(key);
    }

    const item = localCache.get(key);
    if (item && item.expiresAt > Date.now()) {
      return { message: item.message, result: item.result } as T;
    }

    localCache.delete(key);
    return null;
  },
};
