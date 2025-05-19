export function round(value?: number): number {
  if (value == null) {
    return 0;
  }
  return Number(value.toFixed(2));
}
