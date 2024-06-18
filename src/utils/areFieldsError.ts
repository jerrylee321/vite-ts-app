import { NonEmptyList } from "../types/List";

function areFieldsError<FormModelT>(
  isErrors: {
    [P in keyof FormModelT]?: boolean;
  },
  fields?: NonEmptyList<Extract<keyof FormModelT, string>>
): boolean {
  const _fields = fields ?? Object.keys(isErrors);
  return (
    Object.entries(isErrors).filter(
      ([key, value]) => _fields.includes(key) && value === true
    ).length !== 0
  );
}

export default areFieldsError;
