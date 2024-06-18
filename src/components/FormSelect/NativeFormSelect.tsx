import { PropsWithChildren, ReactElement, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  NativeSelect,
  NativeSelectProps,
} from "@mui/material";
import cn from "classnames";

import { CommonOption } from "../../models/option";

import {
  formInputLabel,
  formNativeSelect,
  formSelectHelperText,
} from "./index.module.scss";

interface FormSelectOptionProps {
  className?: string;
  value: string | number | undefined;
  label: string;
  testId?: string;
}

export const FormSelectOption = (
  props: FormSelectOptionProps
): ReactElement => {
  const { value, label, className, testId } = props;
  return (
    <option value={value} className={className} data-testid={testId}>
      {label}
    </option>
  );
};

export const renderSelectCommonOption = ({
  key,
  name,
}: CommonOption): ReactElement => {
  return <FormSelectOption key={key} value={key} label={name} />;
};

export interface FormSelectProps extends NativeSelectProps {
  nativeSelectClassName?: string;
  helperText?: string | string[];
  label?: string;
  "data-testid"?: string;
  placeHolderValue?: string;
}

const FormSelect = (
  props: PropsWithChildren<FormSelectProps>
): ReactElement => {
  const { t } = useTranslation();
  const {
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
    placeHolderValue = "",
    ...restProps
  } = props;

  const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
  const inputLabelId = label && id ? `${id}-label` : undefined;

  const _nativeSelectClassName = useMemo(() => {
    return props.value === placeHolderValue
      ? "italic text-gray-main"
      : nativeSelectClassName;
  }, [nativeSelectClassName, placeHolderValue, props.value]);

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
      <NativeSelect
        {...restProps}
        className={cn(formNativeSelect, _nativeSelectClassName)}
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
      >
        <FormSelectOption
          label={t("FormSelect.default.placeholder")}
          value={placeHolderValue}
        />
        {children}
      </NativeSelect>
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
