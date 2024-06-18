import { ReactElement } from "react";
import { To } from "react-router-dom";
import { CellProps } from "react-table";
import { ButtonProps } from "@mui/material";
import cn from "classnames";

import { ReactComponent as ViewIcon } from "../assets/icons/view.svg";
import SvgIconButton from "../components/SvgIconButton";

interface ViewIconLinkActionButtonProps
  extends Pick<ButtonProps, "disabled" | "className"> {
  to: To;
  "data-testid"?: string;
}

export const ViewIconLinkActionButton = ({
  to,
  className,
  disabled,
  "data-testid": dataTestId,
}: ViewIconLinkActionButtonProps): ReactElement => {
  return (
    <SvgIconButton
      className={cn(
        "hover:from-black/[0] hover:to-black/[0] active:from-black/[0] active:to-black/[0]",
        className
      )}
      to={to}
      Icon={ViewIcon}
      type="Link"
      disabled={disabled}
      data-testid={dataTestId}
    />
  );
};

const ViewIconLinkActionCell = <Type extends object>({
  value,
}: CellProps<Type, string>): ReactElement => {
  return (
    <div className="flex flex-nowrap">
      <ViewIconLinkActionButton to={value} />
    </div>
  );
};

export default ViewIconLinkActionCell;
