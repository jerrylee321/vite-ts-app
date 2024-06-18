import React, { useCallback } from "react";

import { UploadedFile } from "../models/uploadedFile";

type OnDeleteFilesFn = (files: UploadedFile[]) => void | Promise<void>;

interface UseDeleteFileProps {
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
  onDeletedFiles?: OnDeleteFilesFn;
}

interface DeleteFileHookValues {
  onDeleteFile: (files: UploadedFile) => Promise<void>;
}

const useDeleteFile = (props: UseDeleteFileProps): DeleteFileHookValues => {
  const { setUploadedFiles, onDeletedFiles } = props;
  const onDeleteFile = useCallback(
    async (file: UploadedFile) => {
      // NOTE: Previously we called api to delete files on server, but requirement is removed by client afterwards
      // See frontend-common -> queries -> useDeleteFiles
      try {
        setUploadedFiles((prev) => {
          return prev.filter(({ id }) => id !== file.id);
        });

        await onDeletedFiles?.([file]);
      } catch (e: unknown) {
        console.error(e);
        // revert ui change
        setUploadedFiles((prev) => {
          return [...prev, file];
        });
        throw e;
      }
    },
    [setUploadedFiles, onDeletedFiles]
  );

  return {
    onDeleteFile,
  };
};

export default useDeleteFile;
