type AttemptWindow = {
  count: number;
  resetAt: number;
};

const attempts = new Map<string, AttemptWindow>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function pruneExpiredEntries(now: number) {
  for (const [key, attempt] of attempts.entries()) {
    if (attempt.resetAt <= now) {
      attempts.delete(key);
    }
  }
}

export function registerLoginAttempt(key: string) {
  const now = Date.now();
  pruneExpiredEntries(now);

  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 };
  }

  if (current.count >= MAX_ATTEMPTS) {
    return { allowed: false, remaining: 0 };
  }

  current.count += 1;
  attempts.set(key, current);
  return { allowed: true, remaining: MAX_ATTEMPTS - current.count };
}

export function clearLoginAttempts(key: string) {
  attempts.delete(key);
}
