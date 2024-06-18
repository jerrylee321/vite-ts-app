import { exportExcelWithColumns } from "../utils/exportExcel";
import { renderHookWithProviders } from "../utils/test/render";

import useExportTableExcel, {
  ExportTableExcelButtonProps,
} from "./useExportTableExcel";

jest.mock("../utils/exportExcel", () => ({
  exportExcelWithColumns: jest.fn(),
}));

const dummyTableData: ExportTableExcelButtonProps<
  { key1: string; key: string }[]
> = {
  columns: [
    {
      Header: "test title",
      i18nKey: "Announcement.title",
      accessor: 0,
    },
    {
      Header: "test func",
      i18nKey: "Announcement.title",
      accessor: () => "return value",
    },
  ],
  data: [[{ key1: "demo", key: "demo " }], [{ key1: "demo 2", key: "demo 2" }]],
  selectedRowIds: {},
};

describe("useExportExcel", () => {
  const mockExport = exportExcelWithColumns as jest.Mock;
  it("should export with selected row", () => {
    const exportFunc = renderHookWithProviders(() =>
      useExportTableExcel({
        ...dummyTableData,
        selectedRowIds: { 0: true },
      })
    );

    exportFunc.result.current();
    expect(mockExport).toBeCalled();
  });

  it("should not export without selected row", () => {
    const exportFunc = renderHookWithProviders(() =>
      useExportTableExcel({
        ...dummyTableData,
        selectedRowIds: {},
      })
    );

    exportFunc.result.current();
    expect(mockExport).not.toBeCalled();
  });

  afterEach(() => {
    mockExport.mockClear();
  });
});
