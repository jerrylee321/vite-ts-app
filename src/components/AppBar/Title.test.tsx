import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import AppBarTitle from "./Title";

describe("AppBarTitle", () => {
  it("AppBar title", () => {
    renderWithProviders(<AppBarTitle />);
    expect(screen.getByText(/Portal/)).toBeInTheDocument();
  });
});
