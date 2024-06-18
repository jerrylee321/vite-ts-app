import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { AxiosError, isAxiosError } from "axios";
import { ZodError } from "zod";

import {
  APIError,
  APIErrorCode,
  hasErrorCode,
  isAPIError,
  isValidationError,
  ValidationErrorPayload,
} from "../apis/models/APIError";
import Config from "../Config";
import { MessageKey } from "../i18n/LocaleModel";
import {
  CustomError,
  isAuthError,
  isErrorWithAPIRequestContext,
  LocalizableError,
} from "../models/errors";
import { isNonNullable } from "../types/Nullable";

interface ErrorContentFunctionOptions {
  hideErrorCode?: boolean;
}

export interface ErrorContent {
  title: string;
  message?: string;
  itemized?: string[];
  traceId?: string;
}

type TFunc = (messageKey: MessageKey, args?: Record<string, unknown>) => string;

const generateLocalizableErrorContent = (
  t: TFunc,
  error: LocalizableError
): ErrorContent => {
  const options = error.options ?? {};
  const maybeMessageArgs = options.messageArgs;
  const maybeTitleMessageKey = options.titleMessageKey;
  const maybeTitleMessageArgs = options.titleMessageArgs;
  return {
    title: maybeTitleMessageKey
      ? t(maybeTitleMessageKey, maybeTitleMessageArgs)
      : t("ErrorAlert.customError.title"),
    message: t(error.messageMessageKey, maybeMessageArgs),
  };
};

const generateValidationErrorContent = (
  _t: TFunc,
  error: APIError<ValidationErrorPayload>
): ErrorContent => {
  return {
    title: error.data.errorCode,
    message: `${error.data.errorMessage.en}`,
    itemized: error.payload?.map((err) => err.message.en).filter(isNonNullable),
    traceId: error.data.traceId,
  };
};

export const generateUnauthorizedErrorContent = (t: TFunc): ErrorContent => {
  return {
    title: t("ErrorAlert.unauthorized.title"),
    message: t("ErrorAlert.unauthorized.message"),
  };
};
export const generateAPIErrorContent = (
  t: TFunc,
  error: APIError,
  showOptions: ErrorContentFunctionOptions
): ErrorContent => {
  const { hideErrorCode = false } = showOptions;

  const { data, info } = error;
  if (hasErrorCode(error, APIErrorCode.DUPLICATE_SESSION)) {
    return { title: t("ErrorAlert.duplicateSessionError.title") };
  }
  if (
    info?.httpStatus === 401 &&
    (hasErrorCode(error, APIErrorCode.BAD_CREDENTIAL) ||
      hasErrorCode(error, ""))
  ) {
    return generateUnauthorizedErrorContent(t);
  }
  if (isValidationError(error)) {
    return generateValidationErrorContent(t, error);
  }

  if (hideErrorCode) {
    return { title: `${data.errorMessage.en}` };
  }
  return {
    title: data.errorCode,
    message: `${data.errorMessage.en}`,
    traceId: data.traceId,
  };
};

export const generateAxiosErrorContent = (
  t: TFunc,
  error: AxiosError
): ErrorContent => {
  if (error.response?.status === 401) {
    return generateUnauthorizedErrorContent(t);
  }
  let extraMessage = "";
  if (
    isErrorWithAPIRequestContext(error) &&
    error.apiRequestContext.baseURL != null
  ) {
    switch (error.apiRequestContext.baseURL) {
      case null: {
        break;
      }
      case Config.uamApiBaseUrl: {
        extraMessage = "\nAPI: UAM";
        break;
      }
      case Config.fileUploadApiBaseUrl: {
        extraMessage = "\nAPI: File Upload";
        break;
      }
      case Config.commonOptionsApiBaseUrl: {
        extraMessage = "\nAPI: Common Options";
        break;
      }
      default: {
        extraMessage = `\nAPI: ${error.apiRequestContext.baseURL}`;
        break;
      }
    }
  }
  return {
    title: error.response?.statusText ?? t("ErrorAlert.axiosError.title"),
    message: error.message + extraMessage,
  };
};

export type ErrorContentFunction = (
  error: unknown,
  options?: ErrorContentFunctionOptions
) => ErrorContent;

const useGenerateErrorContent: () => ErrorContentFunction = () => {
  const { t } = useTranslation();

  return useCallback(
    (error, showOptions = {}) => {
      if (isAPIError(error)) {
        return generateAPIErrorContent(t, error, showOptions);
      }
      if (error instanceof ZodError) {
        return {
          title: t("ErrorAlert.schemaError.title"),
          message: t("ErrorAlert.schemaError.message"),
        };
      }
      if (isAxiosError(error)) {
        return generateAxiosErrorContent(t, error);
      }
      if (isAuthError(error)) {
        return {
          title: t("ErrorAlert.authError.title"),
          message: t("ErrorAlert.authError.message"),
        };
      }
      if (error instanceof CustomError) {
        return {
          title: error.options?.title ?? t("ErrorAlert.customError.title"),
          message: error.message,
        };
      }
      if (error instanceof LocalizableError) {
        return generateLocalizableErrorContent(t, error);
      }
      if (typeof error === "string") {
        return { title: t("ErrorAlert.customError.title"), message: error };
      }
      return {
        title: t("ErrorAlert.unexpectedError.title"),
        message: t("ErrorAlert.unexpectedError.message"),
      };
    },
    [t]
  );
};

export default useGenerateErrorContent;
