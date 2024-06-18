import { fallback } from "../types/Nullable";

export default function select<Option extends string, Value>(
  optionValueMap: { [key in Option]?: Value },
  value: unknown,
  otherwise: NonNullable<Value>
): Value {
  return fallback(optionValueMap[value as Option], otherwise);
}
