import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useFormSubmissionState, {
  useSubmissionStateReturns,
} from "frontend-common/src/hooks/useFormSubmissionState";
import { DialogContent } from "frontend-common/src/models/dialog";
import { UploadedFile } from "frontend-common/src/models/uploadedFile";

interface UseDeleteFileConfirmationDialogReturns {
  deleteConfirmationDialogContent: DialogContent;
  deleteSuccessDialogContent: DialogContent;
  handleConfirmDeleteFile: () => void;
  handleDeleteFile: (file: UploadedFile) => Promise<void>;
  deleteFileConfirmationStateReturns: useSubmissionStateReturns<
    UploadedFile,
    void
  >;
}

const useDeleteFileConfirmationDialog = (
  onDeleteFile: (file: UploadedFile) => Promise<void>,
  showError: (e: unknown) => void
): UseDeleteFileConfirmationDialogReturns => {
  const { t } = useTranslation();

  const deleteFileConfirmationStateReturns =
    useFormSubmissionState<UploadedFile>();

  const {
    submissionState: deleteFileConfirmationState,
    switchToStateInitial: deleteFileSwitchToStateInitial,
    switchToStateSubmitted: deleteFileSwitchToStateDeleted,
    switchToStateTBC: deleteFileSwitchToStateTBC,
  } = deleteFileConfirmationStateReturns;

  const handleDeleteFile = useCallback(
    async (file: UploadedFile) => {
      deleteFileSwitchToStateTBC(file);
    },
    [deleteFileSwitchToStateTBC]
  );

  const handleConfirmDeleteFile = useCallback(() => {
    /* istanbul ignore next: unlikely */
    if (deleteFileConfirmationState.state !== "toBeConfirmed") {
      return;
    }
    const uploadFile = deleteFileConfirmationState.requestData;

    onDeleteFile(uploadFile)
      .then((res) => {
        deleteFileSwitchToStateDeleted(res);
      })
      .catch((e: unknown) => {
        deleteFileSwitchToStateInitial();
        showError(e);
      });
  }, [
    deleteFileConfirmationState,
    deleteFileSwitchToStateDeleted,
    deleteFileSwitchToStateInitial,
    onDeleteFile,
    showError,
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

  return {
    deleteConfirmationDialogContent,
    deleteSuccessDialogContent,
    handleConfirmDeleteFile,
    handleDeleteFile,
    deleteFileConfirmationStateReturns,
  };
};

export default useDeleteFileConfirmationDialog;
