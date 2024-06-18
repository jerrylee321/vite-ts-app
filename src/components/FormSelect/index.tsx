import React, { PropsWithChildren, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  MenuItemProps,
  Select,
  SelectProps,
  Typography,
} from "@mui/material";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import cn from "classnames";

import { CommonOption } from "../../models/option";

import {
  formInputLabel,
  formNativeSelect,
  formSelectHelperText,
} from "./index.module.scss";

const FormSelectOption_ = (
  props: MenuItemProps & {
    testId?: string;
  }
): ReactElement => {
  const { testId, children, ...restProps } = props;
  return (
    <MenuItem {...restProps} data-testid={testId}>
      {children}
    </MenuItem>
  );
};

export const FormSelectOption = React.memo(FormSelectOption_);

export const renderSelectCommonOption = ({
  key,
  name,
}: CommonOption): ReactElement => {
  return (
    <FormSelectOption key={key} value={key}>
      {name}
    </FormSelectOption>
  );
};

export type FormSelectOnChange<T = string> = NonNullable<
  SelectInputProps<T>["onChange"]
>;
export interface FormSelectProps<T = string> extends SelectProps<T> {
  nativeSelectClassName?: string;
  helperText?: string | string[];
  label?: string;
  "data-testid"?: string;
}

const PLACEHOLDER_VALUE = "";

const FormSelect = (
  props: PropsWithChildren<FormSelectProps>
): ReactElement => {
  const { t } = useTranslation();
  const {
    value,
    children,
    className,
    nativeSelectClassName,
    disabled = false,
    error = false,
    fullWidth = false,
    required = false,
    id,
    name,
    helperText,
    label,
    "data-testid": dataTestId,
    ...restProps
  } = props;

  const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
  const inputLabelId = label && id ? `${id}-label` : undefined;

  return (
    <FormControl
      fullWidth={fullWidth}
      className={cn(className)}
      disabled={disabled}
      error={error}
      required={required}
      data-testid={dataTestId}
    >
      {label ? (
        <InputLabel
          htmlFor={id}
          shrink={true}
          className={cn(formInputLabel, "text-independence-main")}
          id={inputLabelId}
        >
          {label}
        </InputLabel>
      ) : null}

      <Select
        {...restProps}
        value={value ?? PLACEHOLDER_VALUE}
        placeholder={t("FormSelect.default.placeholder")}
        variant="standard"
        className={cn(formNativeSelect, nativeSelectClassName)}
        inputProps={{
          name: name,
          id: id,
        }}
        aria-describedby={helperTextId}
        fullWidth={fullWidth}
        name={name}
        // Note: use formik mandatory validation instead
        required={false}
        id={id}
        displayEmpty={true}
      >
        <FormSelectOption value={PLACEHOLDER_VALUE}>
          <Typography className="italic text-gray-main">
            {t("FormSelect.default.placeholder")}
          </Typography>
        </FormSelectOption>
        {children}
      </Select>

      {helperText ? (
        <FormHelperText
          className={cn(formSelectHelperText, "mt-1")}
          id={helperTextId}
        >
          {Array.isArray(helperText)
            ? // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
              helperText.filter((text) => text != null).join("\n")
            : helperText}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default FormSelect;
