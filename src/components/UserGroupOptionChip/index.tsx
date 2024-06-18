import { ReactElement, useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Chip } from "@mui/material";
import cn from "classnames";

import { AutocompleteOption } from "../AutocompleteInput";

interface UserGroupOptionChipProps {
  option: AutocompleteOption;
  index: number;
  onDelete: (index: number) => void;
  className?: string;
  "data-testid"?: string;
}

const UserGroupOptionChip = (props: UserGroupOptionChipProps): ReactElement => {
  const {
    index,
    onDelete,
    option,
    className,
    "data-testid": dataTestId,
  } = props;

  const handleDelete = useCallback(() => {
    onDelete(index);
  }, [index, onDelete]);

  return (
    <Chip
      size="small"
      title={option.title}
      label={option.title}
      data-testid={dataTestId}
      deleteIcon={
        <CloseIcon
          data-testid={dataTestId ? `${dataTestId}.remove` : undefined}
        />
      }
      className={cn(className, "rounded")}
      onDelete={handleDelete}
    />
  );
};
export default UserGroupOptionChip;
