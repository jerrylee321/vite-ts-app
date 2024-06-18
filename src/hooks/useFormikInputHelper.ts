import { useCallback } from "react";
import { FormikProps } from "formik";

import useFormikErrorsWithModel, {
  HelperTextsType,
} from "./useFormikErrorsWithModel";

type Model = { [key in string]: unknown };

interface BindInputValues<T extends Model, K extends keyof T> {
  onChange: FormikProps<T>["handleChange"];
  onBlur: FormikProps<T>["handleBlur"];
  id: string;
  name: string;
  value: T[K];
  error: boolean | undefined;
  helperText: string | string[] | undefined;
  "data-testid": string | undefined;
}

type BindSelectValues<T extends Model, K extends keyof T> = BindInputValues<
  T,
  K
>;

interface BindDatePickerValues<T extends Model> {
  type: "default" | "range";
  value?: Date | null;
  startDate?: Date | null;
  endDate?: Date | null;
  onChange: FormikProps<T>["setFieldValue"];
  onBlur: FormikProps<T>["handleBlur"];
  id: string;
  name: string;
  error: boolean | undefined;
  helperText: string | string[] | undefined;
  "data-testid": string | undefined;
}

interface UseFormikInputHelperValues<T extends Model> extends FormikProps<T> {
  bindInput: <K extends keyof T>(field: K) => BindInputValues<T, K>;
  bindSelect: <K extends keyof T>(field: K) => BindSelectValues<T, K>;
  bindDefaultDatePicker: (field: keyof T) => BindDatePickerValues<T>;
  bindRangeDatePicker: (field: keyof T) => BindDatePickerValues<T>;
}

interface UseFormikInputHelperProps<T extends Model> extends FormikProps<T> {
  defaultHelperTexts?: HelperTextsType<T>;
}

const useFormikInputHelper = <T extends Model>({
  defaultHelperTexts,
  ...props
}: UseFormikInputHelperProps<T>): UseFormikInputHelperValues<T> => {
  const { isErrors, helperTexts } = useFormikErrorsWithModel({
    errors: props.errors,
    touched: props.touched,
    defaultHelperTexts,
  });

  const bindInput = useCallback(
    <K extends keyof T>(field: K): BindInputValues<T, K> => {
      return {
        onChange: props.handleChange,
        onBlur: props.handleBlur,
        id: String(field),
        "data-testid": String(field),
        name: String(field),
        value: props.values[field],
        error: isErrors[field],
        helperText: helperTexts[field],
      };
    },
    [props, isErrors, helperTexts]
  );

  const bindDefaultDatePicker = useCallback(
    (field: keyof T) => {
      const value = props.values[field] as Date | null;
      return {
        type: "default" as const,
        value: value,
        onChange: props.setFieldValue,
        onBlur: props.handleBlur,
        id: String(field),
        "data-testid": String(field),
        name: String(field),
        error: isErrors[field],
        helperText: helperTexts[field],
      };
    },
    [props, isErrors, helperTexts]
  );

  const bindRangeDatePicker = useCallback(
    (field: keyof T) => {
      const value = props.values[field] as (Date | null)[];
      return {
        type: "range" as const,
        startDate: value[0],
        endDate: value[1],
        onChange: props.setFieldValue,
        onBlur: props.handleBlur,
        id: String(field),
        "data-testid": String(field),
        name: String(field),
        error: isErrors[field],
        helperText: helperTexts[field],
      };
    },
    [props, isErrors, helperTexts]
  );

  return {
    ...props,
    bindInput,
    bindSelect: bindInput,
    bindDefaultDatePicker,
    bindRangeDatePicker,
  };
};

export default useFormikInputHelper;
