import React, { PropsWithChildren, ReactElement } from "react";
import cn from "classnames";

interface Props extends PropsWithChildren {
  className?: string;
  "data-testid"?: string;
}

const Badge = ({
  className,
  children,
  "data-testid": dataTestId,
}: Props): ReactElement => {
  return (
    <span
      className={cn("px-4 rounded", className)}
      data-testid={dataTestId ?? "Badge"}
    >
      {children}
    </span>
  );
};

export default Badge;
