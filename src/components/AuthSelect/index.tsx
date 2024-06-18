import { PropsWithChildren, ReactElement } from "react";
import { NativeSelect, NativeSelectProps } from "@mui/material";
import cn from "classnames";
import { t } from "i18next";

import { FormSelectOption } from "../FormSelect/NativeFormSelect";
import { SVGComponent } from "../SVGComponent";

const AuthSelect = (
  props: PropsWithChildren<
    Omit<NativeSelectProps, "startAdornment"> & {
      StartAdormnment?: SVGComponent;
      "data-testid"?: string;
    }
  >
): ReactElement => {
  const {
    children,
    className,
    inputProps,
    StartAdormnment,
    "data-testid": dataTestId,
    ...rest
  } = props;

  return (
    <>
      <NativeSelect
        {...rest}
        data-testid={dataTestId}
        inputProps={{
          ...inputProps,
          className: "placeholder:italic",
        }}
        className={cn("bg-white px-2 py-0 pt-1 before:border-b-0", className)}
        startAdornment={
          StartAdormnment ? (
            <StartAdormnment className="mr-1 mb-1 h-8 w-8 " />
          ) : undefined
        }
      >
        <FormSelectOption
          label={t("FormSelect.default.placeholder")}
          value=""
        />
        {children}
      </NativeSelect>
    </>
  );
};
export default AuthSelect;
