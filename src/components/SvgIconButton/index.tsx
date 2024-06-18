import React, { ReactElement, useCallback } from "react";
import { Link, To } from "react-router-dom";
import cn from "classnames";

import { SVGComponent } from "../../components/SVGComponent";

type ButtonType = "Link" | "Button";
interface SvgIconButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  Icon: SVGComponent;
  className?: string;
  iconClassName?: string;
  disabled?: boolean;
  onClick?: () => void;
  to?: To;
  type?: ButtonType;
  "data-testid"?: string;
}

const SvgIconButton = (props: SvgIconButtonProps): ReactElement => {
  const {
    className,
    iconClassName,
    Icon,
    onClick,
    disabled,
    to = "#",
    type = "Button",
    title,
    ...restProps
  } = props;
  const _onClick = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>) => {
      ev.preventDefault();
      ev.stopPropagation();
      if (onClick != null) {
        onClick();
      }
    },
    [onClick]
  );

  return type === "Button" ? (
    <button
      {...restProps}
      type="button"
      title={title}
      className={cn(
        className,
        "bg-transparent bg-none m-0 p-0 flex items-center justify-center border-0 rounded-full",
        "disabled:opacity-50",
        {
          "hover:bg-gradient-to-t hover:from-black/[.15] hover:to-black/[.15] active:bg-gradient-to-t active:from-black/[.3] active:to-black/[.3] cursor-pointer":
            !disabled,
        }
      )}
      onClick={_onClick}
      disabled={disabled}
    >
      <Icon className={cn(iconClassName)} data-testid="Icon" />
    </button>
  ) : (
    <Link
      to={to}
      title={title}
      data-testid={props["data-testid"]}
      className={cn(
        className,
        "bg-transparent bg-none m-0 p-0 flex items-center justify-center border-0 rounded-full",
        {
          "hover:bg-gradient-to-t hover:from-black/[.15] hover:to-black/[.15] active:bg-gradient-to-t active:from-black/[.3] active:to-black/[.3] cursor-pointer":
            !disabled,
        },
        {
          "opacity-50 cursor-default active:pointer-events-none": disabled,
        }
      )}
      aria-disabled={disabled}
    >
      <Icon className={cn(iconClassName)} data-testid="Icon" />
    </Link>
  );
};

export default SvgIconButton;
