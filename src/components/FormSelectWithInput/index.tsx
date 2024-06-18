import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  InputProps as MuiInputProps,
  NativeSelect,
  NativeSelectProps,
} from "@mui/material";
import cn from "classnames";

import {
  formInput,
  formInputLabel,
  formNativeSelect,
  formSelectWithInputHelperText,
  formSelectWithInputHelperTextError,
} from "./index.module.scss";

export interface Option {
  value: string | number;
  label: string;
  testId?: string;
}

interface FormSelectWithInputOptionProps {
  className?: string;
  value: string | number | undefined;
  label: string;
  testId?: string;
}

export const FormSelectWithInputOption = (
  props: FormSelectWithInputOptionProps
): ReactElement => {
  const { value, label, className, testId } = props;
  return (
    <option value={value} className={className} data-testid={testId}>
      {label}
    </option>
  );
};

interface SelectProps extends NativeSelectProps {
  "data-testid"?: string;
}

interface InputProps extends MuiInputProps {
  "data-testid"?: string;
}

interface FormSelectWithInputProps {
  id: string;
  className?: string;
  fullWidth?: boolean;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  selectHelperText?: string | string[];
  inputHelperText?: string | string[];
  selectProps: SelectProps;
  inputProps: InputProps;
  gap?: `gap-${number}`;
  options: Option[];
}

/* eslint-disable sonarjs/cognitive-complexity */
// eslint-disable-next-line complexity
const FormSelectWithInput = (props: FormSelectWithInputProps): ReactElement => {
  const {
    className,
    fullWidth = false,
    error = false,
    disabled = false,
    required = false,
    id,
    selectHelperText,
    inputHelperText,
    label,
    inputProps,
    selectProps,
    gap = "gap-4",
    options,
  } = props;

  const { t } = useTranslation();

  const { "data-testid": selectDataTestId, ...restSelectProps } = selectProps;
  const { "data-testid": inputDataTestId, ...restInputProps } = inputProps;

  const selectHelperTextId =
    selectHelperText && id ? `${id}-input-helper-text` : undefined;
  const inputHelperTextId =
    inputHelperText && id ? `${id}-select-helper-text` : undefined;
  const inputLabelId = label && id ? `${id}-label` : undefined;

  return (
    <div
      className={cn(
        className,
        "m-0 flex w-full min-w-0 flex-col p-0 align-top"
      )}
    >
      {label ? (
        <InputLabel
          htmlFor={id}
          shrink={true}
          className={cn(formInputLabel, "text-independence-main")}
          id={inputLabelId}
          required={required}
        >
          {label}
        </InputLabel>
      ) : null}
      <div className={`-mt-1 grid grid-cols-3 ${gap}`}>
        <div className="col-span-1 flex flex-col">
          <FormControl
            fullWidth={fullWidth}
            className="col-span-1"
            disabled={disabled}
            error={error}
            required={required}
            data-testid={selectDataTestId}
          >
            <NativeSelect
              {...restSelectProps}
              className={cn(formNativeSelect)}
              inputProps={{
                name: selectProps.name,
                id: selectProps.id,
              }}
              aria-describedby={selectHelperTextId}
              // Note: use formik mandatory validation instead
              required={false}
            >
              {required === false ? (
                <FormSelectWithInputOption
                  label={t("FormSelectWithInput.default.placeholder")}
                  value=""
                />
              ) : null}
              {options.map((option) => (
                <FormSelectWithInputOption
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  testId={option.testId}
                />
              ))}
            </NativeSelect>
          </FormControl>
          {selectHelperText ? (
            <FormHelperText
              className={cn(
                error
                  ? formSelectWithInputHelperTextError
                  : formSelectWithInputHelperText,
                "mt-3"
              )}
              id={selectHelperTextId}
            >
              {Array.isArray(selectHelperText)
                ? selectHelperText.filter((text) => !!text).join("\n")
                : selectHelperText}
            </FormHelperText>
          ) : null}
        </div>
        <div className="col-span-2 flex flex-col">
          <FormControl
            fullWidth={fullWidth}
            disabled={disabled}
            error={error}
            required={required}
            data-testid={inputDataTestId}
          >
            <Input
              {...restInputProps}
              className={cn(formInput)}
              // Note: use formik mandatory validation instead
              required={false}
            />
          </FormControl>
          {inputHelperText ? (
            <FormHelperText
              className={cn(
                error
                  ? formSelectWithInputHelperTextError
                  : formSelectWithInputHelperText,
                "mt-3"
              )}
              id={inputHelperTextId}
            >
              {Array.isArray(inputHelperText)
                ? inputHelperText.filter((text) => !!text).join("\n")
                : inputHelperText}
            </FormHelperText>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FormSelectWithInput;
