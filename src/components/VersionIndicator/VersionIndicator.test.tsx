import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import VersionIndicator from ".";

test("VersionIndicator Component", () => {
  renderWithProviders(<VersionIndicator version="0.0.1" />);

  expect(screen.getByTestId("VersionIndicator")).toBeInTheDocument();
  expect(screen.getByTestId("VersionIndicator").textContent).toContain("0.0.1");
});
