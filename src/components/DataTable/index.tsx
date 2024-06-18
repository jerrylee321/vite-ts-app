import React, {
  JSXElementConstructor,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import isDeepEqual from "react-fast-compare";
import { Trans, useTranslation } from "react-i18next";
import {
  Column,
  HeaderGroup,
  IdType,
  TableState,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import cn from "classnames";
import SimpleBar from "simplebar-react";

import PaginationControl from "../../components/PaginationControl";
import { itemsPerPageOptions } from "../../constants/table";
import {
  useCheckboxSelect,
  UseCheckboxSelectProps,
} from "../../hooks/useCheckboxSelect";
import {
  DefaultOrderingRule,
  useDefaultOrdering,
} from "../../hooks/useDefaultOrdering";
import useExportTableExcel from "../../hooks/useExportTableExcel";
import useSequenceColumn from "../../hooks/useSequenceColumn";
import { getKeyProps, PageData } from "../../models/datatable";
import { usePinBy } from "../../react-table/usePinBy";
import {
  SelectedItem,
  selectedItems,
  selectedRowCount,
} from "../../utils/datatable";
import QuickSearch from "../QuickSearch";

import { ACTION_COLUMN_ID } from "./const";
import {
  DataTableRow as DefaultDataTableRow,
  DataTableRowProps,
} from "./DataTableRow";
import DefaultCell from "./DefaultCell";
import DefaultHeader from "./DefaultHeader";
import DefaultLoadingView from "./DefaultLoadingView";
import { dataTable, dataTableSortLabel } from "./index.module.scss";

interface DataTableHeaderCellProps<Type extends object> {
  column: HeaderGroup<Type>;
  isSortEnabled: boolean;
  required?: boolean;
  isDividerHighlighted: boolean;
}

/* eslint-disable react/jsx-key */
/* NOTE: key prop provided by {...getXXXProps()} */

const DataTableHeaderCell = <Type extends object>(
  props: DataTableHeaderCellProps<Type>
): ReactElement => {
  const { column, isSortEnabled, required, isDividerHighlighted } = props;

  const sortDirection = useMemo(() => {
    if (!column.isSorted) {
      return "desc";
    }
    return column.isSortedDesc ? "desc" : "asc";
  }, [column.isSorted, column.isSortedDesc]);

  return (
    <TableCell
      {...column.getHeaderProps(
        isSortEnabled ? column.getSortByToggleProps() : undefined
      )}
      className={cn(
        "bg-common-white  border-0 border-solid  align-bottom leading-5 font-black",
        {
          "sticky right-0 z-10": column.id === ACTION_COLUMN_ID,
          "sticky left-0 z-10 pb-0": column.id === "selection",
          "pb-3": column.id !== "selection",
          "border-b-[.0625rem] border-b-gray-main": !isDividerHighlighted,
          "border-b-4 border-b-secondary-main": isDividerHighlighted,
        },
        column.headerCellClassName
      )}
      data-testid={column.id}
    >
      {column.id === "selection" ||
      column.id === ACTION_COLUMN_ID ||
      !isSortEnabled ||
      column.disableSortBy ? (
        <>
          {column.render("Header")}
          {required ? <span className="ml-1 text-error-main">*</span> : null}
        </>
      ) : (
        <TableSortLabel
          active={column.isSorted}
          direction={sortDirection}
          className={cn(
            dataTableSortLabel,
            "flex items-end align-text-bottom leading-4 text-independence-main"
          )}
        >
          {column.render("Header")}
          {required ? <span className="ml-1 text-error-main">*</span> : null}
        </TableSortLabel>
      )}
    </TableCell>
  );
};

export interface DataTableProps<
  Type extends object,
  StateType extends object = object
> {
  header?: ReactNode;
  tableClassName?: string;
  columns: Column<Type>[];
  requiredColumns?: Set<string>;
  data: Type[] | undefined;
  initState?: Partial<TableState<StateType>> | null;
  onStateChange?: (state: Partial<TableState<StateType>>) => void;
  isSortEnabled?: boolean;
  isSelectEnabled?: boolean;
  isPaginationEnabled?: boolean;
  isPaginationPageSizeControlEnabled?: boolean;
  isQuickSearchEnabled?: boolean;
  isExportEnabled?: boolean;
  isExportFullListEnabled?: boolean;
  isDeleteEnabled?: boolean;
  isAddItemEnabled?: boolean;
  isSequenceColumnEnabled?: boolean;
  useCheckboxSelectProps?: UseCheckboxSelectProps<Type>;
  emptyDataDisplayString?: string;
  isLoading?: boolean;
  loadingComponent?: ReactNode;
  onDeleteItems?: (data: SelectedItem<Type>[]) => void;
  onAddItem?: () => void;
  "data-testid"?: string;
  pinnedRowIds?: Set<number>;
  defaultOrderingSortBy?: Readonly<Array<DefaultOrderingRule<Type>>>;
  hiddenColumns?: IdType<Type>[];
  isHeaderDividerHighlighted?: boolean;
  manualSortBy?: boolean;
  manualPagination?: boolean;
  pageData?: PageData;
  /**
   * If specified, the specified field in the data will be used as a react key.
   * Otherwise a react key will be derived from the row index.
   */
  reactKeyFieldName?: keyof Type;
  isCustomScrollBarEnabled?: boolean;
  DataTableRow?: JSXElementConstructor<DataTableRowProps<Type>>;
}

export const defaultDataTableInitState = Object.freeze({
  pageSize: 50,
  pageIndex: 0,
  sortBy: [],
});

interface Props<Type extends object> extends DataTableProps<Type> {
  className?: string;
}

/* eslint-disable sonarjs/cognitive-complexity */
// eslint-disable-next-line complexity
const DataTable = <Type extends object>(
  props: PropsWithChildren<Props<Type>>
): ReactElement => {
  const { t } = useTranslation();

  const {
    className,
    header,
    tableClassName,
    columns,
    requiredColumns,
    initState,
    onStateChange,
    isQuickSearchEnabled = true,
    isSortEnabled = true,
    isPaginationEnabled = true,
    isPaginationPageSizeControlEnabled = true,
    isSelectEnabled = true,
    isExportEnabled = true,
    isExportFullListEnabled = false,
    isDeleteEnabled = false,
    isAddItemEnabled = false,
    isSequenceColumnEnabled = false,
    isHeaderDividerHighlighted = false,
    useCheckboxSelectProps,
    onDeleteItems,
    onAddItem,
    emptyDataDisplayString = t("DataTable.status.noDataFound"),
    isLoading = false,
    loadingComponent = <DefaultLoadingView />,
    children,
    "data-testid": dataTestId = "dataTable",
    pinnedRowIds = new Set(),
    defaultOrderingSortBy,
    hiddenColumns = [],
    manualSortBy,
    manualPagination,
    pageData,
    reactKeyFieldName,
    isCustomScrollBarEnabled = true,
    DataTableRow = DefaultDataTableRow,
  } = props;

  const data = useMemo(() => props.data ?? [], [props.data]);

  const initialState: Partial<TableState<Type>> = {
    ...defaultDataTableInitState,
    ...initState,
  };

  const tableInstance = useTable(
    {
      columns,
      data,
      manualGlobalFilter: true,
      initialState,
      defaultColumn: {
        Header: DefaultHeader,
        Cell: DefaultCell<Type>,
      },
      // required to avoid max update dep error
      // ref: https://github.com/TanStack/table/issues/2369#issuecomment-644481605
      autoResetFilters: false,
      autoResetPage: false,
      autoResetSortBy: false,
      autoResetHiddenColumns: false,
      pinnedRowIds,
      defaultOrderingSortBy,
      manualPagination,
      manualSortBy,
      ...(manualPagination
        ? {
            // Must not specify pageCount if manualPagination=false, even if the
            // value of pageCount is set to undefined.
            pageCount: pageData?.totalPages ?? 0,
          }
        : undefined),
      useCheckboxSelectProps,
    },
    ...(isQuickSearchEnabled ? [useGlobalFilter] : []),
    ...(defaultOrderingSortBy ? [useDefaultOrdering] : []),
    ...(isSortEnabled ? [useSortBy] : []),
    usePinBy,
    ...(isPaginationEnabled ? [usePagination] : []),
    ...(isSequenceColumnEnabled ? [useSequenceColumn<Type>] : []),
    ...(isSelectEnabled ? [useRowSelect, useCheckboxSelect] : [])
  );

  const tableInstanceStateRef = useRef(tableInstance.state);
  /* istanbul ignore next */
  useEffect(() => {
    // Prevent unnecessary calling of onStateChange.
    if (!isDeepEqual(tableInstanceStateRef.current, tableInstance.state)) {
      onStateChange?.({ ...tableInstance.state }); // copy
      tableInstanceStateRef.current = tableInstance.state;
    }
  }, [tableInstance.state, onStateChange]);

  const memoHiddenColumns = useMemo(() => {
    return hiddenColumns;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...hiddenColumns]);

  /* istanbul ignore next */
  useEffect(() => {
    tableInstance.setHiddenColumns(memoHiddenColumns);
  }, [tableInstance, memoHiddenColumns]);

  const excelColumns = useMemo(
    () => columns.filter((col) => col.id !== ACTION_COLUMN_ID),
    [columns]
  );

  const allRowIds = useMemo(() => {
    const rowIds: Record<IdType<Type>, boolean> = {} as Record<
      IdType<Type>,
      boolean
    >;
    for (const row of tableInstance.flatRows) {
      rowIds[row.id as IdType<Type>] = true;
    }
    return rowIds;
  }, [tableInstance.flatRows]);

  const exportExcel = useExportTableExcel({
    columns: excelColumns,
    data: data,
    selectedRowIds: tableInstance.state.selectedRowIds,
  });

  const exportExcelFullList = useExportTableExcel({
    columns: excelColumns,
    data: data,
    selectedRowIds: allRowIds,
  });

  const deleteItems = useCallback(() => {
    onDeleteItems?.(selectedItems(data, tableInstance.state.selectedRowIds));
  }, [data, onDeleteItems, tableInstance.state.selectedRowIds]);

  const addItem = useCallback(() => {
    onAddItem?.();
  }, [onAddItem]);

  const tableBodyReference = useMemo(() => {
    const displayedRows = isPaginationEnabled
      ? tableInstance.page
      : tableInstance.rows;

    return displayedRows;
  }, [isPaginationEnabled, tableInstance.page, tableInstance.rows]);

  const isActionRowHidden = useMemo(() => {
    return (
      !isQuickSearchEnabled &&
      !isPaginationEnabled &&
      !isExportEnabled &&
      !isDeleteEnabled
    );
  }, [
    isExportEnabled,
    isPaginationEnabled,
    isQuickSearchEnabled,
    isDeleteEnabled,
  ]);

  const hasTableFooter = useMemo((): boolean => {
    return columns.some((it) => it.Footer != null);
  }, [columns]);

  const hasSelectedRows = useMemo((): boolean => {
    // NOTE: During test, the selected rows are not properly registered.
    // Disabling the export / select button will cause lots of test failures.
    // Hence, the button is not disabled for testing.
    return selectedRowCount(tableInstance.state.selectedRowIds) > 0;
  }, [tableInstance.state.selectedRowIds]);

  let table = (
    <Table
      size="small"
      {...tableInstance.getTableProps()}
      className={cn(dataTable, "border-separate", tableClassName, {
        "opacity-50 pointer-events-none": isLoading,
      })}
    >
      <TableHead>
        {tableInstance.headerGroups.map((headerGroup) => (
          <TableRow
            {...headerGroup.getHeaderGroupProps()}
            className="relative"
            data-testid="headerRow"
          >
            {headerGroup.headers.map((column) => (
              <DataTableHeaderCell<Type>
                {...column.getHeaderProps()}
                isDividerHighlighted={isHeaderDividerHighlighted}
                column={column}
                isSortEnabled={isSortEnabled}
                required={requiredColumns?.has(column.id)}
              />
            ))}
          </TableRow>
        ))}
      </TableHead>
      {tableBodyReference.length > 0 ? (
        <>
          <TableBody {...tableInstance.getTableBodyProps()}>
            {tableBodyReference.map((row) => {
              tableInstance.prepareRow(row);
              const isPinnedRow = Array.from(pinnedRowIds).some(
                (value) => value === row.index
              );
              return (
                <DataTableRow
                  {...row.getRowProps()}
                  {...getKeyProps(row.original, reactKeyFieldName)}
                  data-testid="dataTable.body.row"
                  row={row}
                  cellClassName={
                    isPinnedRow ? "bg-error-lightSecondary" : "bg-white"
                  }
                />
              );
            })}
          </TableBody>
          {hasTableFooter ? (
            <TableFooter>
              {tableInstance.footerGroups.map((footerGroup) => (
                <TableRow
                  {...footerGroup.getFooterGroupProps()}
                  className="relative"
                  data-testid="footerRow"
                >
                  {footerGroup.headers.map((column) => (
                    <TableCell
                      {...column.getFooterProps()}
                      className={cn("py-3 border-none")}
                    >
                      {column.render("Footer")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableFooter>
          ) : null}
        </>
      ) : null}
    </Table>
  );

  if (isCustomScrollBarEnabled) {
    table = <SimpleBar autoHide={true}>{table}</SimpleBar>;
  }

  return (
    <div data-testid={dataTestId} className={className}>
      <div className={cn("flex", { hidden: isActionRowHidden })}>
        {header}
        <div className="flex grow items-center">
          {isExportEnabled ? (
            <Button
              variant="outlined"
              className="mr-4 rounded-full border-2"
              onClick={exportExcel}
              data-testid="ExportExcelButton"
              disabled={!hasSelectedRows}
            >
              <Trans i18nKey="DataTable.exportItems" />
            </Button>
          ) : null}
          {isExportFullListEnabled ? (
            <Button
              variant="outlined"
              className="rounded-full border-2"
              onClick={exportExcelFullList}
              data-testid="ExportFullExcelButton"
            >
              <Trans i18nKey="DataTable.exportFullList" />
            </Button>
          ) : null}
          {isDeleteEnabled ? (
            <Button
              variant="outlined"
              className="mr-4 rounded-full border-2 border-error-main text-error-main disabled:border-button-disabled-border disabled:text-button-disabled-color"
              onClick={deleteItems}
              data-testid="DeleteSelectedItemButton"
              disabled={!hasSelectedRows}
            >
              <Trans i18nKey="DataTable.deleteItems" />
            </Button>
          ) : null}
          {isAddItemEnabled ? (
            <Button
              variant="outlined"
              className="mr-4 rounded-full border-2 border-primary-main text-primary-main"
              onClick={addItem}
              data-testid="AddItemButton"
            >
              <Trans i18nKey="DataTable.addItem" />
            </Button>
          ) : null}
        </div>
        <div className="mb-6 flex flex-row items-center gap-4">
          {isQuickSearchEnabled ? (
            <QuickSearch
              setGlobalFilter={tableInstance.setGlobalFilter}
              pageIndex={tableInstance.pageIndex}
              className="mt-6"
            />
          ) : null}
          {isPaginationEnabled ? (
            <PaginationControl
              onPageChange={tableInstance.gotoPage}
              shouldShowItemsPerPage={isPaginationPageSizeControlEnabled}
              itemsPerPageOptions={itemsPerPageOptions}
              itemsPerPage={tableInstance.state.pageSize}
              onItemsPerPageChange={tableInstance.setPageSize}
              page={tableInstance.state.pageIndex}
              totalPages={tableInstance.pageCount}
              canNextPage={tableInstance.canNextPage}
              canPreviousPage={tableInstance.canPreviousPage}
              disabled={isLoading}
            />
          ) : null}
        </div>
      </div>
      {children ? (
        <div className="mb-4 flex flex-row gap-4">{children}</div>
      ) : null}
      {table}
      {tableBodyReference.length === 0 && !isLoading ? (
        <Typography
          variant="body2"
          className="py-6 text-center"
          data-testid="noTableData"
        >
          {emptyDataDisplayString}
        </Typography>
      ) : null}
      {tableBodyReference.length === 0 && isLoading ? loadingComponent : null}
    </div>
  );
};

export default DataTable;
