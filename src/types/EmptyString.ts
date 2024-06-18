type fallbackEmptyStringValue = string | undefined | null;

export function fallbackEmptyString<T>(
  value: fallbackEmptyStringValue,
  fallbackValue: T
): string | T;
export function fallbackEmptyString(
  value: fallbackEmptyStringValue
): string | undefined;
export function fallbackEmptyString<T>(
  value: fallbackEmptyStringValue,
  fallbackValue: T | undefined = undefined
): string | T | undefined {
  return value && value.length > 0 ? value : fallbackValue;
}
