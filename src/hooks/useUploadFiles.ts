import React, { useCallback, useMemo, useState } from "react";
import { AxiosProgressEvent } from "axios";

import { UploadedFile } from "../models/uploadedFile";
import { useErrorAlert } from "../providers/ErrorAlertProvider";
import useUploadFile from "../queries/useUploadFile";

interface UploadFileCount {
  completed: number;
  selected: number;
}

interface UseUploadFilesProps {
  setUploadedFiles?: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
  onUploadedFiles?: (files: UploadedFile[]) => void;
  resetFilePicker?: () => void;
}

export interface UploadFilesHookValues {
  isUploading: boolean;
  totalUploadProgress: number;
  uploadFiles: (files: File[]) => Promise<void>;
}

const useUploadFiles = (
  props: UseUploadFilesProps = {}
): UploadFilesHookValues => {
  const { setUploadedFiles, onUploadedFiles, resetFilePicker } = props;
  const { mutateAsync: uploadFile } = useUploadFile();
  // compute overall progress for selected files
  const [isUploading, setIsUploading] = useState(false);
  // not using uploadedFiles.length as there might be second batch of uploads
  const [uploadFileCount, setUploadFileCount] = useState<UploadFileCount>({
    completed: 0,
    selected: 0,
  });
  // currentFileProgress ranged [0, 100]
  const [currentFileProgress, setCurrentFileProgress] = useState<number>(0);
  // totalUploadProgress ranged [0, 100]
  const totalUploadProgress = useMemo(() => {
    if (uploadFileCount.selected === 0) {
      return 0;
    }
    return (
      ((uploadFileCount.completed * 100 + currentFileProgress) /
        (uploadFileCount.selected * 100)) *
      100
    );
  }, [
    currentFileProgress,
    uploadFileCount.completed,
    uploadFileCount.selected,
  ]);
  const onAxiosFileProgress = useCallback(
    (progressEvent: AxiosProgressEvent) => {
      const { loaded, total } = progressEvent;
      if (total == null || !isFinite(total) || total === 0) {
        setCurrentFileProgress(0);
        return;
      }
      setCurrentFileProgress((loaded / total) * 100);
    },
    []
  );
  const { show: showError } = useErrorAlert();
  const uploadFiles = useCallback(
    // Upload file one by one, stop if any error occur
    async (files: File[]) => {
      setUploadFileCount({
        completed: 0,
        selected: files.length,
      });
      setIsUploading(true);
      let didFail = false;
      const uploadedFiles: UploadedFile[] = [];
      for await (const file of files) {
        try {
          const res = await uploadFile({
            request: {
              branch: "test", // TODO: find out value for production
              file: file,
            },
            onUploadProgress: onAxiosFileProgress,
          });
          const uploadedFile = {
            id: res.id,
            name: file.name,
            uploadDate: new Date(),
          };
          setUploadedFiles?.((prev) => {
            return [...prev, uploadedFile];
          });
          uploadedFiles.push(uploadedFile);
          setUploadFileCount((prev) => {
            return {
              completed: prev.completed + 1,
              selected: prev.selected,
            };
          });
          setCurrentFileProgress(0);
        } catch (e: unknown) {
          console.error(e);
          showError(e);
          didFail = true;
          break;
        }
      }

      setIsUploading(false);
      if (!didFail) {
        onUploadedFiles?.(uploadedFiles);
        resetFilePicker?.();
      }
    },
    [
      onAxiosFileProgress,
      resetFilePicker,
      setUploadedFiles,
      showError,
      uploadFile,
      onUploadedFiles,
    ]
  );

  return {
    isUploading,
    totalUploadProgress,
    uploadFiles,
  };
};

export default useUploadFiles;
