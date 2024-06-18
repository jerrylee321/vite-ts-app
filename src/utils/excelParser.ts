import * as XLSX from "xlsx";
import z from "zod";

type Obj = { [key in string]: unknown };

interface CellOption<Field> {
  /**
   * Starts from 1
   */
  cellIndex: number;

  field: Field;
}

interface ParseOptions<Z extends z.ZodSchema> {
  /**
   * Starts from 1
   */
  worksheetIndex?: number;

  /**
   * Starts from 1
   */
  startRow?: number;

  cells: CellOption<keyof z.output<Z>>[];

  rowSchema: Z;
}

const defaultWorksheetIndex = 1;
const defaultStartRow = 1;

type Intermediate<T extends Obj> = Partial<{
  [key in keyof T]: unknown;
}>;

export interface ResultSuccess<T> {
  result: "success";
  data: T;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
function ResultSuccess<T>(data: T): ResultSuccess<T> {
  return {
    result: "success",
    data,
  };
}

export function isResultSuccess<T>(
  result: Result<T>
): result is ResultSuccess<T> {
  return result.result === "success";
}

export interface ResultError {
  result: "error";
  error: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
function ResultError(error: unknown): ResultError {
  return {
    result: "error",
    error,
  };
}

export function isResultError<T>(result: Result<T>): result is ResultError {
  return result.result === "error";
}

export type Result<T> = ResultSuccess<T> | ResultError;

export async function readFile(
  file: File,
  opts?: XLSX.ParsingOptions
): Promise<XLSX.WorkBook> {
  return XLSX.read(await file.arrayBuffer(), opts);
}

async function parse<Z extends z.ZodSchema, T extends z.output<Z>>(
  workbook: XLSX.WorkBook,
  options: ParseOptions<Z>
): Promise<Result<T>[]> {
  const worksheetIndex = options.worksheetIndex ?? defaultWorksheetIndex;
  if (workbook.SheetNames.length < worksheetIndex) {
    return [];
  }
  const sheetName = workbook.SheetNames[worksheetIndex - 1];
  const worksheet = workbook.Sheets[sheetName];
  // https://docs.sheetjs.com/docs/api/utilities#array-output
  const jsons: unknown[][] = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    blankrows: false,
    defval: "",
    rawNumbers: false,
  });

  const intermediates: Intermediate<T>[] = [];
  for (
    let rowIndex = options.startRow ?? defaultStartRow;
    rowIndex <= jsons.length;
    rowIndex++
  ) {
    const row = jsons[rowIndex - 1];
    const intermediate: Intermediate<T> = {};
    for (const cellOption of options.cells) {
      const cell = row[cellOption.cellIndex - 1];
      intermediate[cellOption.field] = cell;
    }
    intermediates.push(intermediate);
  }

  const { rowSchema } = options;

  return Promise.all(
    intermediates.map(async (intermediate) =>
      rowSchema.parseAsync(intermediate).then(ResultSuccess).catch(ResultError)
    )
  );
}

export default parse;
