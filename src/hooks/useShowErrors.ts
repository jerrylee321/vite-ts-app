import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  ErrorAlertShowOptions,
  useErrorAlert,
} from "../providers/ErrorAlertProvider";

const useShowErrors = (
  errors: unknown[] | Record<string, unknown> | null,
  options: ErrorAlertShowOptions = {}
): void => {
  const { show: showError } = useErrorAlert();

  const [currentErrorQueue, setCurrentErrorQueue] = useState<unknown[]>([]);

  const shownErrors = useRef<unknown[]>([]);
  const isShowingErrorsRef = useRef<boolean>(false);

  const onErrorDialogDismiss = useCallback(() => {
    setCurrentErrorQueue((prev) => prev.slice(1));
  }, []);

  const memorizedOptions = useMemo(
    () => options,
    // Memorize the options object depending on its elements. Otherwise the
    // object could be new in each rendering.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Object.entries(options)]
  );

  // NOTE: This is often re-triggered if `useShowErrors` is called this way:
  // useShowErrors([error1, error2])
  // useShowErrors({a: error1, b: error2})
  // because a new array/map is created each time.
  //
  // The errors array/object cannot be memorized like options because the
  // number of errors is variable, and react requires that the dependency array
  // to have fixed number of elements.
  useEffect(() => {
    if (!errors) {
      // no errors to display
      return;
    }

    const errorsArray = Array.isArray(errors) ? errors : Object.values(errors);

    // If the error is not shown before, add it to the current error queue.
    // Otherwise the queue is unchanged.
    setCurrentErrorQueue((prev) => {
      const newErrors: unknown[] = errorsArray.filter(
        (e) =>
          e != null && !prev.includes(e) && !shownErrors.current.includes(e)
      );
      return newErrors.length > 0 ? [...prev, ...newErrors] : prev;
    });
  }, [errors]);

  useEffect(() => {
    // Show the next error, be careful not to re-show the error that is
    // currently showing.
    if (
      currentErrorQueue[0] &&
      !shownErrors.current.includes(currentErrorQueue[0])
    ) {
      showError(currentErrorQueue[0], {
        ...memorizedOptions,
        onDismiss: onErrorDialogDismiss,
      });
      shownErrors.current.push(currentErrorQueue[0]);
      isShowingErrorsRef.current = true;
    }

    // If all errors are dismissed, call onDismiss callback.
    if (!currentErrorQueue[0] && isShowingErrorsRef.current) {
      memorizedOptions.onDismiss?.();
      isShowingErrorsRef.current = false;
    }
  }, [showError, currentErrorQueue, memorizedOptions, onErrorDialogDismiss]);
};

export default useShowErrors;
