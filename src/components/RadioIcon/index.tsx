import { ReactElement } from "react";
import cn from "classnames";

interface Props {
  className?: string;
}

export const CheckedIcon = (props: Props): ReactElement => {
  const { className } = props;
  return (
    <div
      className={cn(
        "h-4.5 w-4.5 rounded-full border-[7px] border-solid border-radio-enabled-selected-border bg-radio-enabled-selected-color",
        className
      )}
    />
  );
};

export const UncheckedIcon = (props: Props): ReactElement => {
  const { className } = props;
  return (
    <div
      className={cn(
        "h-4.5 w-4.5 rounded-full border-[2px] border-solid border-radio-enabled-unselected-border bg-radio-enabled-unselected-color",
        className
      )}
    />
  );
};

export const DisabledCheckedIcon = (props: Props): ReactElement => {
  const { className } = props;
  return (
    <div
      className={cn(
        "h-4.5 w-4.5 rounded-full border-[7px] border-solid border-radio-disabled-selected-border bg-radio-disabled-selected-color",
        className
      )}
    />
  );
};

export const DisabledUncheckedIcon = (props: Props): ReactElement => {
  const { className } = props;
  return (
    <div
      className={cn(
        "h-4.5 w-4.5 rounded-full border-[2px] border-solid border-radio-disabled-unselected-border bg-radio-disabled-unselected-color",
        className
      )}
    />
  );
};

export const ErrorCheckedIcon = (props: Props): ReactElement => {
  const { className } = props;
  return (
    <div
      className={cn(
        "h-4.5 w-4.5 rounded-full border-[7px] border-solid border-radio-error-selected-border bg-radio-error-selected-color",
        className
      )}
    />
  );
};

export const ErrorUncheckedIcon = (props: Props): ReactElement => {
  const { className } = props;
  return (
    <div
      className={cn(
        "h-4.5 w-4.5 rounded-full border-[2px] border-solid border-radio-error-unselected-border bg-radio-error-unselected-color",
        className
      )}
    />
  );
};
