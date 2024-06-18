import { ReactElement } from "react";
import { CellProps, Column } from "react-table";

import { UploadedFile } from "../../models/uploadedFile";
import dateTimeSorting from "../../react-table/dateTimeSorting";
import FileDeleteIconButton from "../FileDeleteIconButton";

export const getDefaultUploadedFilesTableColumns = (
  onDeleteFile: (file: UploadedFile) => void
): Column<UploadedFile>[] => [
  {
    i18nKey: "UploadArea.header.fileName",
    accessor: "name",
  },
  {
    i18nKey: "UploadArea.header.submissionDate",
    id: "mpfaUploadDate",
    dateFormat: "dd/MM/yyyy",
    sortType: dateTimeSorting,
    accessor: "uploadDate",
  },
  {
    i18nKey: "UploadArea.header.action",
    accessor: (data) => data,
    Cell: ({ value }: CellProps<UploadedFile>): ReactElement => (
      <FileDeleteIconButton uploadedFile={value} onDeleteFile={onDeleteFile} />
    ),
    id: "action",
    disableSortBy: true,
  },
];
