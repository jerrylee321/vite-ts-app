import { ReactElement } from "react";
import { Input, InputProps } from "@mui/material";
import cn from "classnames";

import { SVGComponent } from "../SVGComponent";

const AuthInput = (
  props: Omit<InputProps, "startAdornment"> & {
    StartAdormnment?: SVGComponent;
  }
): ReactElement => {
  const { className, inputProps, StartAdormnment, ...rest } = props;

  return (
    <>
      <Input
        {...rest}
        inputProps={{
          ...inputProps,
          className: "placeholder:italic",
        }}
        className={cn("bg-white px-2 py-0 pt-1 before:border-b-0", className)}
        startAdornment={
          StartAdormnment ? (
            <StartAdormnment className="mr-1 mb-1 h-8 w-8 text-gray-main" />
          ) : undefined
        }
      />
    </>
  );
};
export default AuthInput;
