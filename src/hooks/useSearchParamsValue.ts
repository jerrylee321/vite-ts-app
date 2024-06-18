import { useCallback, useState } from "react";

import useSearchParamsState from "./useSearchParamsState";

interface UseUrlSearchParamsValueArgs<T> {
  /** key is used to identify search params */
  key: string;
  /** initValue is used in returned value when search params value is null */
  initValue: T;
  /** If isReadOnly is true, search params value returned would not be updated.
   * The default value is true
   */
  isReadOnly?: boolean;
}

export type UseSearchParamsValueType<T> = (
  args: UseUrlSearchParamsValueArgs<T>
) => [T, (newValue: T) => void];

const useSearchParamsValue = <T>(
  args: UseUrlSearchParamsValueArgs<T>
): [T, (newValue: T) => void] => {
  const { key, initValue, isReadOnly = true } = args;

  const [searchParamsState, setSearchParamsState] =
    useSearchParamsState<T>(key);

  // it is the source of truth in app for searchParams value
  const [value, _setValue] = useState<T>(searchParamsState ?? initValue);

  const setValue = useCallback(
    (newValue: T): void => {
      setSearchParamsState(newValue);
      if (!isReadOnly) {
        _setValue(newValue);
      }
    },
    [setSearchParamsState, isReadOnly]
  );

  return [value, setValue];
};

export default useSearchParamsValue;
