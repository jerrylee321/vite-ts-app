import { renderWithProviders } from "../../utils/test/render";

import ForgotPasswordSuccessView from "./ForgotPasswordSuccessView";

describe("ForgotPasswordSuccessView", () => {
  test("render", async () => {
    renderWithProviders(<ForgotPasswordSuccessView variant="forgot" />);
  });
});
