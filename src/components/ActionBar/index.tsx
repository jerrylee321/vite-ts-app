import { PropsWithChildren, ReactElement } from "react";
import { Link, To } from "react-router-dom";
import { Button, ButtonProps } from "@mui/material";
import Divider from "@mui/material/Divider";
import cn from "classnames";

import { MuiButtonOverride } from "../../styles/MuiButtonOverride.module.scss";

type ActionBarButtonProps = ButtonProps & { isLink?: false };
type ActionBarLinkProps = ButtonProps<typeof Link> & {
  isLink: true;
  to?: To;
};

type ActionBarActionProps = ActionBarButtonProps | ActionBarLinkProps;

/**
 *  props `isLink` and `to` have to be set, if `Link` behavior is wanted
 * */
export const ActionBarPrimaryButton = (
  props: PropsWithChildren<ActionBarActionProps>
): ReactElement => {
  const { className, children, isLink = false, disabled, ...restProps } = props;

  return (
    <Button
      className={cn(
        MuiButtonOverride,
        "no-underline",
        "rounded-full",
        "bg-approval-main text-common-white",
        "px-2 py-1",
        "min-w-27 h-10",
        {
          grayscale: disabled,
        },
        className
      )}
      disabled={disabled}
      {...restProps}
      component={isLink ? Link : Button}
    >
      {children}
    </Button>
  );
};

/**
 *  props `isLink` and `to` have to be set, if `Link` behavior is wanted
 * */
export const ActionBarSecondaryButton = (
  props: PropsWithChildren<ActionBarActionProps>
): ReactElement => {
  const { className, children, isLink = false, disabled, ...restProps } = props;

  return (
    <Button
      className={cn(
        MuiButtonOverride,
        "no-underline",
        "rounded-full",
        "text-common-white border-white border-2",
        "px-2 py-1",
        "w-27 h-10",
        {
          grayscale: disabled,
        },
        className
      )}
      variant="outlined"
      disabled={disabled}
      {...restProps}
      component={isLink ? Link : Button}
    >
      {children}
    </Button>
  );
};

interface ActionBarProps {
  className?: string;
}

const ActionBar = (props: PropsWithChildren<ActionBarProps>): ReactElement => {
  const { children, className } = props;
  return (
    <div
      className={cn(
        "bg-independence-transparent",
        "w-full h-19",
        "flex flex-row justify-end items-center gap-5",
        "px-14 py-3",
        "z-50",
        className
      )}
    >
      <Divider
        orientation="vertical"
        className="w-0.5 bg-white"
        flexItem={true}
      />
      {children}
    </div>
  );
};

export default ActionBar;
