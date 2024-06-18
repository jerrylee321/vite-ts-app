import React, { ReactElement, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  InputProps,
  OutlinedInput,
} from "@mui/material";
import cn from "classnames";

import { ReactComponent as ErrorIcon } from "../../assets/icons/error-alert.svg";

import {
  formInput,
  formInputHelperText,
  formLargeLabel,
  formSmallLabel,
  formTextAreaHelperText,
  formTextAreaInput,
} from "./index.module.scss";

export interface FormTextFieldProps extends InputProps {
  helperText?: string | (string | undefined)[];
  label?: string;
  textArea?: boolean;
  labelSize?: "small" | "large";
  inputClassName?: string;
  showErrorIcon?: boolean;
  showHelperTextOnTop?: boolean;
  variant?: "underline" | "outlined" | "textArea";
}

/* eslint-disable sonarjs/cognitive-complexity */
const FormInput = React.forwardRef(
  // eslint-disable-next-line complexity
  (props: FormTextFieldProps, ref): ReactElement => {
    const { t } = useTranslation();
    const {
      className,
      placeholder = t("FormInput.default.placeholder"),
      autoComplete,
      autoFocus = false,
      defaultValue,
      disabled = false,
      error = false,
      fullWidth = false,
      helperText,
      inputRef,
      label,
      maxRows,
      minRows,
      multiline = false,
      name,
      onBlur,
      onChange,
      onFocus,
      required = false,
      rows,
      type,
      value,
      id,
      startAdornment,
      endAdornment,
      labelSize = "small",
      inputClassName,
      showErrorIcon = false,
      showHelperTextOnTop = false,
      classes: propsClasses,
      textArea,
      ...rest
    } = props;

    const { variant = textArea ? "textArea" : "underlined" } = props;

    const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
    const inputLabelId = label && id ? `${id}-label` : undefined;

    const {
      InputComponent,
      inputComponentClassName,
      helperTextClassName,
      classes,
    } = (() => {
      if (variant === "textArea") {
        return {
          InputComponent: OutlinedInput,
          inputComponentClassName: cn(formTextAreaInput, inputClassName),
          helperTextClassName: formTextAreaHelperText,
          classes: propsClasses,
        };
      }

      if (variant === "outlined") {
        return {
          InputComponent: OutlinedInput,
          inputComponentClassName: cn(formTextAreaInput, inputClassName),
          helperTextClassName: formTextAreaHelperText,
          classes: {
            ...propsClasses,
            input: cn(propsClasses?.input, "px-3 py-2"),
          },
        };
      }

      return {
        InputComponent: Input,
        inputComponentClassName: cn(formInput, inputClassName),
        helperTextClassName: formInputHelperText,
        classes: propsClasses,
      };
    })();

    const renderHelperText = useCallback(
      () => (
        <>
          {helperText ? (
            <div className="flex flex-row items-start gap-2 ">
              {showErrorIcon && error ? (
                <ErrorIcon className="h-6 w-6" />
              ) : null}

              <FormHelperText
                className={cn(helperTextClassName, "mt-1 whitespace-pre-line")}
                id={helperTextId}
              >
                {Array.isArray(helperText)
                  ? // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    helperText.filter((text) => text != null).join("\n")
                  : helperText}
              </FormHelperText>
            </div>
          ) : null}
        </>
      ),
      [error, helperText, helperTextClassName, helperTextId, showErrorIcon]
    );

    return (
      <FormControl
        className={className}
        disabled={disabled}
        error={error}
        fullWidth={fullWidth}
        required={required}
      >
        {showHelperTextOnTop ? renderHelperText() : null}
        {label ? (
          <InputLabel
            htmlFor={id}
            shrink={true}
            className={cn(
              labelSize === "large" ? formLargeLabel : formSmallLabel,
              "text-independence-main"
            )}
            variant="outlined"
            id={inputLabelId}
          >
            {label}
          </InputLabel>
        ) : null}
        <InputComponent
          ref={ref}
          classes={classes}
          className={inputComponentClassName}
          aria-describedby={helperTextId}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          defaultValue={defaultValue}
          fullWidth={fullWidth}
          multiline={multiline}
          name={name}
          rows={rows}
          maxRows={maxRows}
          minRows={minRows}
          type={type}
          value={value}
          id={id}
          inputRef={inputRef}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          placeholder={placeholder}
          startAdornment={startAdornment}
          endAdornment={endAdornment}
          // Note: use formik mandatory validation instead
          required={false}
          {...rest}
        />
        {!showHelperTextOnTop ? renderHelperText() : null}
      </FormControl>
    );
  }
);

export default FormInput;
