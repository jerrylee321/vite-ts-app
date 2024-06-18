import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const useSearchParamsSerializedState = (
  key: string
): [string | null, (newValue: string) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const state = useMemo(() => {
    return searchParams.get(key);
  }, [key, searchParams]);

  const setState = useCallback(
    (newValue: string) => {
      setSearchParams(
        (_prevSearchParams) => {
          // workaround of stale state for _prevSearchParams
          // https://github.com/remix-run/react-router/issues/9757
          const newSearchParams = new URLSearchParams(window.location.search);
          newSearchParams.set(key, newValue);
          return newSearchParams;
        },
        { replace: true }
      );
    },
    [key, setSearchParams]
  );

  return [state, setState];
};

export default useSearchParamsSerializedState;
