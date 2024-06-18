import { isDate } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import ExcelJS from "exceljs";

import { defaultTimeZone } from "../models/time";

export type AccessorType = (data: any, index?: number) => string | string;

export interface ExportExcelHeader {
  text: string;
  accessor: AccessorType;
  format?: string;
}
interface ExportExcelWithColumnsProps {
  fileName: string;
  sheetName?: string;
  headers: ExportExcelHeader[];
  data: any[];
  timeZone?: string;
  defaultDateFormat?: string;
}

interface ExportExcelRawFormatProps {
  fileName: string;
  sheetName?: string;
  columns: ExcelJS.TableColumnProperties[];
  rows: string[][];
}

export const exportExcelWithRawFormat = (
  props: ExportExcelRawFormatProps
): void => {
  const { fileName, sheetName, columns, rows } = props;
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(sheetName ?? "result sheet");
  // If column count on any row more than `columns`.length will throw exception
  const boundedRows = rows.map((row) => row.slice(0, columns.length));

  const columnsWithoutDuplicate = [];
  const columnNameIndex: Partial<Record<string, number>> = {};
  for (let i = 0; i < columns.length; i += 1) {
    const columnName = columns[i].name;
    const existIndex = columnNameIndex[columnName];

    if (existIndex == null) {
      columnsWithoutDuplicate.push(columns[i]);
      columnNameIndex[columnName] = 2;
    } else {
      columnsWithoutDuplicate.push({
        ...columns[i],
        name: `${columnName}_${existIndex}`,
      });
      columnNameIndex[columnName]! += 1;
    }
  }

  sheet.addTable({
    name: "result",
    ref: "A1",
    columns: columnsWithoutDuplicate,
    rows: boundedRows,
  });

  // Fit column width
  sheet.columns.forEach((column) => {
    if (column.values) {
      const lengths = (column.values as string[]).map(
        (v) => v.toString().length
      );
      const maxLength = Math.max(
        ...lengths.filter((v) => typeof v === "number")
      );
      column.width = maxLength;
    }
  });

  workbook.xlsx
    .writeBuffer()
    .then((content) => {
      const link = document.createElement("a");
      const blobData = new Blob([content], {
        type: "application/vnd.ms-excel;charset=utf-8;",
      });
      link.download = fileName;
      link.href = URL.createObjectURL(blobData);
      link.click();
    })
    .catch(() => {
      /* do nothing */
    });
};

export const exportExcelWithColumns = (
  props: ExportExcelWithColumnsProps
): void => {
  const {
    fileName,
    sheetName,
    headers,
    data,
    timeZone = defaultTimeZone,
    defaultDateFormat = "dd/MM/yyyy HH:mm:ss",
  } = props;
  const columns = headers.map((col) => ({
    name: col.text,
    format: col.format,
  }));
  const rows = data.map((row) =>
    headers.map((col) => {
      if (typeof col.accessor === "function") {
        return col.accessor(row);
      }
      if (isDate(row[col.accessor])) {
        return formatInTimeZone(
          row[col.accessor],
          timeZone,
          col.format ?? defaultDateFormat
        );
      }
      return row[col.accessor] ?? "";
    })
  );

  exportExcelWithRawFormat({
    fileName,
    sheetName,
    columns,
    rows,
  });
};
