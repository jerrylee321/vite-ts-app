import { FormikErrors, FormikTouched } from "formik";

import useFormikErrorsWithModel from "../hooks/useFormikErrorsWithModel";

export function useFormikListItemState<
  TForm extends Record<string, unknown>,
  TItem
>(
  listKey: keyof TForm,
  rowIndex: number,
  values: TForm,
  errors: FormikErrors<TForm>,
  touched: FormikTouched<TForm>
): {
  itemValues: TItem;
  itemIsErrors: Partial<Record<keyof TItem, boolean>>;
  itemHelperTexts: Partial<Record<keyof TItem, string | string[]>>;
} {
  const itemErrors = Array.isArray(errors[listKey])
    ? (errors[listKey] as (FormikErrors<TItem> | string)[])[rowIndex]
    : undefined;
  const itemTouched = Array.isArray(touched[listKey])
    ? (touched[listKey] as (FormikTouched<TItem> | string)[])[rowIndex]
    : undefined;
  const { isErrors: itemIsErrors, helperTexts: itemHelperTexts } =
    useFormikErrorsWithModel({
      errors: typeof itemErrors === "object" ? itemErrors : {},
      touched: typeof itemTouched === "object" ? itemTouched : {},
    });
  const itemValues = (values[listKey] as TItem[])[rowIndex];

  return {
    itemValues,
    itemIsErrors,
    itemHelperTexts,
  };
}
