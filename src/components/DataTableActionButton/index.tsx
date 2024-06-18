import React, { ReactElement, useCallback } from "react";
import { Button, ButtonProps } from "@mui/material";
import cn from "classnames";

interface DataTableActionButtonProps extends ButtonProps {
  message: string;
  disabled?: boolean;
  onClick?: () => void;
}

const DataTableActionButton = (
  props: DataTableActionButtonProps
): ReactElement => {
  const { className, message, onClick, disabled, ...rest } = props;

  const _onClick = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>) => {
      ev.stopPropagation();
      ev.preventDefault();
      if (onClick != null) {
        onClick();
      }
    },
    [onClick]
  );

  return (
    <Button
      {...rest}
      onClick={_onClick}
      disabled={disabled}
      className={cn(
        "rounded-full bg-primary-light px-3 py-1 uppercase text-common-white",
        {
          "grayscale ": disabled,
        },
        className
      )}
    >
      {message}
    </Button>
  );
};

export default DataTableActionButton;
