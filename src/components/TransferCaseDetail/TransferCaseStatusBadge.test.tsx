import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import { TransferCaseStatusBadge } from "./TransferCaseStatusBadge";

describe("transfer status badge", () => {
  test("should render pending status badge correct", async () => {
    renderWithProviders(<TransferCaseStatusBadge caseStatus="Pending" />, {
      authenticated: true,
    });

    expect(screen.getByText(/Case Approval/i)).toBeInTheDocument();
  });

  test("should render pending reply status badge correct", async () => {
    renderWithProviders(<TransferCaseStatusBadge caseStatus="Processing" />, {
      authenticated: true,
    });

    expect(screen.getByText(/Pending Reply from eMPF/i)).toBeInTheDocument();
  });

  test("should not render status badge text otherwise", async () => {
    renderWithProviders(
      <TransferCaseStatusBadge caseStatus="Pending Virus Scan" />,
      {
        authenticated: true,
      }
    );

    expect(screen.queryByText(/Case Approval/i)).toBeNull();
    expect(screen.queryByText(/Pending Reply from eMPF/i)).toBeNull();
  });
});
