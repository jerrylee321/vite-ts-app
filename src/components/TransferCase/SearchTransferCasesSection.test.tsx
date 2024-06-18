import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import { TransferCase } from "./models";
import SearchTransferCasesSection from "./SearchTransferCasesSection";

const mockCaseList: TransferCase[] = [
  {
    caseUuid: "mock ID 1",
    submissionDt: new Date("2022-04-17"),
    transferType: "mock Scheme Transfer",
    refNo: "mock ref no.",
    orsoSchemeName: "mock ORSO Scheme Name A",
    mpfSchemeName: "mock MPF Scheme Name A",
    trfEffectiveDt: new Date("2022-04-18"),
    numMember: 8,
    status: "Saved",
    prepareName: "mock preparer",
    supervisorName: "mock supervisor",
  },
];

describe("SearchTransferCasesSection", () => {
  test("Should render search section correctly", () => {
    const mockGetViewButtonProps = jest.fn(() => ({
      targetPath: "#",
      hasViewAccess: true,
    }));
    const mockOnSearch = jest.fn();
    renderWithProviders(
      <SearchTransferCasesSection
        isLoading={false}
        onSearchParamsChange={mockOnSearch}
        transferCases={mockCaseList}
        getViewButtonProps={mockGetViewButtonProps}
      />
    );
    expect(screen.getByTestId("TransferCaseSearchForm")).toBeInTheDocument();
    expect(screen.getByText(/Search Result/i)).toBeInTheDocument();

    // Note: expect icon button for view button in search section
    expect(
      screen.getAllByTestId("TransferCasesDataTableViewIconButton").length
    ).toBeGreaterThan(0);
    expect(screen.queryByTestId("TransferCasesDataTableViewButton")).toBeNull();
  });
});
