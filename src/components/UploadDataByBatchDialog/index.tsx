import React, { ReactNode, useCallback, useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  Button,
  Dialog,
  DialogProps,
  IconButton,
  Typography,
} from "@mui/material";

import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import useFormSubmissionState from "../../hooks/useFormSubmissionState";
import { ExcelFileTypes } from "../../models/uploadFileTypes";
import ActionConfirmationDialogFlow, {
  DialogContent,
} from "../ActionConfirmationDialogFlow";
import UploadFilePicker from "../UploadFilePicker";

interface FileRowProps {
  file: File;
  onRemoveClick: (file: File) => void;
}

const FileRow = (props: FileRowProps): React.ReactElement => {
  const { file, onRemoveClick } = props;

  const handleRemoveClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onRemoveClick(file);
    },
    [file, onRemoveClick]
  );

  return (
    <li className="flex items-center border-0 border-b border-solid border-b-gray-main py-1.5">
      <Typography className="flex-1 font-bold text-metalicBlue-main">
        {file.name}
      </Typography>
      <div className="mx-7.5">
        <IconButton
          className="p-0"
          disableRipple={true}
          onClick={handleRemoveClick}
          data-testid={`UploadDataByBatchDialog.removeFile.${file.name}`}
        >
          <DeleteIcon className="h-9 w-9" />
        </IconButton>
      </div>
    </li>
  );
};

interface Props {
  dialogProps: DialogProps;
  downloadTemplateName: string;
  initialFiles?: File[];
  onClose: () => void;
  onConfirm: (files: File[]) => void;
  onDownloadTemplateClick: () => void;
  maxFiles?: number;
  confirmMessageComponent?: ReactNode;
}

const UploadTemplateDialog = (props: Props): React.ReactElement => {
  const {
    dialogProps,
    downloadTemplateName,
    initialFiles = [],
    onClose,
    onConfirm,
    onDownloadTemplateClick,
    maxFiles,
    confirmMessageComponent,
  } = props;

  const { t } = useTranslation();

  const [files, setFiles] = useState<File[]>(initialFiles);

  const handleDownloadTemplateClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onDownloadTemplateClick();
    },
    [onDownloadTemplateClick]
  );

  const handleConfirm = useCallback(() => {
    onConfirm(files);
  }, [files, onConfirm]);

  const deleteFileConfirmationStateReturns = useFormSubmissionState<File>();

  const {
    submissionState: deleteFileConfirmationState,
    switchToStateSubmitted: deleteFileSwitchToStateDeleted,
    switchToStateTBC: deleteFileSwitchToStateTBC,
  } = deleteFileConfirmationStateReturns;

  const onDeleteFileClick = useCallback(
    (file: File) => {
      deleteFileSwitchToStateTBC(file);
    },
    [deleteFileSwitchToStateTBC]
  );

  const handleRemoveFile = useCallback(async (file: File) => {
    setFiles((prev) => prev.filter((f) => f !== file));
  }, []);

  const handleConfirmDeleteFile = useCallback(() => {
    if (deleteFileConfirmationState.state !== "toBeConfirmed") {
      return;
    }
    const uploadFile = deleteFileConfirmationState.requestData;

    handleRemoveFile(uploadFile)
      .then((res) => {
        deleteFileSwitchToStateDeleted(res);
      })
      .catch(() => {
        console.error("Failed to delete file");
      });
  }, [
    deleteFileConfirmationState,
    handleRemoveFile,
    deleteFileSwitchToStateDeleted,
  ]);

  const deleteConfirmationDialogContent = useMemo<DialogContent>(() => {
    return {
      title: t("ConfirmDeletionDialog.title"),
      primaryButtonLabel: t("ConfirmDeletionDialog.delete"),
      secondaryButtonLabel: t("ConfirmDeletionDialog.back"),
    };
  }, [t]);

  const deleteSuccessDialogContent = useMemo<DialogContent>(() => {
    return {
      title: t("DeleteSuccessDialog.title"),
      primaryButtonLabel: t("DeleteSuccessDialog.ok"),
    };
  }, [t]);

  return (
    <Dialog
      {...dialogProps}
      onClose={onClose}
      classes={{
        paper:
          "overflow-visible bg-gray-light min-w-200 min-h-30 rounded-xl overflow-y-auto",
      }}
    >
      <div className="border-0 border-b-4 border-solid border-b-[#2d9fc3] px-15 pb-10 pt-6">
        <Typography className="text-2xl font-bold text-[#009ccd]" variant="h2">
          <Trans i18nKey="UploadDataByBatchDialog.title" />
        </Typography>
        <div className="mt-5 flex items-center border-0 border-b border-solid border-b-gray-main pb-4.5">
          <Typography className="flex-1 font-bold text-metalicBlue-main">
            <Trans i18nKey="UploadDataByBatchDialog.template" />
            <span className="text-[#2d9fc3]">{downloadTemplateName}</span>
          </Typography>
          <Button
            className="h-10 rounded-full border-2 border-[#009ccd] px-5 py-1 text-[#009ccd] no-underline"
            variant="outlined"
            onClick={handleDownloadTemplateClick}
            data-testid="UploadDataByBatchDialog.downloadTemplateButton"
          >
            <Trans i18nKey="UploadDataByBatchDialog.download" />
          </Button>
        </div>
      </div>
      <div className="px-15 py-10">
        {files.length > 0 ? (
          <>
            <div className="flex items-center border-0 border-b border-solid border-b-gray-main pb-2.5">
              <Typography className="flex-1 text-sm text-metalicBlue-main">
                <Trans i18nKey="UploadDataByBatchDialog.nameOfDocument" />
              </Typography>
              <Typography className="mx-7.5 text-sm text-metalicBlue-main">
                <Trans i18nKey="UploadDataByBatchDialog.delete" />
              </Typography>
            </div>
            <ul className="m-0 mb-7.5 list-none p-0">
              {files.map((file, index) => {
                const key = `file-${index}`;
                return (
                  <FileRow
                    file={file}
                    key={key}
                    onRemoveClick={onDeleteFileClick}
                  />
                );
              })}
            </ul>
          </>
        ) : null}
        <UploadFilePicker
          className=""
          isUploading={false}
          onSubmit={setFiles}
          uploadProgress={0}
          dropzoneOptions={{
            maxFiles: maxFiles,
            accept: ExcelFileTypes,
          }}
        />
      </div>
      {confirmMessageComponent}
      <div className="pb-6 text-center">
        <Button
          className="mr-14.5 inline-block h-10 rounded-full border-2 border-[#ef841f] px-5 py-1 text-[#ef841f] no-underline"
          onClick={onClose}
          variant="outlined"
          data-testid="UploadDataByBatchDialog.backButton"
        >
          <Trans i18nKey="UploadDataByBatchDialog.back" />
        </Button>
        <Button
          className="inline-block h-10 rounded-full border-2 border-[#ef841f] bg-[#ef841f] px-5 py-1 text-white no-underline"
          disableElevation={true}
          onClick={handleConfirm}
          variant="contained"
          data-testid="UploadDataByBatchDialog.confirmButton"
        >
          <Trans i18nKey="UploadDataByBatchDialog.confirm" />
        </Button>
      </div>
      <ActionConfirmationDialogFlow
        {...deleteFileConfirmationStateReturns}
        confirmationDialogContent={deleteConfirmationDialogContent}
        submittedDialogContent={deleteSuccessDialogContent}
        onConfirm={handleConfirmDeleteFile}
      />
    </Dialog>
  );
};

export default UploadTemplateDialog;
