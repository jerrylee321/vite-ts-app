import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import { TransferCase } from "./models";
import TransferCasesSection from "./TransferCasesSection";

const mockCaseList: TransferCase[] = [
  {
    caseUuid: "mock ID 1",
    submissionDt: new Date("2022-04-17"),
    transferType: "MMB_SCHEME_TRAN",
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

describe("TransferCasesSection", () => {
  const mockGetViewButtonProps = jest.fn(() => ({
    targetPath: "#",
    hasViewAccess: true,
  }));

  test("Should render cases for your action section correctly", () => {
    renderWithProviders(
      <TransferCasesSection
        isLoading={false}
        variant="casesForYourAction"
        transferCases={mockCaseList}
        totalCount={mockCaseList.length}
        getViewButtonProps={mockGetViewButtonProps}
        onDeleteItemsRequest={jest.fn()}
      />
    );

    expect(screen.getAllByText(/^17\/04\/2022$/).length).toEqual(1);
    expect(screen.getAllByText(/^Scheme Transfer$/).length).toEqual(1);
    expect(screen.getAllByText(/^mock ref no.$/).length).toEqual(1);
    expect(screen.getAllByText(/^mock ORSO Scheme Name A$/).length).toEqual(1);
    expect(screen.getAllByText(/^mock MPF Scheme Name A$/).length).toEqual(1);
    expect(screen.getAllByText(/^18\/04\/2022$/).length).toEqual(1);
    expect(screen.getAllByText(/^8$/).length).toEqual(1);
    expect(screen.getAllByText(/^Saved$/).length).toEqual(1);
    expect(screen.getAllByText(/^mock preparer$/).length).toEqual(1);
    expect(screen.getAllByText(/^mock supervisor$/).length).toEqual(1);

    expect(screen.getByText(/Cases for Your Action/i)).toBeInTheDocument();
    expect(
      screen.getAllByTestId("TransferCasesDataTableViewButton").length
    ).not.toEqual(0);
    expect(
      screen.queryByTestId("TransferCasesDataTableViewIconButton")
    ).toBeNull();
  });

  test("Should render pending reply section correctly", () => {
    renderWithProviders(
      <TransferCasesSection
        isLoading={false}
        variant="pendingReply"
        transferCases={mockCaseList}
        totalCount={mockCaseList.length}
        getViewButtonProps={mockGetViewButtonProps}
      />
    );
    expect(screen.getByText(/Pending Reply from eMPF/i)).toBeInTheDocument();
    expect(
      screen.getAllByTestId("TransferCasesDataTableViewIconButton").length
    ).not.toEqual(0);
    expect(screen.queryByTestId("TransferCasesDataTableViewButton")).toBeNull();
  });
});
