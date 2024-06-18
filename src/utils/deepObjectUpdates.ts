import { PropertyUpdatesModel } from "../models/PropertyUpdates";

// For array attributes need to be same size and same order in order to check correctly
const deepObjectUpdates = <T extends Record<string, any>>(
  old: T,
  updated: T
): Record<string, any> | undefined => {
  const allKeys: (keyof T)[] = [
    ...new Set([...Object.keys(old), ...Object.keys(updated)]),
  ];
  const diff = allKeys.reduce<Partial<Record<keyof T, any>>>((result, key) => {
    const oldValue = old[key] ?? null;
    const newValue = updated[key] ?? null;

    // The following cover the cases where both values are equal, including
    // null, primitive types and objects.
    if (oldValue === newValue) {
      return result;
    }

    // The following cover the cases where both values are objects, or either
    // of them is a null. (`typeof null === 'object'`)
    if (typeof oldValue === "object" && typeof newValue === "object") {
      result[key] = deepObjectUpdates(oldValue ?? {}, newValue ?? {});
      return result;
    }

    // Only one of the two values are an object, or both values are primitive.
    // Either value can be null.
    result[key] = {
      propertyName: key,
      originalValue: oldValue ?? null,
      newValue: newValue ?? null,
    };
    return result;
  }, {});

  return Object.keys(diff).length === 0 ? undefined : diff;
};

export const flattenUpdatesByKey = (
  updates: Record<string, any> | undefined,
  parentKey: string = ""
): Array<PropertyUpdatesModel> => {
  if (updates == null) {
    return [];
  }

  let result: Array<PropertyUpdatesModel> = [];
  const keys = Object.keys(updates);

  if (
    keys.includes("propertyName") &&
    keys.includes("originalValue") &&
    keys.includes("newValue")
  ) {
    result.push({
      propertyName: parentKey,
      originalValue: updates.originalValue,
      newValue: updates.newValue,
    });
  } else {
    for (let i = 0; i < keys.length; i += 1) {
      const fieldKey = keys[i];
      const value = updates[fieldKey];
      result = [
        ...result,
        ...flattenUpdatesByKey(
          value,
          [parentKey, fieldKey].filter((k) => k !== "").join(".")
        ),
      ];
    }
  }

  return result;
};

export default deepObjectUpdates;
