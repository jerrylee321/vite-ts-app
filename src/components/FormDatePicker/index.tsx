import React, { ReactElement, useCallback } from "react";

import DatePicker, {
  DatePickerProps,
  ReactDatePickerFunctionParams,
} from "../DatePicker";

export interface FormDatePickerProps
  extends Omit<DatePickerProps, "onChange" | "name" | "value"> {
  name: string;
  value?: Date | null;
  "data-testid"?: string;
  showHelperTextOnTop?: boolean;
  showErrorIcon?: boolean;
  onChange: (name: string, value: ReactDatePickerFunctionParams) => void;
}
const FormDatePicker = (props: FormDatePickerProps): ReactElement => {
  const { name, value, onChange, dateFormat = "dd/MM/yyyy", ...rest } = props;

  const _onChange = useCallback(
    (newValue: ReactDatePickerFunctionParams) => {
      onChange(name, newValue);
    },
    [name, onChange]
  );
  return (
    <DatePicker
      name={name}
      onChange={_onChange}
      selected={value}
      dateFormat={dateFormat}
      {...rest}
    />
  );
};

export default FormDatePicker;
