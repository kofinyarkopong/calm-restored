import "server-only";

/**
 * Simple sliding-window rate limiter held in memory.
 * On Vercel each server instance keeps its own window, which is sufficient
 * for a low-traffic enquiry form. For stricter, shared limits, swap this for
 * a store such as Upstash Redis.
 */
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

export function rateLimit(key: string): { allowed: boolean } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return { allowed: false };
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return { allowed: true };
}
