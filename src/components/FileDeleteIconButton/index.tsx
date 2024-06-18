import React, { ReactElement, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { CellProps } from "react-table";

import { ReactComponent as DeleteIcon } from "../../assets/icons/delete_icon_button.svg";
import { UploadedFile } from "../../models/uploadedFile";
import SvgIconButton from "../SvgIconButton";

interface FileDeleteIconButtonProps {
  uploadedFile: CellProps<UploadedFile>["value"];
  onDeleteFile: (uploadedFile: UploadedFile) => void;
}

const FileDeleteIconButton = ({
  uploadedFile,
  onDeleteFile,
}: FileDeleteIconButtonProps): ReactElement => {
  const { t } = useTranslation();
  const onClickDelete = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    onDeleteFile(uploadedFile);
  }, [onDeleteFile, uploadedFile]);
  return (
    <SvgIconButton
      Icon={DeleteIcon}
      onClick={onClickDelete}
      data-testid="DeleteButton"
      aria-label={t("UploadedFilesTable.action.deleteFile.label")}
    />
  );
};

export default FileDeleteIconButton;
