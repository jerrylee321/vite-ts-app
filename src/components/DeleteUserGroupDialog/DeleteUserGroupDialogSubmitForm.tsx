import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { FormikProps } from "formik";
import * as yup from "yup";

import FormDatePicker from "../../components/FormDatePicker";
import useFormikErrorsWithModel from "../../hooks/useFormikErrorsWithModel";
import useToday from "../../hooks/useToday";
import { todayDateInDefaultZone } from "../../utils/time";

export const SubmitFormSchema = yup.object({
  effectiveDate: yup
    .date()
    .min(todayDateInDefaultZone()) // FS: should greater than or equal to system current date
    .required(),
});

export type SubmitFormModel = yup.InferType<typeof SubmitFormSchema>;

export const SubmitFormInitialValue: yup.InferType<typeof SubmitFormSchema> = {
  effectiveDate: new Date(),
};

export const DeleteUserGroupDialogSubmitForm = (
  props: FormikProps<SubmitFormModel>
): ReactElement => {
  const { t } = useTranslation();
  const { handleSubmit, setFieldValue, handleBlur, values, touched, errors } =
    props;

  const { isErrors } = useFormikErrorsWithModel({
    errors,
    touched,
  });

  const currentDate = useToday();

  return (
    <form onSubmit={handleSubmit}>
      <FormDatePicker
        id="effectiveDate"
        data-testid="effectiveDate"
        label={t("DeleteUserGroupDialog.effectiveDate.label")}
        name="effectiveDate"
        value={values.effectiveDate}
        onChange={setFieldValue}
        onBlur={handleBlur}
        error={isErrors.effectiveDate}
        helperText={t("DeleteUserGroupDialog.effectiveDate.helperText")}
        minDate={currentDate}
      />
      <button
        type="submit"
        hidden={true}
        data-testid="submitBtn"
        id="DeleteUserGroupDialogSubmitFormHiddenButton"
      />
    </form>
  );
};
