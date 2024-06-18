import { useEffect, useState } from "react";

/**
 * The purpose of this hook is to return a promise with a resolve/reject
 * function so that the promise can be resolved outside of the promise callback
 * function.
 */
const usePromise = <T = void>(): [
  Promise<T> | undefined,
  ((value: T) => void) | undefined,
  ((err: unknown) => void) | undefined
] => {
  const [promise, setPromise] = useState<Promise<T> | undefined>(undefined);
  const [resolve, setResolve] = useState<((value: T) => void) | undefined>(
    undefined
  );
  const [reject, setReject] = useState<((value: unknown) => void) | undefined>(
    undefined
  );

  useEffect(() => {
    const p = new Promise<T>((resolveFn, rejectFn) => {
      setResolve(() => {
        return resolveFn;
      });
      setReject(() => {
        return rejectFn;
      });
    });
    setPromise(p);
  }, []);

  return [promise, resolve, reject];
};

export const promiseWithTimeout = async <T>(
  promise: Promise<T>,
  timeout: number
): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<never>((_resolveFn, rejectFn) => {
      setTimeout(rejectFn, timeout);
    }),
  ]);
};

export default usePromise;
