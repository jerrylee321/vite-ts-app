import { NonEmptyList } from "../types/List";

/**
 * excludingFields will override the fields
 */
const areAllFieldsEmpty = <ValuesT extends object>(
  values: ValuesT,
  options?: {
    fields?: NonEmptyList<Extract<keyof ValuesT, string>>;
    excludingFields?: NonEmptyList<Extract<keyof ValuesT, string>>;
  }
): boolean => {
  const _fields = options?.fields ?? Object.keys(values);
  const _excludingFields = options?.excludingFields ?? ([] as string[]);

  return (
    Object.entries(values).filter(([key, value]) => {
      if (Array.isArray(value)) {
        return (
          !_excludingFields.includes(key) &&
          _fields.includes(key) &&
          value.some((item) => item != null && item !== "")
        );
      }

      return (
        !_excludingFields.includes(key) &&
        _fields.includes(key) &&
        value != null &&
        value !== ""
      );
    }).length === 0
  );
};

export default areAllFieldsEmpty;
