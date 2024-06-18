import { useMemo } from "react";
import { ensurePluginOrder, Hooks, Row, TableInstance } from "react-table";

function useInstance<D extends object>(instance: TableInstance<D>) {
  const { rows, flatRows, plugins, pinnedRowIds = new Set() } = instance;

  ensurePluginOrder(
    plugins,
    [
      "useFilters",
      "useGlobalFilter",
      "useGroupBy",
      "usePivotColumns",
      "useSortBy",
    ],
    "usePinBy"
  );

  const pinnedRows = useMemo(() => {
    const _pinnedRowIds = Array.from(pinnedRowIds);

    const pinRows = rows.reduce<Row<D>[]>((prev, row) => {
      if (_pinnedRowIds.includes(row.index)) {
        return [...prev, row];
      }

      return prev;
    }, []);

    const nonPinRows = rows.filter((row) => !_pinnedRowIds.includes(row.index));

    return [...pinRows, ...nonPinRows];
  }, [pinnedRowIds, rows]);

  Object.assign(instance, {
    prePinnedRows: rows,
    prePinnededFlatRows: flatRows,
    pinnedRows: pinnedRows,
    pinnedFlatRows: pinnedRows,
    rows: pinnedRows,
    flatRows: pinnedRows,
  });
}

export const usePinBy = <D extends object = object>(hooks: Hooks<D>): void => {
  hooks.useInstance.push(useInstance);
};

usePinBy.pluginName = "usePinBy";
