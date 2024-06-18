import { SortByFn } from "react-table";

const dateTimeRangeSorting: SortByFn<any> = (rowA, rowB, columnId) => {
  const a = rowA.values[columnId] as [Date, Date];
  const b = rowB.values[columnId] as [Date, Date];

  if (a[0] > b[0]) {
    return 1;
  } else if (a[0] < b[0]) {
    return -1;
  }

  if (a[1] > b[1]) {
    return 1;
  } else if (a[1] < b[1]) {
    return -1;
  }

  return 0;
};

export default dateTimeRangeSorting;
