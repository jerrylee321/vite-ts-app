import React, { ReactElement } from "react";
import { Button, ButtonProps, SvgIcon } from "@mui/material";
import cn from "classnames";

import { MuiButtonOverride } from "../../styles/MuiButtonOverride.module.scss";

interface RoundIconButtonProps extends ButtonProps {
  Icon: typeof SvgIcon;
}

const RoundIconButton = (props: RoundIconButtonProps): ReactElement => {
  const { className, Icon, ...restProps } = props;
  return (
    <Button
      {...restProps}
      className={cn(
        MuiButtonOverride,
        "bg-primary-main disabled:bg-gray-main !min-w-[unset] !w-[2rem] !h-[2rem] !p-0 aspect-square",
        className
      )}
    >
      <Icon className="text-white" />
    </Button>
  );
};

export default RoundIconButton;
