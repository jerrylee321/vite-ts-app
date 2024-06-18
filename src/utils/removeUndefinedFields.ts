import isKeyValueObject from "./isKeyValueObject";

function removeUndefinedFields<T extends Record<string, unknown>>(
  obj: T
): Partial<T> {
  return Object.keys(obj).reduce((prev, key) => {
    const value = obj[key];
    if (value === undefined) {
      return prev;
    }
    return {
      ...prev,
      [key]: isKeyValueObject(value) ? removeUndefinedFields(value) : value,
    };
  }, {});
}

export default removeUndefinedFields;
