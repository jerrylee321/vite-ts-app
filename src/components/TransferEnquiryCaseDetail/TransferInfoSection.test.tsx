import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import TransferInfoSection from "./TransferInfoSection";

describe("TransferInfoSection", () => {
  const data = {
    typeOfTransfer: "testType",
    referenceNumber: "test referenceNumber",
  };

  test("TransferInfoSection", async () => {
    const transferTypeMap = new Map<string, string>();
    transferTypeMap.set("testType", "Test Type");

    renderWithProviders(
      <TransferInfoSection transferTypeMap={transferTypeMap} data={data} />
    );
    expect(screen.getAllByText("Test Type")).toHaveLength(1);
    expect(screen.getAllByText(data.referenceNumber)).toHaveLength(1);
  });

  test("Transfer Type not in TransferTypeMap", async () => {
    const transferTypeMap = new Map<string, string>();

    renderWithProviders(
      <TransferInfoSection transferTypeMap={transferTypeMap} data={data} />
    );
    expect(screen.getAllByText("testType")).toHaveLength(1);
    expect(screen.getAllByText(data.referenceNumber)).toHaveLength(1);
  });
});
