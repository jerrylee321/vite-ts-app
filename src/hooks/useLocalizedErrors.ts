import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FormikErrors } from "formik";

import { MessageKey } from "../i18n/LocaleModel";

const localizedErrors = <T>(
  errors: FormikErrors<T>,
  t: (key: MessageKey) => string
): FormikErrors<T> => {
  return Object.keys(errors).reduce((prev, key) => {
    const error = errors[key as keyof T];

    if (error == null) {
      return { ...prev, [key]: undefined };
    }

    if (typeof error === "string") {
      return { ...prev, [key]: t(error as MessageKey) };
    }

    if (Array.isArray(error)) {
      return {
        ...prev,
        [key]: error.map((value) => {
          // item can be null
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if (value == null) {
            return null;
          }
          if (typeof value === "string") {
            return t(value as MessageKey);
          }
          return localizedErrors(value, t);
        }),
      };
    }

    return { ...prev, [key]: localizedErrors(error, t) };
  }, {});
};

const useLocalizedErrors = <T>(errors: FormikErrors<T>): FormikErrors<T> => {
  const { t } = useTranslation();

  return useMemo(() => localizedErrors(errors, t), [errors, t]);
};
export default useLocalizedErrors;
