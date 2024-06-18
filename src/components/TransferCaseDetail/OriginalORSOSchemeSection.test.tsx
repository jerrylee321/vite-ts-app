import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import { OrsoScheme } from "./models";
import OriginalORSOSchemeSection from "./OriginalORSOSchemeSection";

const mockOrsoScheme: OrsoScheme = {
  trusteeName: "mock trusteeName",
  schemeName: "mock schemeName",
  registrationNumber: "mock registrationNumber",
  employerName: "mock employerName",
  employerAccountNumber: "mock employerAccountNumber",
  trusteeAddress: {
    country: "mock country",
    city: "mock city",
    room: "mock room",
    floor: "mock floor",
    block: "mock block",
    building: "mock building",
    street: "mock street",
    district: "mock district",
    postCode: "mock postCode",
  },
  transferEffectiveDate: new Date("2023-04-20"),
};

describe("OriginalORSOSchemeSection", () => {
  test("Should render section with data correctly", () => {
    renderWithProviders(
      <OriginalORSOSchemeSection
        orsoScheme={mockOrsoScheme}
        transferType="MMB_SCHEME_TRAN"
      />
    );

    expect(screen.getByText(/^mock trusteeName$/)).toBeInTheDocument();
    expect(screen.getByText(/^mock schemeName$/)).toBeInTheDocument();
    expect(screen.getByText(/^mock registrationNumber$/)).toBeInTheDocument();
    expect(screen.getByText(/^mock employerName$/)).toBeInTheDocument();
    expect(
      screen.getByText(/^mock employerAccountNumber$/)
    ).toBeInTheDocument();
    expect(screen.getByText(/^mock country$/)).toBeInTheDocument();
    expect(screen.getByText(/^mock city$/)).toBeInTheDocument();
    expect(screen.getByText(/^mock room$/)).toBeInTheDocument();
    expect(screen.getByText(/^mock floor$/)).toBeInTheDocument();
    expect(screen.getByText(/^mock block$/)).toBeInTheDocument();
    expect(screen.getByText(/^mock street$/)).toBeInTheDocument();
    expect(screen.getByText(/^mock district$/)).toBeInTheDocument();
    expect(screen.getByText(/^mock postCode$/)).toBeInTheDocument();
    expect(screen.getByText(/^20\/04\/2023$/)).toBeInTheDocument();
  });

  test("Should render empty transferEffectiveDate", () => {
    renderWithProviders(
      <OriginalORSOSchemeSection
        orsoScheme={{ ...mockOrsoScheme, transferEffectiveDate: null }}
        transferType="MMB_SCHEME_TRAN"
      />
    );

    expect(screen.getByText(/^mock trusteeName$/)).toBeInTheDocument();
    expect(screen.getByText(/^mock schemeName$/)).toBeInTheDocument();
    expect(screen.getByText(/^mock registrationNumber$/)).toBeInTheDocument();
    expect(screen.getByText(/^mock employerName$/)).toBeInTheDocument();
    expect(
      screen.getByText(/^mock employerAccountNumber$/)
    ).toBeInTheDocument();
    expect(screen.getByText(/^mock country$/)).toBeInTheDocument();
    expect(screen.getByText(/^mock city$/)).toBeInTheDocument();
    expect(screen.getByText(/^mock room$/)).toBeInTheDocument();
    expect(screen.getByText(/^mock floor$/)).toBeInTheDocument();
    expect(screen.getByText(/^mock block$/)).toBeInTheDocument();
    expect(screen.getByText(/^mock street$/)).toBeInTheDocument();
    expect(screen.getByText(/^mock district$/)).toBeInTheDocument();
    expect(screen.getByText(/^mock postCode$/)).toBeInTheDocument();
    expect(screen.queryByText(/^20\/04\/2023$/)).toBeNull();
  });
});
