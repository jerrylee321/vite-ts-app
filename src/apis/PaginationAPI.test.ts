// NOTE: PaginationAPI is not imported by use queries hooks in frontend-common,
// so we have to add test cases here.

import {
  APIPaginationRequestSchema,
  APIPaginationRequestTransformStringSchema,
  APIPaginationResponseSchema,
  APISortingRuleRequestSchema,
} from "./PaginationAPI";

describe("APISortingRuleRequestSchema", () => {
  test("parse desc", () => {
    expect(APISortingRuleRequestSchema.parse("id asc")).toEqual("id asc");
    expect(APISortingRuleRequestSchema.parse({ id: "id" })).toEqual("id asc");
    expect(APISortingRuleRequestSchema.parse([{ id: "id" }])).toEqual("id asc");
  });

  test("parse desc", () => {
    expect(APISortingRuleRequestSchema.parse("id desc")).toEqual("id desc");
    expect(APISortingRuleRequestSchema.parse({ id: "id", desc: true })).toEqual(
      "id desc"
    );
    expect(
      APISortingRuleRequestSchema.parse([{ id: "id", desc: true }])
    ).toEqual("id desc");
  });

  test("parse empty", () => {
    expect(APISortingRuleRequestSchema.parse([])).toEqual(undefined);
  });
});

describe("APIPaginationRequestSchema", () => {
  test("parse", () => {
    expect(
      APIPaginationRequestSchema.parse({
        pageSize: 24,
        page: 5,
        sort: { id: "id" },
      })
    ).toEqual({ pageSize: 24, page: 5, sort: "id asc" });
  });
});

describe("APIPaginationRequestTransformStringSchema", () => {
  test("parse", () => {
    expect(
      APIPaginationRequestTransformStringSchema.parse({
        pageSize: 24,
        page: 5,
        sort: { id: "id" },
      })
    ).toEqual({ pageSize: "24", page: "5", sort: "id asc" });
  });
});

describe("APIPaginationResponseSchema", () => {
  test("parse", () => {
    expect(
      APIPaginationResponseSchema.parse({
        page: 5,
        pageSize: 20,
        pageRecords: 20,
        totalRecords: 200,
        totalPages: 10,
      })
    ).toEqual({
      page: 5,
      pageSize: 20,
      pageRecords: 20,
      totalRecords: 200,
      totalPages: 10,
    });
  });
});
