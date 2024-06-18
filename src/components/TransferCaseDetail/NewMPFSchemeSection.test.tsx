import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import { MpfScheme } from "./models";
import NewMPFSchemeSection from "./NewMPFSchemeSection";

const mockMpfScheme: MpfScheme = {
  trusteeName: "mock trusteeName",
  schemeName: "mock schemeName",
  employerName: "mock employerName",
  employerAccountNumber: "mock employerAccountNumber",
  payrollGroupCode: "mock payrollGroupCode",
};

describe("NewMPFSchemeSection", () => {
  test("Should render section with data correctly", () => {
    renderWithProviders(<NewMPFSchemeSection mpfScheme={mockMpfScheme} />);

    expect(screen.getByText(/^mock trusteeName$/)).toBeInTheDocument();
    expect(screen.getByText(/^mock schemeName$/)).toBeInTheDocument();
    expect(screen.getByText(/^mock employerName$/)).toBeInTheDocument();
    expect(
      screen.getByText(/^mock employerAccountNumber$/)
    ).toBeInTheDocument();
    expect(screen.getByText(/^mock payrollGroupCode$/)).toBeInTheDocument();
  });
});
