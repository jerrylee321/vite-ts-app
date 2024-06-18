import "@testing-library/jest-dom";
import "../../i18n";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import PendingReplySection from "./PendingReplySection";

describe("PendingReplySection", () => {
  it("should render", async () => {
    renderWithProviders(
      <PendingReplySection
        isLoading={false}
        caseList={[]}
        renderDetailPath={jest.fn()}
        totalCount={0}
      />
    );

    expect(screen.getByTestId("PendingReply")).toBeInTheDocument();
  });
});
