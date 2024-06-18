import { UseQueryResult } from "@tanstack/react-query";

interface CombinedQueryResultsNotSuccess<
  TData extends object,
  TError = unknown
> {
  isLoading: boolean;
  isSuccess: false;
  errors: { [k in keyof TData]: TError | undefined };
  data: { [k in keyof TData]: TData[k] | undefined };
}

interface CombinedQueryResultsSuccess<TData extends object> {
  isLoading: false;
  isSuccess: true;
  errors: null;
  data: { [k in keyof TData]: TData[k] };
}

type CombinedQueryResults<TData extends object, TError = unknown> =
  | CombinedQueryResultsNotSuccess<TData, TError>
  | CombinedQueryResultsSuccess<TData>;

export const combineQueryResults = <
  TData extends object,
  TError = unknown
>(queries: {
  [k in keyof TData]: UseQueryResult<TData[k]>;
}): CombinedQueryResults<TData, TError> => {
  const keys = Object.keys(queries) as (keyof TData)[];

  const isLoading = keys.some((k) => queries[k].isLoading);
  const isSuccess = keys.every((k) => queries[k].isSuccess);
  const errors = keys.reduce(
    (result, k) => ({
      ...result,
      [k]: queries[k].error,
    }),
    {}
  ) as { [k in keyof TData]: TError | undefined };
  const data = keys.reduce(
    (result, k) => ({
      ...result,
      [k]: queries[k].data,
    }),
    {}
  ) as { [k in keyof TData]: TData[k] | undefined };

  if (isSuccess) {
    return {
      isLoading: false,
      isSuccess,
      errors: null,
      data: data as { [k in keyof TData]: TData[k] },
    };
  }

  return {
    isLoading,
    isSuccess,
    errors,
    data,
  };
};
