import { IdType } from "react-table";

import { APIPaginationRequest } from "../apis/PaginationAPI";
import { APIUamPaginationRequest } from "../apis/UamPaginationAPI";
import { TableState } from "../models/datatable";

export interface SelectedItem<Type extends object> {
  index: number;
  item: Type;
}

export const selectedItems = <Type extends object>(
  data: Type[],
  selectedRowIds: Record<IdType<Type>, boolean> | null | undefined
): SelectedItem<Type>[] => {
  if (!selectedRowIds) return [];
  return Object.keys(selectedRowIds)
    .map((rowId) => parseInt(rowId, 10))
    .map((index) => ({
      item: data[index],
      index,
    }));
};

export const selectedRowCount = <Type extends object>(
  selectedRowIds: Record<IdType<Type>, boolean> | null | undefined
): number => {
  if (!selectedRowIds) return 0;
  return Object.values(selectedRowIds).filter((v) => !!v).length;
};

// page starts from 1
export const mapTableStateToAPIPaginationRequest = (
  tableState?: TableState | null
): APIPaginationRequest => {
  const { pageSize, pageIndex, sortBy } = tableState ?? {};
  return {
    ...(pageSize != null ? { pageSize } : undefined),
    ...(pageIndex != null ? { page: pageIndex + 1 } : undefined),
    ...(sortBy != null ? { sort: sortBy } : undefined),
  };
};

// pageNo starts from 0
export const mapTableStateToAPIUamPaginationRequest = (
  tableState?: TableState | null
): APIUamPaginationRequest => {
  const { pageSize, pageIndex, sortBy } = tableState ?? {};
  return {
    ...(pageSize != null ? { pageSize } : undefined),
    ...(pageIndex != null ? { pageNo: pageIndex + 1 } : undefined),
    ...(sortBy != null ? { sort: sortBy } : undefined),
  };
};
