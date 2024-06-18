function isKeyValueObject(obj: unknown): obj is Record<string, unknown> {
  return typeof obj === "object" && !Array.isArray(obj) && obj != null;
}

export default isKeyValueObject;
