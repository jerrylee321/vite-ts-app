import { ReactElement, useCallback, useRef } from "react";
import { Trans, useTranslation } from "react-i18next";
import HelpIcon from "@mui/icons-material/Help";
import { Typography } from "@mui/material";
import { Formik, FormikProps } from "formik";

import DialogWithActions from "../DialogWithActions";

import {
  DeleteUserGroupDialogSubmitForm,
  SubmitFormInitialValue,
  SubmitFormModel,
  SubmitFormSchema,
} from "./DeleteUserGroupDialogSubmitForm";

interface DeleteUserGroupDialogProps {
  isDialogOpen: boolean;
  onCloseDialog: () => void;
  userGroupStatus: string;
  onSubmitDelete: (effectiveDate: Date) => void;
}

const DeleteUserGroupDialog = (
  props: DeleteUserGroupDialogProps
): ReactElement => {
  const { isDialogOpen, onCloseDialog, userGroupStatus, onSubmitDelete } =
    props;
  const { t } = useTranslation();
  const formikRef = useRef<FormikProps<SubmitFormModel> | null>(null);

  const onSubmitForm = useCallback(
    (values: SubmitFormModel) => {
      onSubmitDelete(values.effectiveDate);
      onCloseDialog();
    },
    [onCloseDialog, onSubmitDelete]
  );

  const submitOnClick = useCallback(() => {
    formikRef.current?.submitForm().catch((e) => console.error(e));
  }, []);

  return (
    <DialogWithActions
      open={isDialogOpen}
      onClose={onCloseDialog}
      data-testid="DeleteUserGroupDialog"
      buttons={[
        {
          text: t("DeleteUserGroupDialog.button.back"),
          style: "secondary",
          "data-testid": "DeleteUserGroupDialogBackButton",
        },
        {
          text: t("DeleteUserGroupDialog.button.submit"),
          style: "primary",
          "data-testid": "DeleteUserGroupDialogSubmitButton",
          onSelect: submitOnClick,
          stayOpen: true,
        },
      ]}
    >
      <div className="flex w-90 items-center justify-start px-7">
        <div className="mr-4" data-testid="MessageDialogIcon">
          <HelpIcon className="text-5xl text-info-main" />
        </div>
        <div className="flex flex-col">
          <Typography
            className="font-bold text-independence-main"
            data-testid="DeleteUserGroupDialogMessage"
          >
            <Trans
              i18nKey="DeleteUserGroupDialog.userGroupStatus"
              values={{
                userGroupStatus: userGroupStatus,
              }}
            />
          </Typography>
          <Typography
            className="font-bold text-independence-main"
            data-testid="DeleteUserGroupDialogConfirm"
          >
            <Trans
              className="font-bold"
              i18nKey="DeleteUserGroupDialog.confirmMessage"
            />
          </Typography>
          <div className="mt-4">
            <Formik
              initialValues={SubmitFormInitialValue}
              validationSchema={SubmitFormSchema}
              onSubmit={onSubmitForm}
              innerRef={formikRef}
            >
              {(formikProps) => (
                <DeleteUserGroupDialogSubmitForm {...formikProps} />
              )}
            </Formik>
          </div>
        </div>
      </div>
    </DialogWithActions>
  );
};

export default DeleteUserGroupDialog;
