export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value != null;
}

export function fallback<T>(
  value: T,
  fallbackValue: NonNullable<T>
): NonNullable<T> {
  if (isNonNullable(value)) {
    return value;
  }
  return fallbackValue;
}
