// Usage of NestedKeyOf
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type NestedKeyOf<T> = unknown;

export const deepAssignValueWithPaths = <T, U>(
  object: T | U | null,
  paths: NestedKeyOf<T>[],
  value: any
): T | U | null => {
  const [currentKey, ...restPathComponents] = paths;

  if (object == null) {
    return null;
  }

  if (paths.length === 1) {
    if (typeof currentKey === "string" && currentKey.length > 0) {
      return {
        ...object,
        [currentKey]: value,
      };
    }

    return object;
  }
  const deeperObject: U = (object as T)[currentKey as keyof T] as U;
  if (deeperObject == null) {
    return object;
  }

  if (Array.isArray(deeperObject)) {
    const [arrayIndex, ...noIndexPathComponents] = restPathComponents;
    const targetIndex = parseInt(arrayIndex as string, 10);
    return {
      ...object,
      [currentKey as keyof T]: deeperObject.map((child, index) => {
        if (index === targetIndex) {
          return deepAssignValueWithPaths<T, U>(
            deeperObject[targetIndex],
            noIndexPathComponents,
            value
          );
        }

        return child;
      }),
    };
  }

  return {
    ...object,
    [currentKey as keyof T]: {
      ...deepAssignValueWithPaths<T, U>(
        deeperObject,
        restPathComponents,
        value
      ),
    },
  };
};

const deepAssignValue = <T>(object: T | null, path: string, value: any): T => {
  const pathComponents = path.split(".") as NestedKeyOf<T>[];
  return deepAssignValueWithPaths(object, pathComponents, value)!;
};

export default deepAssignValue;
