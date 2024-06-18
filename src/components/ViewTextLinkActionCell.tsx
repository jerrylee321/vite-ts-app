import { ReactElement } from "react";
import { Trans } from "react-i18next";
import { Link, To } from "react-router-dom";
import { CellProps } from "react-table";
import { Button, ButtonProps } from "@mui/material";
import cn from "classnames";

interface ViewTextLinkActionButtonProps
  extends Pick<ButtonProps, "disabled" | "className"> {
  to: To;
  "data-testid"?: string;
}

export const ViewTextLinkActionButton = ({
  to,
  className,
  "data-testid": dataTestId,
}: ViewTextLinkActionButtonProps): ReactElement => {
  return (
    <Button
      component={Link}
      to={to}
      className={cn(
        "rounded-full bg-actionButton-main px-5 py-1 font-bold uppercase text-primary-contrastText no-underline",
        className
      )}
      data-testid={dataTestId}
    >
      <Trans i18nKey="ViewTextLinkActionCell.title" />
    </Button>
  );
};

const ViewTextLinkActionCell = <Type extends object>({
  value,
}: CellProps<Type, string>): ReactElement => {
  return (
    <div className="flex flex-nowrap">
      <ViewTextLinkActionButton to={value} className="mr-2" />
    </div>
  );
};

export default ViewTextLinkActionCell;
