import { SetTableStateFn, TableState } from "../models/datatable";

export interface DataTableSectionStateProps {
  tableState?: TableState | null;
  onTableStateChange?: SetTableStateFn;
}
