export function toStringParams(
  obj: Record<string, unknown>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, String(v)]),
  );
}
