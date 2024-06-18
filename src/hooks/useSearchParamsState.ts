import { useCallback, useMemo } from "react";
import { parse, stringify } from "superjson";

import useSearchParamsSerializedState from "./useSearchParamsSerializedState";

const useSearchParamsState = <T>(
  key: string
): [T | null, (newValue: T) => void] => {
  const [serializedState, setSerializedState] =
    useSearchParamsSerializedState(key);

  const state = useMemo(() => {
    if (!serializedState) return null;

    return parse<T>(serializedState);
  }, [serializedState]);

  const setState = useCallback(
    (newValue: T) => {
      const stringified = stringify(newValue);
      setSerializedState(stringified);
    },
    [setSerializedState]
  );

  return [state, setState];
};

export default useSearchParamsState;
