import { useMemo } from "react";
import { FormikErrors, FormikTouched } from "formik";

import useLocalizedErrors from "./useLocalizedErrors";

export type HelperTextsType<FormModelT> = {
  [K in keyof FormModelT]?: string;
};

interface PropsType<FormModelT> {
  errors: FormikErrors<FormModelT>;
  touched: FormikTouched<FormModelT>;
  /**
   * This is a formik prop to indicate whether the form values are different from
   * initial values. If it is not dirty, we will not show the error.
   * Default behaviour (i.e. if unspecified) is to assume the form values has changed
   * (i.e. dirty === true).
   */
  dirty?: boolean;
  defaultHelperTexts?: HelperTextsType<FormModelT>;
}

export interface FormikErrorsWithModelReturnType<FormModelT> {
  isErrors: {
    [P in keyof FormModelT]?: boolean;
  };
  helperTexts: {
    [P in keyof FormModelT]?: string | string[];
  };
}

const useFormikErrorsWithModel = <FormModelT>(
  props: PropsType<FormModelT>
): FormikErrorsWithModelReturnType<FormModelT> => {
  const { errors, touched, dirty = true, defaultHelperTexts } = props;
  const localizedErrors = useLocalizedErrors<FormModelT>(errors);

  const isErrors = useMemo((): {
    [P in keyof FormModelT]?: boolean;
  } => {
    return Object.keys(errors).reduce((prev, key) => {
      const fieldTouched = touched[key as keyof FormModelT];
      const fieldError = errors[key as keyof FormModelT];

      return {
        ...prev,
        [key]: dirty && fieldTouched ? Boolean(fieldError) : false,
      };
    }, {});
  }, [errors, touched, dirty]);

  const helperTexts = useMemo((): {
    [P in keyof FormModelT]?: string | string[];
  } => {
    const errorTexts = Object.keys(localizedErrors).reduce((prev, key) => {
      const fieldTouched = touched[key as keyof FormModelT];
      const fieldLocalizedError = localizedErrors[key as keyof FormModelT];

      if (fieldTouched) {
        return {
          ...prev,
          [key]: fieldLocalizedError,
        };
      }
      return prev;
    }, {});

    return {
      ...defaultHelperTexts,
      ...errorTexts,
    };
  }, [touched, localizedErrors, defaultHelperTexts]);

  return { isErrors, helperTexts };
};

export default useFormikErrorsWithModel;
