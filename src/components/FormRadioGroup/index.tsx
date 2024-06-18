import React, { ReactElement } from "react";
import {
  FormControl,
  InputLabel,
  RadioGroup,
  RadioGroupProps,
} from "@mui/material";
import cn from "classnames";

import { formSmallLabel } from "./index.module.scss";

interface Props extends RadioGroupProps {
  label?: string;
  required?: boolean;
}

const FormRadioGroup = React.forwardRef((props: Props, ref): ReactElement => {
  const { ["aria-label"]: ariaLabel, label, required = false, ...rest } = props;

  return (
    <FormControl required={required}>
      {label ? (
        <InputLabel
          shrink={true}
          className={cn(formSmallLabel, "text-independence-main")}
          variant="outlined"
        >
          {label}
        </InputLabel>
      ) : null}
      <RadioGroup
        ref={ref}
        aria-label={ariaLabel ?? label}
        aria-required={required}
        {...rest}
      >
        {props.children}
      </RadioGroup>
    </FormControl>
  );
});

export default FormRadioGroup;
