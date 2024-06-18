import { Row } from "react-table";

import dateTimeSorting from "./dateTimeSorting";

test("dateTimeSorting", () => {
  const mockRowA: Row<any> = {
    values: {
      test: new Date("2012-02-01"),
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
      test: new Date("2012-03-01"),
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
  expect(dateTimeSorting(mockRowA, mockRowB, "test")).toEqual(-1);
  expect(dateTimeSorting(mockRowB, mockRowA, "test")).toEqual(1);
  expect(dateTimeSorting(mockRowA, mockRowA, "test")).toEqual(0);
});
