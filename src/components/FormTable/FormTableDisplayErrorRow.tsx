import { JSXElementConstructor, ReactElement } from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
import cn from "classnames";
import { useFormikContext } from "formik";

import useLocalizedErrors from "../../hooks/useLocalizedErrors";
import {
  getFieldArrayItemError,
  hasFieldArrayError,
} from "../../utils/getFieldArrayItemError";
import { DataTableCell } from "../DataTable/DataTableCell";
import { DataTableRowProps } from "../DataTable/DataTableRow";

export interface FormTableDisplayErrorRowProps<
  FormTableType extends object,
  FormTableName extends keyof FormTableType,
  Type extends object = FormTableType[FormTableName][]
> extends DataTableRowProps<Type> {
  formTableName: FormTableName;
}

export const FormTableDisplayErrorRow = <
  FormTableType extends object,
  FormTableName extends keyof FormTableType,
  Type extends object = FormTableType[FormTableName][]
>({
  row,
  className,
  formTableName,
  cellClassName,
  ...rest
}: FormTableDisplayErrorRowProps<
  FormTableType,
  FormTableName,
  Type
>): ReactElement => {
  const { errors } = useFormikContext<FormTableType>();

  const localizedErrors = useLocalizedErrors(errors);

  return (
    <>
      <TableRow {...rest} className={cn("group cursor-auto", className)}>
        {row.cells.map((cell) => {
          return (
            // NOTE: cell.getCellProps() returns { key }, but eslint/typescript
            // still complain lacks of key prop.
            /* eslint-disable-next-line react/jsx-key */
            <DataTableCell
              {...cell.getCellProps()}
              cell={cell}
              className={cn(cellClassName, "!pb-0")}
            />
          );
        })}
      </TableRow>
      {hasFieldArrayError(
        localizedErrors[formTableName] as Type[],
        row.index
      ) ? (
        <TableRow>
          {row.cells.map((cell) => {
            const fieldErrors = getFieldArrayItemError<Type>(
              localizedErrors[formTableName] as Type[],
              row.index,
              cell.column.id as Extract<keyof Type, string>
            );
            const helperText =
              typeof fieldErrors === "string" ? fieldErrors : null;
            return (
              // NOTE: cell.getCellProps() returns { key }, but eslint/typescript
              // still complain lacks of key prop.
              /* eslint-disable-next-line react/jsx-key */
              <TableCell className="!pt-0 !align-top" {...cell.getCellProps()}>
                <Typography className="relative -top-4 translate-y-4 text-xs text-error-main">
                  {helperText}
                </Typography>
              </TableCell>
            );
          })}
        </TableRow>
      ) : null}
    </>
  );
};

export const withFormTableDisplayErrorRowFormTableName = <
  FormTableType extends object,
  FormTableName extends keyof FormTableType,
  Type extends object = FormTableType[FormTableName][]
>(
  formTableName: FormTableName
): JSXElementConstructor<DataTableRowProps<Type>> => {
  return (props: DataTableRowProps<Type>) => {
    return (
      <FormTableDisplayErrorRow<FormTableType, FormTableName, Type>
        {...props}
        formTableName={formTableName}
      />
    );
  };
};
