export type NonEmptyList<T> = [T, ...T[]];

export function isNonEmptyList<T>(list: T[]): list is NonEmptyList<T> {
  return list.length > 0;
}
