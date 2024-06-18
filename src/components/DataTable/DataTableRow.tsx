import { ReactElement } from "react";
import { Row, TableRowProps } from "react-table";
import { TableRow } from "@mui/material";
import cn from "classnames";

import { DataTableCell } from "./DataTableCell";

export interface DataTableRowProps<Type extends object> extends TableRowProps {
  row: Row<Type>;
  cellClassName?: string;
}

export const DataTableRow = <Type extends object>({
  row,
  className,
  cellClassName,
  ...rest
}: DataTableRowProps<Type>): ReactElement => {
  return (
    <TableRow {...rest} className={cn("group cursor-auto", className)}>
      {row.cells.map((cell) => {
        return (
          // NOTE: cell.getCellProps() returns { key }, but eslint/typescript
          // still complain lacks of key prop.
          /* eslint-disable-next-line react/jsx-key */
          <DataTableCell
            {...cell.getCellProps()}
            cell={cell}
            className={cellClassName}
          />
        );
      })}
    </TableRow>
  );
};
