import { ReactElement, useCallback, useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import cn from "classnames";
import { Formik, FormikProps } from "formik";

import { RejectType } from "../../apis/models/RejectOptions";
import useFormikErrorsWithModel from "../../hooks/useFormikErrorsWithModel";
import { MessageKey } from "../../i18n/LocaleModel";
import { MuiInputOverride } from "../../styles/MuiInputOverride.module.scss";
import DialogWithActions, {
  DialogControlProps,
  DialogWithActionsProps,
} from "../DialogWithActions";
import { CheckedIcon, UncheckedIcon } from "../RadioIcon";

import {
  getRejectDialogFormInitialValue,
  OptionalReasonRejectDialogFormSchema,
  RejectDialogFormModel,
  RequiredReasonRejectDialogFormSchema,
} from "./formModel";
import { MuiInputLabelOverride } from "./index.module.scss";

const RejectDialogFormChildren = (
  props: FormikProps<RejectDialogFormModel> & {
    title: MessageKey;
    rejectTypes: RejectType[];
  }
): ReactElement => {
  const { values, title, touched, errors, rejectTypes, handleSubmit } = props;

  const { isErrors, helperTexts } = useFormikErrorsWithModel({
    touched,
    errors,
  });

  return (
    <form
      className="flex items-center justify-center px-7"
      id="rejectForm"
      onSubmit={handleSubmit}
    >
      <div className="flex grow flex-col">
        <div className="flex justify-center" data-testid="MessageDialogTitle">
          <Typography className="font-bold text-independence-main">
            <Trans<MessageKey> i18nKey={title} />
          </Typography>
        </div>
        <TextField
          id="standard-multiline-static"
          className="w-110"
          label="Reject Reason"
          multiline={true}
          rows={3}
          value={values.reason}
          error={isErrors.reason}
          helperText={helperTexts.reason}
          name="reason"
          onChange={props.handleChange}
          InputLabelProps={{
            className: cn(MuiInputLabelOverride),
            shrink: true,
          }}
          InputProps={{
            className: cn(MuiInputOverride),
          }}
          variant="standard"
        />
        {rejectTypes.length > 0 ? (
          <FormControl>
            <RadioGroup
              row={true}
              aria-label="Reject Radio Group"
              name="rejectType"
              value={props.values.rejectType}
              onChange={props.handleChange}
              className="justify-between"
              data-testid="RejectOptionRadioGroup"
            >
              {rejectTypes.includes(RejectType.redo) ? (
                <FormControlLabel
                  value={RejectType.redo}
                  name="rejectType"
                  control={
                    <Radio
                      data-testid="RedoRadioOption"
                      icon={<UncheckedIcon />}
                      checkedIcon={<CheckedIcon />}
                    />
                  }
                  label={
                    <Typography className="text-xs font-bold text-independence-main ">
                      <Trans i18nKey="RejectConfirmDialog.redo" />
                    </Typography>
                  }
                />
              ) : null}
              {rejectTypes.includes(RejectType.abandon) ? (
                <FormControlLabel
                  value={RejectType.abandon}
                  name="rejectType"
                  control={
                    <Radio
                      data-testid="AbandonRadioOption"
                      icon={<UncheckedIcon />}
                      checkedIcon={<CheckedIcon />}
                    />
                  }
                  label={
                    <Typography className="text-xs font-bold text-independence-main ">
                      <Trans i18nKey="RejectConfirmDialog.abandon" />
                    </Typography>
                  }
                />
              ) : null}
            </RadioGroup>
          </FormControl>
        ) : null}
      </div>
    </form>
  );
};

interface RejectDialogProps
  extends Omit<DialogWithActionsProps, "title" | "buttons"> {
  title: MessageKey;
  onSubmitReject: (reason: string, type: RejectType) => void;
  isSubmiting: boolean;
  /**
   * If not provided, default is [RejectType.redo, RejectType.abandon]
   */
  rejectTypes?: RejectType[];
  isReasonRequired?: boolean;
}

const RejectDialog = (props: RejectDialogProps): ReactElement => {
  const {
    title,
    onSubmitReject,
    isSubmiting,
    rejectTypes = [RejectType.redo, RejectType.abandon],
    isReasonRequired = false,
    ...rest
  } = props;
  const { t } = useTranslation();

  const handleReject = useCallback(
    (values: RejectDialogFormModel) => {
      onSubmitReject(values.reason, values.rejectType);
    },
    [onSubmitReject]
  );

  const buttons: DialogControlProps[] = useMemo(
    () => [
      {
        text: t("RejectDialog.backButton"),
        style: "secondary",
        "data-testid": "RejectDialogBackBtn",
        disabled: isSubmiting,
      },
      {
        text: t("RejectDialog.rejectButton"),
        style: "primary",
        "data-testid": "RejectDialogRejectBtn",
        disabled: isSubmiting,
        stayOpen: true,
        type: "submit",
        formId: "rejectForm",
      },
    ],
    [isSubmiting, t]
  );

  const rejectSchema = useMemo(() => {
    return isReasonRequired
      ? RequiredReasonRejectDialogFormSchema
      : OptionalReasonRejectDialogFormSchema;
  }, [isReasonRequired]);
  const initialValue = useMemo(() => {
    return getRejectDialogFormInitialValue(rejectTypes);
  }, [rejectTypes]);

  return (
    <DialogWithActions {...rest} buttons={buttons}>
      <Formik
        validationSchema={rejectSchema}
        initialValues={initialValue}
        onSubmit={handleReject}
      >
        {(formikProps) => {
          return (
            <RejectDialogFormChildren
              {...formikProps}
              title={title}
              rejectTypes={rejectTypes}
            />
          );
        }}
      </Formik>
    </DialogWithActions>
  );
};

export default RejectDialog;
