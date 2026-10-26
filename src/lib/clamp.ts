export default function clamp(min: number, n: number, max: number) {
  return Math.max(min, Math.min(n, max));
}
