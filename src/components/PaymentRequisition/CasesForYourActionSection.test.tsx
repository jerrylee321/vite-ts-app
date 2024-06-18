import "@testing-library/jest-dom";
import "../../i18n";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import CasesForYourActionSection from "./CasesForYourActionSection";

describe("CasesForYourActionSection", () => {
  it("should render", async () => {
    renderWithProviders(
      <CasesForYourActionSection
        isLoading={false}
        caseList={[]}
        renderDetailPath={jest.fn()}
        totalCount={0}
      />
    );

    expect(screen.getByTestId("CasesForYourAction")).toBeInTheDocument();
  });
});
