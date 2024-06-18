import React from "react";
import {
  ColumnInstance,
  defaultColumn,
  defaultOrderByFn,
  Hooks,
  Row,
  SortByFn,
  SortingRule,
  TableInstance,
} from "react-table";

import * as sortTypes from "../utils/dataTableSortTypes";

defaultColumn.sortType = "alphanumeric";
defaultColumn.sortDescFirst = false;

function maybeSortFunction<D extends object>(a: any): SortByFn<D> | null {
  return typeof a === "function" ? a : null;
}

/**
 * The purpose of this plugin is to keep a default ordering in the row object.
 *
 * Keeping a default ordering allow showing how a row is positioned relative to
 * other rows, while keeping the sorting order independent.
 */
/* istanbul ignore next */
export const useDefaultOrdering = <D extends object>(hooks: Hooks<D>): void => {
  hooks.useInstance.push(useInstance);
};

useDefaultOrdering.pluginName = "useDefaultOrdering";

export interface DefaultOrderingRule<D extends object> extends SortingRule<D> {
  sortByFn?: SortByFn<D>;
}

export interface UseDefaultOrderingRowProps {
  defaultOrderingIndex?: number;
}

export interface UseDefaultOrderingInstanceProps<D extends object> {
  defaultOrderingRows?: Row<D>[];
  defaultOrderingFlatRows?: Row<D>[];
}

type DefaultOrderingProps<D extends object> = TableInstance<D> & {
  defaultOrderingSortBy: Array<DefaultOrderingRule<D>>;
};

/* istanbul ignore next */
const findSortMethod = <D extends object>(
  allColumns: Array<ColumnInstance<D>>,
  userSortTypes: Record<string, SortByFn<D>>,
  sort: DefaultOrderingRule<D>
) => {
  // Support custom sorting methods for each column
  const column = allColumns.find((d) => d.id === sort.id);

  if (!column) {
    throw new Error(
      `React-Table: Could not find a column with id: ${sort.id} while sorting`
    );
  }

  const { sortType } = column;

  if (!sortType) {
    throw new Error(
      `Could not find a valid sortType of '${sortType}' for column '${sort.id}'.`
    );
  }

  const allSortTypes = { ...sortTypes, ...userSortTypes } as Record<
    string,
    SortByFn<D>
  >;

  // Look up sortBy functions in this order:
  // column function
  // column string lookup on user sortType
  // column string lookup on built-in sortType
  // default function
  // default string lookup on user sortType
  // default string lookup on built-in sortType
  const sortMethod: SortByFn<D> | undefined =
    sort.sortByFn ??
    maybeSortFunction(sortType) ??
    (typeof sortType === "string" ? allSortTypes[sortType] : undefined) ??
    undefined;

  if (!sortMethod) {
    throw new Error(
      `Could not find a valid sortType of '${sortType.toString()}' for column '${
        sort.id
      }'.`
    );
  }

  return sortMethod;
};

/* istanbul ignore next */
function useInstance<D extends object>(instance: TableInstance<D>) {
  const {
    rows,
    flatRows,
    allColumns,
    sortTypes: userSortTypes,
    defaultOrderingSortBy: sortBy,
  } = instance as DefaultOrderingProps<D>;

  const [sortedRows, sortedFlatRows] = React.useMemo(() => {
    if (!sortBy.length) {
      return [rows, flatRows];
    }

    const sortedFlatRowsResults: Row<D>[] = [];

    // Filter out sortBys that correspond to non existing columns
    const availableSortBy = sortBy.filter((sort) =>
      allColumns.find((col) => col.id === sort.id)
    );

    const sortData = (rowsList: Row<D>[]) => {
      // Use the orderByFn to compose multiple sortBy's together.
      // This will also perform a stable sorting using the row index
      // if needed.
      const sortedData = defaultOrderByFn(
        rowsList,
        availableSortBy.map((sort) => {
          const sortMethod = findSortMethod(allColumns, userSortTypes, sort);

          // Return the correct sortFn.
          // This function should always return in ascending order
          return (a: Row<D>, b: Row<D>) => sortMethod(a, b, sort.id, sort.desc);
        }),
        // Map the directions
        availableSortBy.map((sort) => {
          // Detect and use the sortInverted option
          const column = allColumns.find((d) => d.id === sort.id);

          if (column?.sortInverted) {
            return !!sort.desc;
          }

          return !sort.desc;
        })
      );

      // If there are sub-rows, sort them
      sortedData.forEach((row: Row<D>, index: number) => {
        sortedFlatRowsResults.push(row);
        Object.assign(row, {
          defaultOrderingIndex: index,
        });

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (row.subRows?.length === 0) {
          return;
        }
        row.subRows = sortData(row.subRows);
      });

      return sortedData;
    };

    return [sortData(rows), sortedFlatRowsResults];
  }, [sortBy, rows, flatRows, allColumns, userSortTypes]);

  Object.assign(instance, {
    defaultOrderingRows: sortedRows,
    rows: sortedRows,
    flatRows: sortedFlatRows,
    defaultOrderingFlatRows: sortedFlatRows,
  });
}
