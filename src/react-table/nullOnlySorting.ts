import { SortByFn } from "react-table";

// only consider if the value is null or not. null first
const nullOnlySorting: SortByFn<any> = (rowA, rowB, columnId) => {
  const a = rowA.values[columnId];
  const b = rowB.values[columnId];

  if (a === b) {
    return 0;
  }

  return a == null ? -1 : 1;
};

export default nullOnlySorting;
