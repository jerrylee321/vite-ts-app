import { FormikErrors } from "formik";

import { isNonNullable } from "../types/Nullable";

export function getFieldArrayItemError<T>(
  errors: string | string[] | FormikErrors<T>[] | undefined,
  index: number,
  field: keyof T
): string | string[] | FormikErrors<T[keyof T]> | null {
  if (errors == null) {
    return null;
  }
  if (typeof errors === "string") {
    return errors;
  }
  const item = errors[index];
  // item is possibly null
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (item == null) {
    return null;
  }
  if (typeof item === "string") {
    return item;
  }
  return item[field] ?? null;
}

export function hasFieldArrayError<T>(
  errors: string | string[] | FormikErrors<T>[] | undefined,
  index: number
): boolean {
  if (errors == null) {
    return false;
  }
  if (typeof errors === "string") {
    return true;
  }
  const item = errors[index];
  // item is possibly null
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (item == null) {
    return false;
  }
  if (typeof item === "string") {
    return true;
  }
  return Object.values(item).some(isNonNullable);
}
