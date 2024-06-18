import { Row } from "react-table";

import dateTimeRangeSorting from "./dateTimeRangeSorting";

test("dateTimeSorting", () => {
  const mockRowA: Row<any> = {
    values: {
      test1: [new Date("2012-02-01"), new Date("2012-04-01")],
      test2: [new Date("2012-03-01"), new Date("2012-04-01")],
    },
    cells: [],
    allCells: [],
    getRowProps: jest.fn(),
    index: 0,
    original: undefined,
    id: "",
    subRows: [],
    isExpanded: false,
    canExpand: false,
    toggleRowExpanded: jest.fn(),
    getToggleRowExpandedProps: jest.fn(),
    depth: 0,
    isGrouped: false,
    groupByID: "",
    groupByVal: "",
    leafRows: [],
    isSelected: false,
    isSomeSelected: false,
    toggleRowSelected: jest.fn(),
    getToggleRowSelectedProps: jest.fn(),
    setState: jest.fn(),
    state: {},
  };

  const mockRowB: Row<any> = {
    values: {
      test1: [new Date("2012-02-01"), new Date("2012-04-02")],
      test2: [new Date("2012-02-01"), new Date("2012-04-02")],
    },
    cells: [],
    allCells: [],
    getRowProps: jest.fn(),
    index: 0,
    original: undefined,
    id: "",
    subRows: [],
    isExpanded: false,
    canExpand: false,
    toggleRowExpanded: jest.fn(),
    getToggleRowExpandedProps: jest.fn(),
    depth: 0,
    isGrouped: false,
    groupByID: "",
    groupByVal: "",
    leafRows: [],
    isSelected: false,
    isSomeSelected: false,
    toggleRowSelected: jest.fn(),
    getToggleRowSelectedProps: jest.fn(),
    setState: jest.fn(),
    state: {},
  };
  expect(dateTimeRangeSorting(mockRowA, mockRowB, "test1")).toEqual(-1);
  expect(dateTimeRangeSorting(mockRowB, mockRowA, "test1")).toEqual(1);
  expect(dateTimeRangeSorting(mockRowA, mockRowB, "test2")).toEqual(1);
  expect(dateTimeRangeSorting(mockRowB, mockRowA, "test2")).toEqual(-1);
  expect(dateTimeRangeSorting(mockRowA, mockRowA, "test1")).toEqual(0);
});
