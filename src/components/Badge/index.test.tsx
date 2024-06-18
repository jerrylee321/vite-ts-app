import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import Badge from ".";

test("Badge", () => {
  renderWithProviders(<Badge>Badge content</Badge>);

  expect(screen.getByText("Badge content")).toBeInTheDocument();
});
