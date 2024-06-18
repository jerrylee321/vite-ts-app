import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import AuthErrorScreen from ".";

describe("auth error screen", () => {
  test("should have error text", async () => {
    renderWithProviders(<AuthErrorScreen error={new Error()} />);
    expect(screen.getByText(/unexpected error/i)).toBeInTheDocument();
  });
});
