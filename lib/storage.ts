import { kv } from "@vercel/kv";

// In-memory cache fallback cho local development nếu chưa cấu hình Vercel KV
const globalForCache = global as unknown as {
  localCache: Map<string, { message: string; result: any; expiresAt: number }>;
};

const localCache = globalForCache.localCache || new Map();
if (process.env.NODE_ENV !== "production") {
  globalForCache.localCache = localCache;
}

export const storage = {
  async set(key: string, value: any, options: { ex: number }) {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      return await kv.set(key, value, options);
    } else {
      console.warn("⚠️ [Dev] Sử dụng in-memory cache do chưa cấu hình Vercel KV.");
      localCache.set(key, { ...value, expiresAt: Date.now() + options.ex * 1000 });
      return "OK";
    }
  },
  
  async get<T>(key: string): Promise<T | null> {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      return await kv.get<T>(key);
    } else {
      const item = localCache.get(key);
      if (item && item.expiresAt > Date.now()) {
        return { message: item.message, result: item.result } as unknown as T;
      }
      localCache.delete(key);
      return null;
    }
  }
};
