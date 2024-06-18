import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import AuthLoadingScreen from ".";

describe("auth loading screen", () => {
  test("should have loading text", async () => {
    renderWithProviders(<AuthLoadingScreen />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
