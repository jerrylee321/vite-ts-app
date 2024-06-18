import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import MemberTransferDetailsSection from "./MemberTransferDetailsSection";
import { TransferCaseMember } from "./models";

const mockMembers: TransferCaseMember[] = [
  {
    rowId: 1,
    orsoAcctNo: "mock orsoAcctNo",
    orsoJoinDt: new Date("2023-04-19"),
    newMemberFlg: false,
    mpfAcctNo: "mock mpfAcctNo",
    lastName: "mock lastNameEn",
    firstName: "mock firstNameEn",
    lastNameCn: "mock lastNameCn",
    firstNameCn: "mock firstNameCn",
    idType: "HKID",
    idNo: "mock idNo",
    uncleanFlg: null,
    errorFields: ["lastName"],
    existingErEmpDt: new Date("2023-01-01"),
    uncleanReason: [],
  },
  {
    rowId: 2,
    orsoAcctNo: "mock orsoAcctNo",
    orsoJoinDt: new Date("2023-04-19"),
    newMemberFlg: true,
    mpfAcctNo: "mock mpfAcctNo",
    lastName: "mock lastNameEn",
    firstName: "mock firstNameEn",
    lastNameCn: "mock lastNameCn",
    firstNameCn: "mock firstNameCn",
    idType: "HKID",
    idNo: "mock idNo",
    uncleanFlg: "NU",
    errorFields: ["orsoAcctNo"],
    existingErEmpDt: new Date("2023-01-01"),
    uncleanReason: [],
  },
];

describe("MemberTransferDetailsSection", () => {
  test("Should render section with data correctly", () => {
    renderWithProviders(
      <MemberTransferDetailsSection
        transferType="MMB_INTRA_GROUP"
        members={mockMembers}
        totalCount={mockMembers.length}
      />
    );

    expect(screen.getAllByText(/^mock orsoAcctNo/).length).toEqual(2);
    expect(screen.getAllByText(/^mock mpfAcctNo/).length).toEqual(2);
    expect(screen.getAllByText(/^mock firstNameEn/).length).toEqual(2);
    expect(screen.getAllByText(/^mock lastNameEn/).length).toEqual(2);
    expect(screen.getAllByText(/^mock firstNameCn/).length).toEqual(2);
    expect(screen.getAllByText(/^mock lastNameCn/).length).toEqual(2);
    expect(screen.getAllByText(/^19\/04\/2023$/).length).toEqual(2);
    expect(screen.getAllByText(/^Existing$/).length).toEqual(1);
    expect(screen.getAllByText(/^New$/).length).toEqual(1);
    expect(screen.getAllByText(/^HKID$/).length).toEqual(2);
    expect(screen.getAllByText(/^mock idNo$/).length).toEqual(2);
    expect(screen.getAllByText(/^01\/01\/2023$/).length).toEqual(2);
  });
});
