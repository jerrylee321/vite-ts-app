/* eslint-disable-next-line simple-import-sort/imports */
import path from "path";
import { isValid } from "date-fns";
import * as XLSX from "xlsx";
import z from "zod";

import parse from "./excelParser";

describe("excelParser", () => {
  test("should parse success", async () => {
    const workbook = XLSX.readFile(
      // eslint-disable-next-line no-undef
      path.join(__dirname, "./excelParser.test.xlsx"),
      { cellDates: true }
    );

    const parsed = await parse(workbook, {
      startRow: 2,
      rowSchema: z.object({
        userId: z.coerce.string(),
        userName: z.string(),
        userGroup: z.string(),
        companyName: z.string(),
        department: z.string(),
        email: z.string(),
        telNo: z.coerce.string(),
        effectiveDate: z.date().refine(isValid),
      }),
      cells: [
        {
          field: "userId",
          cellIndex: 1,
        },
        {
          field: "userName",
          cellIndex: 2,
        },
        {
          field: "userGroup",
          cellIndex: 3,
        },
        {
          field: "companyName",
          cellIndex: 4,
        },
        {
          field: "department",
          cellIndex: 5,
        },
        {
          field: "email",
          cellIndex: 6,
        },
        {
          field: "telNo",
          cellIndex: 7,
        },
        {
          field: "effectiveDate",
          cellIndex: 8,
        },
      ],
    });

    expect(parsed).toEqual([
      {
        result: "success",
        data: {
          companyName: "ABC Company Limited",
          department: "Human Resources Department",
          effectiveDate: new Date("2022-01-02"),
          email: "chantaiman@abc.com",
          telNo: "27272727",
          userGroup: "User Group A",
          userId: "1234567",
          userName: "Chan Tai Man",
        },
      },
    ]);
  });

  test("should parse failed", async () => {
    const workbook = XLSX.readFile(
      // eslint-disable-next-line no-undef
      path.join(__dirname, "./excelParser.test.xlsx")
    );

    const parsed = await parse(workbook, {
      startRow: 2,
      rowSchema: z.object({
        userId: z.coerce.string(),
        userName: z.string(),
        userGroup: z.string(),
        companyName: z.string(),
        department: z.string(),
        email: z.string(),
        telNo: z.coerce.string(),
        effectiveDate: z.string(),
      }),
      cells: [
        {
          field: "userId",
          cellIndex: 1,
        },
        {
          field: "userName",
          cellIndex: 2,
        },
        {
          field: "userGroup",
          cellIndex: 3,
        },
        {
          field: "companyName",
          cellIndex: 4,
        },
        {
          field: "department",
          cellIndex: 5,
        },
        {
          field: "email",
          cellIndex: 6,
        },
        {
          field: "telNo",
          cellIndex: 7,
        },
        {
          field: "effectiveDate",
          cellIndex: 100,
        },
      ],
    });

    expect(parsed).toEqual([
      {
        result: "error",
        error: new z.ZodError([
          {
            code: "invalid_type",
            expected: "string",
            received: "undefined",
            path: ["effectiveDate"],
            message: "Required",
          },
        ]),
      },
    ]);
  });
});
