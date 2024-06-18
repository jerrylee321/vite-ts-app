import { CaptchaError, isCaptchaError } from "./errors";

describe("CaptchaError", () => {
  test("isCaptchaError", () => {
    expect(isCaptchaError(new CaptchaError("captcha error"))).toBeTruthy();
  });
});
