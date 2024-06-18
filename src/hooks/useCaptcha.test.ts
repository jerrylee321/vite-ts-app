import HCaptcha from "@hcaptcha/react-hcaptcha";
import { renderHook, waitFor } from "@testing-library/react";

import useCaptcha from "./useCaptcha";

jest.spyOn(console, "error").mockImplementation(jest.fn());

describe("useCaptcha", () => {
  const hcaptcha = {
    execute: jest.fn(),
    resetCaptcha: jest.fn(),
    state: {
      isApiReady: true,
    },
  } as unknown as HCaptcha;

  test("present", async () => {
    const { result } = renderHook(() => useCaptcha());

    const { ref, handleLoad, present } = result.current;
    ref.current = hcaptcha;
    await waitFor(() => {
      expect(handleLoad).toBeDefined();
    });
    handleLoad!();

    // eslint-disable-next-line jest/unbound-method
    jest.mocked(hcaptcha.execute).mockResolvedValue({
      response: "captcha-response",
      key: "captcha-key",
    });

    const captchaResult = await present();
    expect(captchaResult).toMatchObject({
      response: "captcha-response",
    });
  });

  test("present wait for promise", async () => {
    const { result } = renderHook(() => useCaptcha());

    const { ref, handleLoad, present } = result.current;
    ref.current = {
      ...hcaptcha,
      state: { isApiReady: false },
    } as unknown as HCaptcha;
    await waitFor(() => {
      expect(handleLoad).toBeDefined();
    });

    // eslint-disable-next-line jest/unbound-method
    jest.mocked(hcaptcha.execute).mockRejectedValue("challenge-closed");

    /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
    present();
    handleLoad!();
    await waitFor(() => {
      expect(hcaptcha.execute).toBeCalled();
    });
  });

  test("present throw error ref not set", async () => {
    const { result } = renderHook(() => useCaptcha());

    const { handleLoad, present } = result.current;
    await waitFor(() => {
      expect(handleLoad).toBeDefined();
    });
    handleLoad!();

    await expect(async () => {
      await present();
    }).rejects.toMatchObject({ message: "challenge-error" });
  });

  test("present throw challenge-closed", async () => {
    const { result } = renderHook(() => useCaptcha());

    const { ref, handleLoad, present } = result.current;
    ref.current = hcaptcha;
    await waitFor(() => {
      expect(handleLoad).toBeDefined();
    });
    handleLoad!();

    // eslint-disable-next-line jest/unbound-method
    jest.mocked(hcaptcha.execute).mockRejectedValue("challenge-closed");

    const captchaResult = await present();
    expect(captchaResult).toBeNull();
  });

  test("present throw other error", async () => {
    const { result } = renderHook(() => useCaptcha());

    const { ref, handleLoad, present } = result.current;
    ref.current = hcaptcha;
    await waitFor(() => {
      expect(handleLoad).toBeDefined();
    });
    handleLoad!();

    // eslint-disable-next-line jest/unbound-method
    jest.mocked(hcaptcha.execute).mockRejectedValue("unknown-error");

    await expect(async () => {
      await present();
    }).rejects.toMatchObject({ message: "unknown-error" });
  });

  test("reset", async () => {
    const { result } = renderHook(() => useCaptcha());

    const { ref, handleLoad, reset } = result.current;
    ref.current = hcaptcha;
    await waitFor(() => {
      expect(handleLoad).toBeDefined();
    });
    handleLoad!();

    reset();
    expect(jest.mocked(hcaptcha.resetCaptcha)).toBeCalled();
  });
});
