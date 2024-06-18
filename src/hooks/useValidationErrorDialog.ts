import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FormikErrors } from "formik";

import { MessageKey } from "../i18n/LocaleModel";
import { CustomError } from "../models/errors";
import { useErrorAlert } from "../providers/ErrorAlertProvider";
import { isNonNullable } from "../types/Nullable";

type FormikError = string | string[] | FormikErrors<unknown> | undefined;

export function getErrorMessageKeysFromValidationError(
  validationError: FormikError
): MessageKey[] {
  if (typeof validationError === "string") {
    return [validationError as MessageKey];
  }
  if (Array.isArray(validationError)) {
    return validationError
      .map((e) => (typeof e === "string" ? (e as MessageKey) : null))
      .filter(isNonNullable);
  }
  return [];
}

export function useValidationErrorDialog(): {
  showValidationErrorDialog: (errors: Array<FormikError>) => void;
} {
  const { show: showError } = useErrorAlert();
  const { t } = useTranslation();

  const showValidationErrorDialog = useCallback(
    (errors: FormikError[]) => {
      for (const validationError of errors) {
        if (validationError != null) {
          const errorMsg = getErrorMessageKeysFromValidationError(
            validationError
          )
            .map((k) => t(k))
            .join("\n");
          if (errorMsg !== "") {
            showError(
              new CustomError(errorMsg, {
                title: t("ValidationErrorDialog.title"),
              })
            );
          }
        }
      }
    },
    [showError, t]
  );

  return { showValidationErrorDialog };
}
