export const toLowerCase = <T extends string>(value: T): Lowercase<T> => {
  return value.toLowerCase() as Lowercase<T>;
};

export const toUpperCase = <T extends string>(value: T): Uppercase<T> => {
  return value.toUpperCase() as Uppercase<T>;
};
