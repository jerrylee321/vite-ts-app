import { PropsWithChildren, ReactElement, ReactNode, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Column } from "react-table";
import { ArrayHelpers, FieldArray } from "formik";

import useFormSubmissionState from "../../hooks/useFormSubmissionState";
import { isNonNullable } from "../../types/Nullable";
import { SelectedItem } from "../../utils/datatable";
import DataTable, { DataTableProps } from "../DataTable";
import MessageDialogWithActions from "../MessageDialogWithActions";

import makeInputCell from "./makeInputCell";

type ColumnWithOptions<T extends object> = Column<T> & {
  options?: {
    required?: boolean;
  };
};

export type FormTableColumnsGetter<
  RowModel extends object,
  FormModel extends object
> = (
  name: Extract<keyof FormModel, string>,
  arrayHelper: ArrayHelpers
) => ColumnWithOptions<RowModel>[];

interface FormTableProps<RowModel extends object, FormModel extends object>
  extends Omit<
    DataTableProps<RowModel>,
    "columns" | "isSortEnabled" | "isQuickSearchEnabled"
  > {
  name: Extract<keyof FormModel, string>;
  columnsGetter: FormTableColumnsGetter<RowModel, FormModel>;
  newItemValue?: RowModel | ((newRowIdx: number) => RowModel);
  showDeleteAlert?: boolean;
}

/**
 * Please do not use arrow function for editable cell in column definition, otherwise it will trigger the rerender everytime you change the value
 */
const FormTable = <RowModel extends object, FormModel extends object>(
  props: PropsWithChildren<FormTableProps<RowModel, FormModel>>
): ReactElement => {
  const {
    columnsGetter,
    name,
    newItemValue,
    showDeleteAlert = true,
    data = [],
    ...rest
  } = props;

  const { t } = useTranslation();

  const {
    submissionState: deleteRowSubmissionState,
    switchToStateTBC: deleteRowSwitchToStateTBC,
    switchToStateInitial: deleteRowSwitchToStateInitial,
  } = useFormSubmissionState<{ items: SelectedItem<RowModel>[] }, undefined>();

  const renderContent = useCallback(
    (arrayHelpers: ArrayHelpers): ReactNode => {
      const columns = columnsGetter(name, arrayHelpers);
      const requiredColumns = new Set(
        columns
          .filter((c) => c.options?.required === true)
          .map((c) => c.id)
          .filter(isNonNullable)
      );
      const onDeleteItems = (items: SelectedItem<RowModel>[]) => {
        items
          .map((item) => item.index)
          .sort((a, b) => b - a)
          .forEach((id) => arrayHelpers.remove(id));
      };
      const onAddItem = () => {
        const obj =
          typeof newItemValue === "function"
            ? newItemValue(data.length)
            : newItemValue ?? {};
        arrayHelpers.push(obj);
      };

      const handleRequestRemove = (items: SelectedItem<RowModel>[]) => {
        if (items.length > 0) {
          deleteRowSwitchToStateTBC({ items });
        }
      };

      const handleRemoveConfirm = () => {
        if (deleteRowSubmissionState.state === "toBeConfirmed") {
          onDeleteItems(deleteRowSubmissionState.requestData.items);
          deleteRowSwitchToStateInitial();
        }
      };
      return (
        <>
          <DataTable
            columns={columns}
            requiredColumns={requiredColumns}
            // eslint-disable-next-line react/jsx-no-bind
            onDeleteItems={
              showDeleteAlert ? handleRequestRemove : onDeleteItems
            }
            // eslint-disable-next-line react/jsx-no-bind
            onAddItem={onAddItem}
            isSortEnabled={false}
            isQuickSearchEnabled={false}
            data={data}
            {...rest}
          />
          <MessageDialogWithActions
            open={deleteRowSubmissionState.state === "toBeConfirmed"}
            onClose={deleteRowSwitchToStateInitial}
            icon="system-alert"
            buttons={[
              {
                text: t("FormTable.deleteRowDialog.back").toUpperCase(),
                style: "secondary",
              },
              {
                text: t("FormTable.deleteRowDialog.confirm").toUpperCase(),
                style: "important",
                onSelect: handleRemoveConfirm,
                stayOpen: true,
                "data-testid": "confirmDeleteButton",
              },
            ]}
            title={t("FormTable.deleteRowDialog.title")}
          />
        </>
      );
    },
    [
      columnsGetter,
      deleteRowSubmissionState,
      deleteRowSwitchToStateInitial,
      deleteRowSwitchToStateTBC,
      name,
      newItemValue,
      rest,
      showDeleteAlert,
      t,
      data,
    ]
  );

  return <FieldArray name={name} render={renderContent} />;
};

export { makeInputCell };
export default FormTable;
