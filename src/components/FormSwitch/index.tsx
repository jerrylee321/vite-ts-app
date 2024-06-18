import React, { ReactElement } from "react";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  Switch,
} from "@mui/material";

import { MuiSwitchOverride } from "../../styles/MuiSwitchOverride.module.scss";

interface FormSwitchProps extends Omit<FormControlLabelProps, "control"> {}

const FormSwitch = (props: FormSwitchProps): ReactElement => {
  const { className, ...restProps } = props;
  return (
    <FormControl className={className}>
      <FormControlLabel
        {...restProps}
        control={<Switch className={MuiSwitchOverride} />}
        classes={{
          root: "text-metalicBlue-main",
        }}
      />
    </FormControl>
  );
};

export default FormSwitch;
