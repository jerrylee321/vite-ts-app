import React, {
  PropsWithChildren,
  ReactElement,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Column } from "react-table";
import { Divider } from "@mui/material";
import cn from "classnames";

import DataTable from "../../components/DataTable";
import UploadFilePicker, {
  UploadFilePickerProps,
} from "../../components/UploadFilePicker";
import useDeleteFile from "../../hooks/useDeleteFile";
import useUploadFiles, {
  UploadFilesHookValues,
} from "../../hooks/useUploadFiles";
import { UploadedFile } from "../../models/uploadedFile";
import { MuiDividerOverride } from "../../styles/MuiDividerOverride.module.scss";

import { getDefaultUploadedFilesTableColumns } from "./DefaultUploadedFilesTableColumns";

export interface UseUploadAreaProps {
  bindUploadArea: () => UploadAreaProps<UploadedFile>;
  filePickerKey: number;
  resetFilePicker?: () => void;
  uploadedFiles: UploadedFile[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
  filesUpload: UploadFilesHookValues;
  onDeleteFile: (file: UploadedFile) => Promise<void>;
}

type OnDeleteFileSuccessFn = (files: UploadedFile[]) => void | Promise<void>;

export const useUploadArea = (
  onUploadFileSuccess?: (files: UploadedFile[]) => void,
  onDeleteFileSuccess?: OnDeleteFileSuccessFn
): UseUploadAreaProps => {
  const [filePickerKey, resetFilePicker] = useReducer((i: number) => i + 1, 0);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const filesUpload = useUploadFiles({
    setUploadedFiles,
    resetFilePicker,
    onUploadedFiles: onUploadFileSuccess,
  });

  const { onDeleteFile } = useDeleteFile({
    setUploadedFiles,
    onDeletedFiles: onDeleteFileSuccess,
  });

  const { t } = useTranslation();

  const bindUploadArea = useCallback(() => {
    return {
      key: filePickerKey,
      uploadedFiles,
      onDeleteFile,
      setUploadedFiles,
      getUploadedFileTableColumns: getDefaultUploadedFilesTableColumns,
      emptyFileTableDisplayString: t("UploadArea.noUploadedFile"),
      filesUpload,
    };
  }, [filePickerKey, filesUpload, onDeleteFile, t, uploadedFiles]);

  return {
    filePickerKey,
    resetFilePicker,
    uploadedFiles,
    setUploadedFiles,
    filesUpload,
    onDeleteFile,
    bindUploadArea,
  };
};

type UploadAreaSize = "Small" | "Large";
interface UploadAreaProps<T extends UploadedFile> {
  uploadedFiles: T[];
  emptyFileTableDisplayString: string;
  size?: UploadAreaSize;
  dropzoneOptions?: UploadFilePickerProps["dropzoneOptions"];
  getUploadedFileTableColumns: (
    onDeleteFile: (files: UploadedFile) => void
  ) => Column<T>[];
  filesUpload: UploadFilesHookValues;
  onDeleteFile: (file: UploadedFile) => Promise<void>;
  isDisabled?: boolean;
  isUploadDisabled?: boolean;
  errorMessage?: string | string[];
  templateSection?: ReactElement;
  isLoading?: boolean;
}

const UploadArea = <T extends UploadedFile>(
  props: PropsWithChildren<UploadAreaProps<T>>
): ReactElement => {
  const {
    uploadedFiles,
    emptyFileTableDisplayString,
    getUploadedFileTableColumns,
    size = "Large",
    dropzoneOptions,
    filesUpload,
    onDeleteFile,
    isDisabled,
    isUploadDisabled,
    errorMessage,
    templateSection,
    children,
    isLoading,
  } = props;

  const columns = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    () => getUploadedFileTableColumns(onDeleteFile),
    [getUploadedFileTableColumns, onDeleteFile]
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={uploadedFiles}
        isExportEnabled={false}
        isPaginationEnabled={false}
        isQuickSearchEnabled={false}
        isSelectEnabled={false}
        emptyDataDisplayString={emptyFileTableDisplayString}
        isLoading={isLoading}
      />
      <Divider
        className={cn(MuiDividerOverride, "-mx-4 mt-5 h-1 bg-secondary-main")}
      />
      {templateSection != null ? templateSection : null}
      <div
        className={cn("mt-5 flex px-4", {
          "min-h-40": size === "Large",
          "min-h-28": size === "Small",
        })}
      >
        <UploadFilePicker
          className="w-full"
          dropzoneOptions={dropzoneOptions}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={filesUpload.uploadFiles}
          isUploading={filesUpload.isUploading}
          uploadProgress={filesUpload.totalUploadProgress}
          isDisabled={isDisabled}
          isUploadDisabled={isUploadDisabled}
          errorMessage={errorMessage}
        >
          {children}
        </UploadFilePicker>
      </div>
    </>
  );
};

export default UploadArea;
