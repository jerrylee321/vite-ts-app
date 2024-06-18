import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import AuthOTPInput from "./";

test("should render", () => {
  const otpCode = "123456";
  renderWithProviders(
    <form data-testid="theform">
      <AuthOTPInput name="otpCode" maxLength={6} value={otpCode} />
    </form>
  );
  [...otpCode].forEach((s, i) => {
    expect(
      screen.getByTestId(`otpCode_${i}`).getElementsByTagName("input")[0]
    ).toHaveValue(s);
  });
});
