import { useCallback, useState } from "react";

const useDialogState = (
  initialValue: boolean = false
): [boolean, () => void, () => void] => {
  const [state, setState] = useState(initialValue);

  const open = useCallback(() => {
    setState(true);
  }, []);

  const close = useCallback(() => {
    setState(false);
  }, []);

  return [state, open, close];
};

export default useDialogState;
