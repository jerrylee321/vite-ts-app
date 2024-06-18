import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import DataTableActionLink from ".";

test("DataTableActionLink Component", () => {
  const testMessage = "test link";
  renderWithProviders(<DataTableActionLink message={testMessage} to="/" />);

  expect(screen.getByText(testMessage)).toBeInTheDocument();
  expect(screen.getByRole("link")).toBeInTheDocument();
});
