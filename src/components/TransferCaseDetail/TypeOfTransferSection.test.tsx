import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import TypeOfTransferSection from "./TypeOfTransferSection";

describe("TypeOfTransferSection", () => {
  test("Should render section with data correctly", () => {
    renderWithProviders(
      <TypeOfTransferSection transferType="MMB_SCHEME_TRAN" />
    );

    expect(screen.getByText(/^Scheme Transfer$/)).toBeInTheDocument();
  });
});
