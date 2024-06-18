import { isAxiosError } from "axios";

import {
  APIErrorCode,
  hasErrorCode,
  hasErrorCodes,
  isAPIError,
} from "../apis/models/APIError";

export const isUserSessionEndingError = (error: unknown): boolean => {
  if (isAxiosError(error)) {
    return error.response?.status === 401;
  }

  if (
    hasErrorCodes(error, [
      APIErrorCode.DUPLICATE_SESSION,
      APIErrorCode.BAD_CREDENTIAL,
      APIErrorCode.CAU0007,
    ])
  ) {
    return true;
  }

  return (
    isAPIError(error) &&
    error.info?.httpStatus === 401 &&
    !hasErrorCode(error, APIErrorCode.RESOURCE_ACCESS_DENIED)
  );
};

export const isRetryableError = (error: unknown): boolean => {
  if (isAxiosError(error)) {
    return error.response?.status === 401;
  }

  if (
    hasErrorCode(error, APIErrorCode.DUPLICATE_SESSION) ||
    hasErrorCode(error, APIErrorCode.RESOURCE_ACCESS_DENIED)
  ) {
    return false;
  }

  return isAPIError(error) && error.info?.httpStatus === 401;
};
