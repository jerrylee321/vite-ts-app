export const isNumber = (value: unknown): value is number => {
  return typeof value === "number" && isFinite(value);
};
