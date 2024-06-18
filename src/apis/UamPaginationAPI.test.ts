// NOTE: UamPaginationAPI is not imported by use queries hooks in frontend-common,
// so we have to add test cases here.

import {
  APIUamPaginationRequestSchema,
  APIUamPaginationResponseSchema,
  APIUamSortingRuleRequestSchema,
  mapAPIUamPaginationResponseToAPIPaginationResponse,
} from "./UamPaginationAPI";

describe("APIUamSortingRuleRequestSchema", () => {
  test("parse desc", () => {
    expect(APIUamSortingRuleRequestSchema.parse([{ id: "id" }])).toEqual([
      "+id",
    ]);
  });

  test("parse desc", () => {
    expect(
      APIUamSortingRuleRequestSchema.parse([{ id: "id", desc: true }])
    ).toEqual(["-id"]);
  });

  test("parse empty", () => {
    expect(APIUamSortingRuleRequestSchema.parse([])).toEqual(undefined);
  });
});

describe("APIUamPaginationRequestSchema", () => {
  test("parse", () => {
    expect(
      APIUamPaginationRequestSchema.parse({
        pageSize: 24,
        pageNo: 5,
        sort: [{ id: "id" }],
      })
    ).toEqual({ pageSize: 24, pageNo: 4, sort: ["+id"] });
  });
});

describe("APIUamPaginationResponseSchema", () => {
  test("parse", () => {
    expect(
      APIUamPaginationResponseSchema.parse({
        numberOfElements: 20,
        pageable: {
          pageNumber: 5,
          pageSize: 20,
        },
        totalPages: 10,
        totalElements: 200,
      })
    ).toEqual({
      numberOfElements: 20,
      pageable: {
        pageNumber: 5,
        pageSize: 20,
      },
      totalPages: 10,
      totalElements: 200,
    });
  });
});

describe("mapAPIUamPaginationResponseToAPIPaginationResponse", () => {
  it("should map correctly", () => {
    expect(
      mapAPIUamPaginationResponseToAPIPaginationResponse({
        numberOfElements: 1,
        pageable: {
          pageNumber: 2,
          pageSize: 3,
        },
        totalPages: 4,
        totalElements: 5,
      })
    ).toEqual({
      pageSize: 3,
      totalPages: 4,

      page: 3,
      pageRecords: 1,
      totalRecords: 5,
    });
    expect(
      mapAPIUamPaginationResponseToAPIPaginationResponse({
        numberOfElements: 1,
        pageable: "INSTANCE",
        totalPages: 4,
        totalElements: 5,
      })
    ).toEqual({
      pageSize: 1000,
      totalPages: 4,
      page: 1,
      pageRecords: 1,
      totalRecords: 5,
    });
  });
});
