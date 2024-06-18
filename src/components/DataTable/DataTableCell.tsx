import { ReactElement } from "react";
import { Cell, TableCellProps } from "react-table";
import { TableCell } from "@mui/material";
import cn from "classnames";

import { ACTION_COLUMN_ID } from "./const";

export interface DataTableCellProps<Type extends object>
  extends TableCellProps {
  cell: Cell<Type>;
}

export const DataTableCell = <Type extends object>({
  cell,
  className,
}: DataTableCellProps<Type>): ReactElement => {
  return (
    <TableCell
      {...cell.getCellProps()}
      className={cn(
        "py-3 text-independence-main border-b-gray-main border-0 border-b-[.0625rem]",
        {
          "sticky right-0 group-hover:bg-gradient-to-t group-hover:from-gray-light/[.5] group-hover:to-gray-light/[.5] m-auto":
            cell.column.id === ACTION_COLUMN_ID,
          "sticky left-0  text-primary-main  group-hover:bg-gradient-to-t group-hover:from-gray-light/[.5] group-hover:to-gray-light/[.5] z-50":
            cell.column.id === "selection",
        },
        className
      )}
    >
      {cell.render("Cell")}
    </TableCell>
  );
};
