import { expect, test } from "bun:test";
import { formatAgo, formatDuration } from "./format";

test("formatDuration", () => {
  expect(formatDuration("2026-10-27T10:00:00Z", "2026-10-27T10:38:00Z")).toBe(
    "38min",
  );
  expect(formatDuration("2026-10-27T10:00:00Z", "2026-10-27T11:05:00Z")).toBe(
    "1h 5min",
  );
  expect(formatDuration("2026-10-27T10:00:00Z", "2026-10-28T11:00:00Z")).toBe(
    "25h 0min",
  );
});

test("formatAgo counts calendar days, not 24h blocks", () => {
  const now = new Date(2026, 9, 28, 8, 0);
  expect(formatAgo(new Date(2026, 9, 28, 0, 5).toISOString(), now)).toBe(
    "Today",
  );
  expect(formatAgo(new Date(2026, 9, 27, 23, 0).toISOString(), now)).toBe(
    "Yesterday",
  );
  expect(formatAgo(new Date(2026, 9, 24, 14, 0).toISOString(), now)).toBe(
    "4d ago",
  );
});
