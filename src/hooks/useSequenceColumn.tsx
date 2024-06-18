import { ReactElement } from "react";
import {
  CellProps,
  ensurePluginOrder,
  Hooks,
  TableInstance,
} from "react-table";

const Cell = <D extends object>({ row }: CellProps<D>): ReactElement => {
  // If `defaultOrderingIndex` is available, use it, otherwise use `index`.
  const { index, defaultOrderingIndex = index } = row;
  return <>{`${defaultOrderingIndex + 1}`}</>;
};

const SequenceColumn = {
  i18nKey: "DataTable.header.sequence" as const,
  id: "index",
  Cell,
  disableSortBy: true,
};

/* istanbul ignore next */
const useSequenceColumn = <D extends object>(hooks: Hooks<D>): void => {
  hooks.columns.push((columns) => [SequenceColumn, ...columns]);

  hooks.useInstance.push(useInstance);
};

useSequenceColumn.pluginName = "useSequenceColumn";

/* istanbul ignore next */
function useInstance<D extends object>(instance: TableInstance<D>) {
  const { plugins } = instance;

  ensurePluginOrder(plugins, ["useDefaultOrdering"], "useSequenceColumn");
}

export default useSequenceColumn;
