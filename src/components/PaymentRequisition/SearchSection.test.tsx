import "@testing-library/jest-dom";
import "../../i18n";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import SearchSection from "./SearchSection";

describe("SearchSection", () => {
  it("should render", async () => {
    renderWithProviders(
      <SearchSection
        isLoading={false}
        caseList={[]}
        renderDetailPath={jest.fn()}
        onSubmit={jest.fn()}
        isSearchFilterEmpty={jest.fn()}
        transferTypeOptions={[]}
        searchFormParamsValue={{
          paymentNotificationDateRange: [null, null],
        }}
      />
    );

    expect(screen.getByTestId("Search")).toBeInTheDocument();
  });
});
