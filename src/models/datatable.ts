import { Key as ReactKey } from "react";
import { TableState as ReactTableTableState } from "react-table";

export type TableState = Partial<
  Pick<ReactTableTableState, "pageSize" | "pageIndex" | "sortBy">
>;

export type SetTableStateFn = (state: TableState) => void;

export interface PageData {
  page: number;
  pageSize: number;
  pageRecords: number;
  totalPages: number;
  totalRecords: number;
}

interface ReactKeyProps {
  key: ReactKey;
}

export const getKeyProps = <Type extends object>(
  data: Type,
  fieldName: keyof Type | undefined
): ReactKeyProps | undefined => {
  if (!fieldName) {
    return undefined;
  }

  const key = data[fieldName];
  return typeof key === "string" || typeof key === "number"
    ? { key }
    : undefined;
};
