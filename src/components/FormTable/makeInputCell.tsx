import { ChangeEvent, ReactElement, useCallback, useMemo } from "react";
import { CellProps } from "react-table";
import { useFormikContext } from "formik";

import useLocalizedErrors from "../../hooks/useLocalizedErrors";
import { getFieldArrayItemError } from "../../utils/getFieldArrayItemError";
import FormInput, { FormTextFieldProps } from "../FormInput";

export const trimNumber = (v: string, decimalPlaces: number): string => {
  const [integral, decimal] = v.split(".") as [string, string | undefined];
  if (decimal == null) {
    return integral.replace(/^0+/, "");
  }
  const _integral = integral.replace(/^0+/, "");
  const _decimal = decimal.slice(0, decimalPlaces);

  return `${_integral}.${_decimal}`;
};

interface NumberInputOptions {
  disableHandleEmptyNumberInput: boolean;
  decimalPlaces: number;
}

const makeInputCell = <RowModel extends object, FormModel extends object>({
  type,
  formTableName,
  columnName,
  numberInputOptions = {
    disableHandleEmptyNumberInput: true,
    decimalPlaces: 2,
  },
  formInputProps,
}: {
  type: "text" | "number";
  formTableName: Extract<keyof FormModel, string>;
  columnName: Extract<keyof RowModel, string>;
  numberInputOptions?: NumberInputOptions;
  formInputProps?: FormTextFieldProps;
}) => {
  return ({ row }: CellProps<RowModel>): ReactElement => {
    const { handleBlur, values, errors, setFieldValue } =
      useFormikContext<FormModel>();

    const localizedErrors = useLocalizedErrors(errors);

    const handleChange = useCallback(
      (ev: ChangeEvent<HTMLInputElement>) => {
        if (type === "number") {
          setFieldValue(
            `${formTableName}[${row.index}].${columnName}`,
            // handle empty field as 0
            ev.target.value === "" &&
              !numberInputOptions.disableHandleEmptyNumberInput
              ? 0
              : parseFloat(
                  trimNumber(ev.target.value, numberInputOptions.decimalPlaces)
                )
          );
          return;
        }
        setFieldValue(
          `${formTableName}[${row.index}].${columnName}`,
          ev.target.value
        );
      },
      [row.index, setFieldValue]
    );

    const value = useMemo(() => {
      // remove leading zero in input
      if (type === "number") {
        return (
          (values[formTableName] as RowModel[])[row.index][columnName] as number
        ).toString();
      }
      return (values[formTableName] as RowModel[])[row.index][columnName];
    }, [row.index, values]);

    const fieldErrors = useMemo(
      () =>
        getFieldArrayItemError<RowModel>(
          localizedErrors[formTableName] as RowModel[],
          row.index,
          columnName
        ),
      [localizedErrors, row.index]
    );

    return (
      <div className="relative">
        <FormInput
          name={`${formTableName}[${row.index}].${columnName}`}
          data-testid={`${formTableName}[${row.index}].${columnName}`}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(fieldErrors)}
          type={type}
          inputProps={{
            min: 0,
            step: 0.01,
          }}
          {...formInputProps}
        />
      </div>
    );
  };
};

export default makeInputCell;
