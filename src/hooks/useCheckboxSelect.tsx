import { ChangeEvent, ReactElement, useCallback } from "react";
import { Trans, useTranslation } from "react-i18next";
import { CellProps, HeaderProps, Hooks } from "react-table";
import { Checkbox } from "@mui/material";

export interface UseCheckboxSelectProps<Type extends object> {
  onCheckedChange: (row: Type, checked: boolean) => void;
  onAllCheckedChange: (checked: boolean) => void;
}

const Header = <Type extends object>({
  getToggleAllRowsSelectedProps,
  useCheckboxSelectProps,
}: HeaderProps<Type>) => {
  const { t } = useTranslation();
  const toggleAllRowsSelectedProps = getToggleAllRowsSelectedProps();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      toggleAllRowsSelectedProps.onChange?.(event);
      useCheckboxSelectProps?.onAllCheckedChange(checked);
    },
    [toggleAllRowsSelectedProps, useCheckboxSelectProps]
  );

  return (
    <div className="flex flex-col items-center">
      <Trans i18nKey="DataTable.header.select" />
      <div>
        <Checkbox
          {...toggleAllRowsSelectedProps}
          onChange={handleChange}
          aria-label={t("DataTable.action.selectAllRows.label")}
        />
      </div>
    </div>
  );
};

const Cell = <Type extends object>({
  row,
  useCheckboxSelectProps,
}: CellProps<Type>): ReactElement => {
  const { t } = useTranslation();

  const toggleRowSelectedProps = row.getToggleRowSelectedProps();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      toggleRowSelectedProps.onChange?.(event);
      useCheckboxSelectProps?.onCheckedChange(row.original, checked);
    },
    [row.original, toggleRowSelectedProps, useCheckboxSelectProps]
  );

  return (
    <div className="flex flex-col items-center">
      <Checkbox
        {...toggleRowSelectedProps}
        onChange={handleChange}
        aria-label={t("DataTable.action.selectRow.label", {
          index: row.index,
        })}
      />
    </div>
  );
};

// The checkbox column must be static, otherwise react table will
// re-render cells each time.
const CheckboxColumn = {
  id: "selection",
  i18nKey: null,
  Header,
  Cell,
};

export const useCheckboxSelect = <D extends object>(hooks: Hooks<D>): void => {
  hooks.visibleColumns.push((visibleColumns) => [
    CheckboxColumn,
    ...visibleColumns,
  ]);
};
