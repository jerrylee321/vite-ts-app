import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderRouteWithProviders } from "../../utils/test/render";
import waitForLazyLoad from "../../utils/test/waitForLazyLoad";

describe("route error screen screen", () => {
  // Silencing console log because non-existent route is expected to cause
  // error.
  let consoleWarn: jest.SpyInstance;
  let consoleError: jest.SpyInstance;
  beforeEach(() => {
    consoleWarn = jest.spyOn(console, "warn").mockImplementation(() => {
      /* do nothing */
    });
    consoleError = jest.spyOn(console, "error").mockImplementation(() => {
      /* do nothing */
    });
  });
  afterEach(() => {
    consoleWarn.mockRestore();
    consoleError.mockRestore();
  });

  test("should have not found text", async () => {
    renderRouteWithProviders(["/non-existent"]);
    await waitForLazyLoad(screen);

    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
