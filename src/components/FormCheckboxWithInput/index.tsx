import { ReactElement, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormHelperText,
  Input,
  InputProps,
  Typography,
} from "@mui/material";
import cn from "classnames";

import {
  formCheckboxWithInputHelperText,
  formCheckboxWithInputHelperTextError,
  formInput,
} from "./index.module.scss";

interface FormCheckboxWithInputProps {
  className?: string;
  checkboxProps: CheckboxProps & {
    "data-testid"?: string;
    label?: ReactNode | string;
  };
  inputProps: InputProps & { "data-testid"?: string };
  error?: boolean;
  helperText?: string | string[] | undefined;
}

const FormCheckboxWithInput = (
  props: FormCheckboxWithInputProps
): ReactElement => {
  const { t } = useTranslation();

  const { className, checkboxProps, inputProps, helperText, error } = props;
  const { label: checkboxLabel, ...restCheckboxProps } = checkboxProps;
  return (
    <div className={cn(className, "flex flex-col")}>
      <div>
        <FormControlLabel
          control={<Checkbox {...restCheckboxProps} />}
          label={
            typeof checkboxLabel === "string" ? (
              <Typography className="text-independence-main">
                {checkboxLabel}
              </Typography>
            ) : (
              checkboxLabel
            )
          }
        />
        <Input
          className={formInput}
          placeholder={t("FormInput.default.placeholder")}
          {...inputProps}
        />
      </div>
      {helperText ? (
        <FormHelperText
          className={cn(
            error
              ? formCheckboxWithInputHelperTextError
              : formCheckboxWithInputHelperText
          )}
        >
          {Array.isArray(helperText)
            ? helperText.filter((text) => !!text).join("\n")
            : helperText}
        </FormHelperText>
      ) : null}
    </div>
  );
};

export default FormCheckboxWithInput;
