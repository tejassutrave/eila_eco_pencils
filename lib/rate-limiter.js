// Simple in-memory rate limiter using an IP-based Map.
// Note: In serverless environments, in-memory limits operate per-instance.
// For a multi-instance production backend, a Redis-based cache handler is recommended.

const tracker = new Map();

export function rateLimit(ip, limit = 10, windowMs = 60 * 1000) {
  const now = Date.now();
  if (!tracker.has(ip)) {
    tracker.set(ip, []);
  }

  let requests = tracker.get(ip);
  // Filter out requests older than the window
  requests = requests.filter(timestamp => now - timestamp < windowMs);

  if (requests.length >= limit) {
    return {
      success: false,
      error: 'Too many requests. Please try again later.',
      remaining: 0,
      reset: Math.max(0, windowMs - (now - requests[0]))
    };
  }

  requests.push(now);
  tracker.set(ip, requests);

  return {
    success: true,
    remaining: limit - requests.length,
    reset: windowMs
  };
}
