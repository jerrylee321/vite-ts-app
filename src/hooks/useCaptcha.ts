import { MutableRefObject, useCallback, useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import usePromise, {
  promiseWithTimeout,
} from "frontend-common/src/hooks/usePromise";

import { CaptchaError } from "../models/errors";

export interface CaptchaResult {
  response: string;
}

interface UseCaptchaValues {
  present: () => Promise<CaptchaResult | null>;
  reset: () => void;
  handleLoad: (() => void) | undefined;
  ref: MutableRefObject<HCaptcha | null>;
}

const useCaptcha = (): UseCaptchaValues => {
  const captchaRef = useRef<HCaptcha | null>(null);
  const [captchaLoadPromise, captchaLoadResolve] = usePromise();
  const present = useCallback(async (): Promise<CaptchaResult | null> => {
    if (!captchaRef.current) {
      console.error("captchaRef is unset.");
      throw new CaptchaError("challenge-error");
    }
    /* istanbul ignore next */
    if (!captchaLoadPromise) {
      console.error("HCaptcha load promise is unset.");
      throw new CaptchaError("challenge-error");
    }

    while (!captchaRef.current.state.isApiReady) {
      try {
        // Wait for the captcha to finish loading.
        await promiseWithTimeout(captchaLoadPromise, 15000);
        break;
      } catch {
        console.warn("It took too long waiting for hcaptcha to initialize.");
      }
    }

    try {
      const { response } = await captchaRef.current.execute({
        async: true,
      });
      return { response };
    } catch (err: unknown) {
      console.error("useCaptcha: HCaptcha returned an error:", err);
      /* istanbul ignore next */
      if (typeof err !== "string") {
        throw err;
      }

      if (err === "challenge-closed") {
        // not an error
        return null;
      }

      throw new CaptchaError(err);
    }
  }, [captchaLoadPromise]);

  const reset = useCallback(() => {
    captchaRef.current?.resetCaptcha();
  }, []);

  return {
    handleLoad: captchaLoadResolve,
    present,
    reset,
    ref: captchaRef,
  };
};

export default useCaptcha;
