import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import cn from "classnames";

interface DataTableActionLinkProps {
  message: string;
  to: string;
  className?: string;
  disabled?: boolean;
}

const DataTableActionLink = (props: DataTableActionLinkProps): ReactElement => {
  const { message, to, className, disabled } = props;

  return (
    <Button
      component={Link}
      disabled={disabled}
      to={to}
      className={cn(
        "rounded-full bg-primary-light px-3 py-1 uppercase text-common-white",
        {
          grayscale: disabled,
        },
        className
      )}
    >
      {message}
    </Button>
  );
};

export default DataTableActionLink;
