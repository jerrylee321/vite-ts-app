import { Column } from "react-table";

import { LookupFn } from "../types/lookup";

export const applyLookupColumns = <T extends object>(
  columns: Column<T>[],
  lookups: Record<string, LookupFn | undefined>
): Column<T>[] => {
  return columns.map((c) => {
    const id = c.id ?? (typeof c.accessor === "string" ? c.accessor : null);
    if (id && lookups[id]) {
      return { ...c, lookup: lookups[id] };
    }
    return c;
  });
};
