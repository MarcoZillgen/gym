const DAY_MS = 86_400_000;

export function formatDuration(startIso: string, endIso: string): string {
  const ms = Math.max(
    0,
    new Date(endIso).getTime() - new Date(startIso).getTime(),
  );
  const mins = Math.round(ms / 60_000);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}min` : `${m}min`;
}

const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

export function formatAgo(startIso: string, now: Date): string {
  // Round, not floor: DST days are 23h or 25h long
  const days = Math.max(
    0,
    Math.round((startOfDay(now) - startOfDay(new Date(startIso))) / DAY_MS),
  );
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}
