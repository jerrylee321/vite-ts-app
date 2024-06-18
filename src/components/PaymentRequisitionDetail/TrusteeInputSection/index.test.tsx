import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../utils/test/render";

import TrusteeInputSection from ".";

describe("TrusteeInputSection", () => {
  const mockTrusteeComment = "mockTrusteeComment";
  test("should able to render", async () => {
    renderWithProviders(
      <TrusteeInputSection trusteeComment={mockTrusteeComment} />
    );

    expect(screen.getByTestId("trusteeComment")).toBeInTheDocument();
    expect(screen.getByText(mockTrusteeComment)).toBeInTheDocument();
  });
});
