import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../utils/test/render";

import TransferTypesSection from ".";

describe("TransferTypesSection", () => {
  test("should able to render", async () => {
    renderWithProviders(<TransferTypesSection transferType="SchemeTransfer" />);

    expect(screen.getByTestId("typesOfTransfer")).toBeInTheDocument();
  });

  test("should render empty transferType", async () => {
    renderWithProviders(<TransferTypesSection transferType="Unknown" />);

    expect(screen.getByText("-")).toBeInTheDocument();
  });
});
