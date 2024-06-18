import { SortByFn } from "react-table";

// default datetime sorting somehow cannot accept nullish value
const dateTimeSorting: SortByFn<any> = (rowA, rowB, columnId) => {
  const a = rowA.values[columnId] as Date;
  const b = rowB.values[columnId] as Date;

  if (a > b) {
    return 1;
  }

  if (a < b) {
    return -1;
  }

  return 0;
};

export default dateTimeSorting;
