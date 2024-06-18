const exportFn = jest.fn();
jest.mock("frontend-common/src/utils/exportExcel", () => ({
  exportExcelWithColumns: exportFn,
}));

import { Column } from "react-table";
import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import DataTable from ".";

export interface MockSearchResults {
  id: string;
  empfRefNo: string;
  empfSubmitTime: Date;
  fileName: string;
  fileDlStatus: boolean;
  fileUuid: string;
  mpfaCollectTime: Date;
  number: number | null;
  requestType: "PA" | "UB";
}

export const mockSearchResultsColumns: Column<MockSearchResults>[] = [
  {
    Header: "id",
    i18nKey: "Testi18nKey",
    accessor: "id",
  },
  {
    Header: "empfRefNo",
    i18nKey: null,
    accessor: "empfRefNo",
  },
  {
    Header: "empfSubmitTime",
    i18nKey: null,
    accessor: "empfSubmitTime",
  },
  {
    Header: "mpfaCollectTime",
    i18nKey: null,
    accessor: "mpfaCollectTime",
    dateFormat: "dd/MM/yyyy",
  },
  {
    Header: "requestType",
    i18nKey: null,
    accessor: "requestType",
  },
  {
    Header: "fileName",
    i18nKey: null,
    accessor: "fileName",
  },
  {
    Header: "fileDlStatus",
    i18nKey: null,
    accessor: "fileDlStatus",
  },
  {
    Header: "number",
    i18nKey: null,
    accessor: "number",
  },
  {
    Header: "fileUuid",
    i18nKey: null,
    id: "action",
    accessor: "fileUuid",
  },
];

export const mockSearchResults: MockSearchResults[] = [
  {
    empfRefNo: "LU1528825VUWVT247629",
    mpfaCollectTime: new Date("05/07/2029 23:59Z"),
    requestType: "PA",
    empfSubmitTime: new Date("09/27/2026 23:59Z"),
    fileName: "overriding.cpt",
    fileDlStatus: false,
    fileUuid: "86fed199-fc84-4a54-b86b-867168351c36",
    id: "123",
    number: null,
  },
  {
    empfRefNo: "SK5202930060660310064001",
    mpfaCollectTime: new Date("06/12/2025 23:59Z"),
    requestType: "PA",
    empfSubmitTime: new Date("05/03/2025 23:59Z"),
    fileName: "agent_metal_table.ms",
    fileDlStatus: false,
    fileUuid: "4172d7d2-a256-40cf-818b-3be18fcb910e",
    id: "124",
    number: 0,
  },
  {
    empfRefNo: "NO5235329938564",
    mpfaCollectTime: new Date("02/22/2027 23:59Z"),
    requestType: "PA",
    empfSubmitTime: new Date("12/11/2025 23:59Z"),
    fileName: "ivory_handmade.cst",
    fileDlStatus: false,
    fileUuid: "f297f000-e65c-4aff-a8bc-1ef7480ed267",
    id: "125",
    number: 1,
  },
  {
    empfRefNo: "MD15G379U17Z06240495404W",
    mpfaCollectTime: new Date("01/12/2022 23:59Z"),
    requestType: "PA",
    empfSubmitTime: new Date("01/01/2030 23:59Z"),
    fileName: "china.htm",
    fileDlStatus: false,
    fileUuid: "36b077c3-435a-49f5-9421-5fb25fd7020e",
    id: "126",
    number: 2,
  },
  {
    empfRefNo: "RS35309006700164003158",
    mpfaCollectTime: new Date("07/16/2025 23:59Z"),
    requestType: "PA",
    empfSubmitTime: new Date("05/14/2025 23:59Z"),
    fileName: "api.install",
    fileDlStatus: true,
    fileUuid: "ff1363be-cd07-4b0d-9e72-ae9e518111b8",
    id: "127",
    number: 3,
  },
];

describe("Data table test", () => {
  it("Test Rendering", async () => {
    renderWithProviders(
      <DataTable columns={mockSearchResultsColumns} data={mockSearchResults} />
    );
    expect(screen.queryByText("id")).toBeInTheDocument();
    expect(screen.queryByText("empfRefNo")).toBeInTheDocument();
    expect(screen.queryByText("empfSubmitTime")).toBeInTheDocument();
    expect(screen.queryByText("fileName")).toBeInTheDocument();
    expect(screen.queryByText("fileDlStatus")).toBeInTheDocument();
    expect(screen.queryByText("fileUuid")).toBeInTheDocument();
    expect(screen.queryByText("mpfaCollectTime")).toBeInTheDocument();
    expect(screen.queryByText("requestType")).toBeInTheDocument();
  });

  it("should able to export excel", async () => {
    renderWithProviders(
      <DataTable columns={mockSearchResultsColumns} data={mockSearchResults} />
    );

    const boxes = screen.getAllByRole("checkbox");
    fireEvent.click(boxes[0]);

    const exportButton = screen.getByTestId("ExportExcelButton");
    fireEvent.click(exportButton);

    expect(exportFn).toBeCalledTimes(1);
  });

  it("render children", async () => {
    renderWithProviders(
      <DataTable columns={mockSearchResultsColumns} data={mockSearchResults}>
        <div data-testid="mock-children" />
      </DataTable>
    );
    expect(screen.queryByTestId("mock-children")).toBeInTheDocument();
  });
});
