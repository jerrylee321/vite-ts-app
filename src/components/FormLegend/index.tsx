import React, { ReactElement } from "react";
import { FormLabel } from "@mui/material";
import Typography from "@mui/material/Typography";
import cn from "classnames";

interface FormLegendProps {
  className?: string;
  isRequired: boolean;
  text: string;
}

const FormLegend = ({
  className,
  text,
  isRequired,
}: FormLegendProps): ReactElement => {
  return (
    <FormLabel className={cn(className, "flex flex-row gap-1")}>
      {isRequired ? (
        <Typography className="text-xs text-error-light">*</Typography>
      ) : null}
      <Typography className="text-xs text-independence-main">{text}</Typography>
    </FormLabel>
  );
};

export default FormLegend;
