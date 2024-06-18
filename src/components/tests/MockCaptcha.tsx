import { ForwardedRef, ReactElement, useEffect } from "react";

interface ExecuteResponse {
  response: string;
  key: string;
}

interface MockCaptchaRefType {
  resetCaptcha: () => void;
  execute:
    | ((opts: { async: true }) => Promise<ExecuteResponse>)
    | ((opts?: { async: false }) => void);
  state: {
    isApiReady: boolean;
  };
}

interface MockCaptchaProps {
  onLoad?: () => any;
}

export const mockExecute = jest.fn(async (_opts: { async: true }) => {
  return Promise.resolve({
    key: "captcha-key",
    response: "captcha-response",
  });
});

export const mockResetCaptcha = jest.fn();

const MockCaptcha = <T extends MockCaptchaRefType, P extends MockCaptchaProps>(
  props: P,
  ref: ForwardedRef<T>
): ReactElement => {
  const obj: unknown = {
    execute: mockExecute,
    resetCaptcha: mockResetCaptcha,
    state: {
      isApiReady: true,
    },
  } satisfies MockCaptchaRefType;
  if (ref) {
    if ("current" in ref) {
      ref.current = obj as T;
    } else {
      ref(obj as T);
    }
  }

  const { onLoad } = props;
  useEffect(() => {
    onLoad?.();
  }, [onLoad]);

  return <></>;
};

export default MockCaptcha;
