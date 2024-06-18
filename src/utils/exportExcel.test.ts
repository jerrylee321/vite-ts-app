import "@testing-library/jest-dom";

import {
  AccessorType,
  exportExcelWithColumns,
  exportExcelWithRawFormat,
} from "./exportExcel";

const writeFn = jest.fn();
jest.mock("exceljs", () => ({
  ...jest.requireActual("exceljs"),
  Workbook: function () {
    return {
      addWorksheet: () => ({
        addTable: jest.fn(),
        columns: [{ values: ["col1", "col2"] }],
      }),
      xlsx: {
        writeBuffer: writeFn.mockReturnValue(Promise.resolve()),
      },
    };
  },
}));

describe("export excel function", () => {
  test("should able to export data with different format", () => {
    exportExcelWithColumns({
      fileName: "test.xlsx",
      sheetName: "test",
      headers: [
        { text: "test title", accessor: "key" as unknown as AccessorType },
        { text: "test func", accessor: () => "return value" },
      ],
      data: [
        [{ key1: "demo", key: "demo " }],
        [{ key1: "demo 2", key: "demo 2" }],
      ],
    });

    expect(writeFn).toBeCalledTimes(1);

    exportExcelWithRawFormat({
      fileName: "test_raw.xlsx",
      sheetName: "sheet 1",
      columns: [{ name: "title 1" }],
      rows: [["text"]],
    });

    expect(writeFn).toBeCalledTimes(2);
  });
});
