import { QueryState, UseQueryResult } from "@tanstack/react-query";

import { APIError } from "../../apis/models/APIError";

export const getLoadingQueryState = <Response>(): QueryState<
  Response,
  APIError
> => {
  return {
    data: undefined,
    dataUpdateCount: 0,
    dataUpdatedAt: Date.now(),
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: false,
    status: "loading",
    fetchStatus: "fetching",
  };
};

export const getSuccessQueryState = <Response>(
  data: Response
): QueryState<Response, APIError> => {
  return {
    data,
    dataUpdateCount: 0,
    dataUpdatedAt: Date.now(),
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: false,
    status: "success",
    fetchStatus: "idle",
  };
};

export const getErrorQueryState = <Error>(
  error: Error
): QueryState<Response, Error> => {
  return {
    data: undefined,
    dataUpdateCount: 0,
    dataUpdatedAt: Date.now(),
    error,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: false,
    status: "error",
    fetchStatus: "idle",
  };
};

export const getLoadingQueryResult = <Response>(): UseQueryResult<
  Response,
  APIError
> => {
  return {
    data: undefined,
    error: null,
    status: "loading",
    isError: false,
    isLoading: true,
    isSuccess: false,
  } as UseQueryResult<Response, APIError>;
};

export const getSuccessQueryResult = <Response>(
  data: Response
): UseQueryResult<Response, APIError> => {
  return {
    data,
    error: null,
    status: "success",
    isError: false,
    isLoading: false,
    isSuccess: true,
  } as UseQueryResult<Response, APIError>;
};

export const getErrorQueryResult = <Response>(
  error: unknown
): UseQueryResult<Response, APIError> => {
  return {
    data: undefined,
    error,
    status: "error",
    isError: true,
    isLoading: false,
    isSuccess: false,
  } as UseQueryResult<Response, APIError>;
};
