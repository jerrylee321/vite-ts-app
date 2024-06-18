import {
  mapTableStateToAPIPaginationRequest,
  mapTableStateToAPIUamPaginationRequest,
  selectedItems,
  selectedRowCount,
} from "./datatable";

const data = [
  {
    id: "1",
  },
  {
    id: "2",
  },
  {
    id: "3",
  },
];

test("select data rows", () => {
  const selectedData = selectedItems(data, {
    2: true,
    0: true,
  });

  expect(selectedData).toHaveLength(2);
  expect(selectedData[0]).toMatchObject({ item: { id: "1" }, index: 0 });
  expect(selectedData[1]).toMatchObject({ item: { id: "3" }, index: 2 });
});

test("select null data rows", () => {
  const selectedData = selectedItems(data, null);

  expect(selectedData).toHaveLength(0);
});

test("select count", () => {
  expect(
    selectedRowCount({
      2: true,
      0: true,
    })
  ).toEqual(2);
  expect(selectedRowCount(null)).toEqual(0);
});

describe("mapTableStateToAPIPaginationRequest", () => {
  test("map null", () => {
    expect(mapTableStateToAPIPaginationRequest(null)).toEqual({});
  });
  test("map pageIndex", () => {
    expect(mapTableStateToAPIPaginationRequest({ pageIndex: 1 })).toEqual({
      page: 2,
    });
  });
  test("map pageSize", () => {
    expect(mapTableStateToAPIPaginationRequest({ pageSize: 50 })).toEqual({
      pageSize: 50,
    });
  });
  test("map sortBy", () => {
    expect(
      mapTableStateToAPIPaginationRequest({ sortBy: [{ id: "id" }] })
    ).toEqual({
      sort: [{ id: "id" }],
    });
  });
});

describe("mapTableStateToAPIUamPaginationRequest", () => {
  test("map null", () => {
    expect(mapTableStateToAPIUamPaginationRequest(null)).toEqual({});
  });
  test("map pageIndex", () => {
    expect(mapTableStateToAPIUamPaginationRequest({ pageIndex: 1 })).toEqual({
      pageNo: 2,
    });
  });
  test("map pageSize", () => {
    expect(mapTableStateToAPIUamPaginationRequest({ pageSize: 50 })).toEqual({
      pageSize: 50,
    });
  });
  test("map sortBy", () => {
    expect(
      mapTableStateToAPIUamPaginationRequest({ sortBy: [{ id: "id" }] })
    ).toEqual({
      sort: [{ id: "id" }],
    });
  });
});
