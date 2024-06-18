import React, {
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import {
  DropzoneOptions,
  ErrorCode,
  FileError,
  FileRejection,
  useDropzone,
} from "react-dropzone";
import { Trans, useTranslation } from "react-i18next";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { Button, Typography } from "@mui/material";
import cn from "classnames";

import { ReactComponent as UploaderNextIcon } from "../../assets/icons/ic_uploader_next.svg";
import { B, MaxUploadFileSize, MB } from "../../constants/fileSize";
import { MessageKey } from "../../i18n/LocaleModel";
import {
  DeniedFileTypes,
  FileTypes,
  isCommonDocumentFileTypes,
  toFileExtensions,
} from "../../models/uploadFileTypes";
import { MuiButtonOverride } from "../../styles/MuiButtonOverride.module.scss";

const DropzoneErrorCodeToMessageKey: Record<ErrorCode, MessageKey> = {
  "file-invalid-type": "UploadFilePicker.error.fileInvalidType",
  "file-too-large": "UploadFilePicker.error.fileTooLarge",
  "file-too-small": "UploadFilePicker.error.fileTooSmall",
  "too-many-files": "UploadFilePicker.error.tooManyFiles",
};

interface DropzoneEmptyContentProps {
  accept?: FileTypes;
  deny?: FileTypes;

  // Currently these props are not used as these props are not passed from
  // the parent component.
  maxSize?: number;
  minSize?: number;
}
const DropzoneEmptyContent = (
  props: DropzoneEmptyContentProps
): ReactElement => {
  const { t } = useTranslation();
  const { accept, deny, maxSize, minSize } = props;

  const fileTypeHint = useMemo(() => {
    const acceptsExtensions = toFileExtensions(accept ?? {});
    const deniesExtensions = toFileExtensions(deny ?? {});

    if (
      isCommonDocumentFileTypes(accept ?? {}) ||
      acceptsExtensions.length === 0
    ) {
      // If the common of file types is specified, the project client would like
      // to treat it as the same case as "all file types".
      if (deniesExtensions.length === 0) {
        return t("UploadFilePicker.fileTypeHint.acceptAll");
      }
      return t("UploadFilePicker.fileTypeHint.acceptAllExcept", {
        fileTypes: deniesExtensions.join(", "),
      });
    }

    return t("UploadFilePicker.fileTypeHint.acceptOnly", {
      fileTypes: acceptsExtensions.join(", "),
    });
  }, [accept, deny, t]);

  return (
    <div className="flex items-center justify-center gap-4 py-3.5">
      <AddCircleIcon className="h-16 w-16 text-secondary-main" />
      <div className="flex flex-col">
        <Typography className="font-semibold">
          <Trans i18nKey="UploadFilePicker.dragAndDropHereOr" />
        </Typography>
        <Typography className="font-semibold text-secondary-main">
          <Trans i18nKey="UploadFilePicker.browseFile" />
        </Typography>
        <div className="flex flex-row">
          <Typography>{fileTypeHint}</Typography>
          {maxSize != null ? (
            <Typography className="ml-2">
              <Trans
                i18nKey="UploadFilePicker.maximumSize"
                values={{
                  size: maxSize,
                }}
              />
            </Typography>
          ) : null}
          {minSize != null ? (
            <Typography className="ml-2">
              <Trans
                i18nKey="UploadFilePicker.minimumSize"
                values={{
                  size: minSize,
                }}
              />
            </Typography>
          ) : null}
        </div>
      </div>
    </div>
  );
};

interface DropzoneSelectedContentProps {
  acceptedFiles: File[];
}

const DropzoneSelectedContent = (
  props: DropzoneSelectedContentProps
): ReactElement => {
  const { acceptedFiles } = props;
  return (
    <div className="flex items-center justify-center gap-4 py-3.5">
      <UploadFileOutlinedIcon className="h-16 w-16 text-primary-main" />
      <div className="flex flex-col">
        <Typography className="font-semibold">
          <Trans i18nKey="UploadFilePicker.selectedFiles" />
        </Typography>
        <Typography className="whitespace-pre-wrap">
          {acceptedFiles.map((file) => file.name).join("\n")}
        </Typography>
      </div>
    </div>
  );
};

interface DropzoneUploadingContentProps {
  uploadProgress: number;
  acceptedFiles: File[];
}

const DropzoneUploadingContent = (
  props: DropzoneUploadingContentProps
): ReactElement => {
  const { uploadProgress, acceptedFiles } = props;
  return (
    <div className="flex items-center justify-center gap-4">
      <UploadFileOutlinedIcon className="h-16 w-16 text-green-700" />
      <div className="flex flex-col">
        <Typography className="font-semibold">
          <Trans
            i18nKey="UploadFilePicker.uploadingPercent"
            values={{ percent: uploadProgress.toFixed(0) }}
          />
        </Typography>
        <Typography className="whitespace-pre-wrap">
          {acceptedFiles.map((file) => file.name).join("\n")}
        </Typography>
      </div>
    </div>
  );
};

export interface UploadFilePickerProps {
  className: string;
  dropzoneOptions?: Pick<
    DropzoneOptions,
    "accept" | "minSize" | "maxSize" | "maxFiles" | "validator"
  >;
  onChange?: (files: File[]) => void;
  onSubmit: (files: File[]) => void;
  isUploading: boolean;
  uploadProgress: number;
  isDisabled?: boolean;
  isUploadDisabled?: boolean;
  errorMessage?: string | string[];
}

const DeniedFileTypesValidator = (
  file: File
): FileError | FileError[] | null => {
  const InvalidFileTypeError: FileError = {
    message: "Invalid file type",
    code: "file-invalid-type",
  };
  if (Object.keys(DeniedFileTypes).includes(file.type)) {
    return InvalidFileTypeError;
  }
  const fileExtRegex = new RegExp(/\.\w+$/);
  const fileExtRegexRes = fileExtRegex.exec(file.name);
  const fileExt = fileExtRegexRes != null ? fileExtRegexRes[0] : null;
  if (
    fileExt != null &&
    Object.values(DeniedFileTypes).flat().includes(fileExt)
  ) {
    return InvalidFileTypeError;
  }
  return null;
};

const UploadFilePicker = (
  props: PropsWithChildren<UploadFilePickerProps>
): ReactElement => {
  const {
    className,
    dropzoneOptions: dropzoneOptions_,
    onChange,
    onSubmit,
    isUploading,
    uploadProgress,
    isDisabled,
    isUploadDisabled,
    errorMessage = "",
    children,
  } = props;

  const dropzoneOptions: UploadFilePickerProps["dropzoneOptions"] = {
    maxSize: MaxUploadFileSize,
    ...dropzoneOptions_,
  };

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      ...dropzoneOptions,
      validator: DeniedFileTypesValidator,
    });

  const onClickSubmit = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>) => {
      ev.stopPropagation();
      ev.preventDefault();
      onSubmit(acceptedFiles);
    },
    [acceptedFiles, onSubmit]
  );

  const { t } = useTranslation();
  const renderErrorMessage = useCallback(
    (rejections: FileRejection[]) => {
      return rejections
        .map((rejection) => {
          return `${rejection.file.name}: ${rejection.errors
            .map((error) => {
              return t(DropzoneErrorCodeToMessageKey[error.code as ErrorCode], {
                maxSizeMB: (dropzoneOptions.maxSize ?? 0) / MB,
                minSizeB: (dropzoneOptions.minSize ?? 0) / B,
                maxFiles: dropzoneOptions.maxFiles ?? 0,
              });
            })
            .join(",")}`;
        })
        .join("\n");
    },
    [
      dropzoneOptions.maxFiles,
      dropzoneOptions.maxSize,
      dropzoneOptions.minSize,
      t,
    ]
  );

  useEffect(() => {
    if (onChange) {
      onChange(acceptedFiles);
    }
  }, [acceptedFiles, onChange]);

  const contentComponent = useMemo(() => {
    if (isUploading) {
      return (
        <DropzoneUploadingContent
          uploadProgress={uploadProgress}
          acceptedFiles={acceptedFiles}
        />
      );
    }

    if (acceptedFiles.length > 0) {
      return <DropzoneSelectedContent acceptedFiles={acceptedFiles} />;
    }

    return (
      <DropzoneEmptyContent
        accept={dropzoneOptions.accept}
        deny={DeniedFileTypes}
      />
    );
  }, [acceptedFiles, dropzoneOptions.accept, isUploading, uploadProgress]);

  return (
    <div
      className={cn("flex items-center justify-between", className, {
        "pointer-events-none filter grayscale": isDisabled,
      })}
    >
      <div className="flex w-8/12 flex-col self-stretch">
        <div
          {...getRootProps({
            className: cn(
              "flex-1 bg-white hover:bg-sky-50 rounded-md border-2 border-spanishGray-main border-dashed cursor-pointer"
            ),
            "aria-label": t(
              "UploadFilePicker.action.selectFileForUpload.label"
            ),
          })}
        >
          <input {...getInputProps()} data-testid="uploadFilePickerInput" />
          <div className="flex h-full w-full flex-col items-center justify-center">
            {contentComponent}
            {fileRejections.length > 0 ? (
              <span
                className="mt-2 whitespace-pre-wrap text-error-main"
                data-testid="filePickerError"
              >
                {renderErrorMessage(fileRejections)}
              </span>
            ) : null}
            {errorMessage ? (
              <span
                className="whitespace-pre-wrap text-error-main"
                data-testid="customErrorMessage"
              >
                {Array.isArray(errorMessage)
                  ? errorMessage.filter((text) => !!text).join("\n")
                  : errorMessage}
              </span>
            ) : null}
          </div>
        </div>
        {children}
      </div>
      <UploaderNextIcon className="h-10 w-10 text-gray-500" />
      <Button
        variant="contained"
        className={cn(
          MuiButtonOverride,
          "self-stretch w-3/12 !rounded-2xl bg-actionButton-main text-2xl uppercase disabled:bg-gray-main"
        )}
        disabled={acceptedFiles.length <= 0 || isUploading || isUploadDisabled}
        onClick={onClickSubmit}
        data-testid="UploadButton"
      >
        <Trans i18nKey="UploadFilePicker.upload" />
      </Button>
    </div>
  );
};

export default UploadFilePicker;
