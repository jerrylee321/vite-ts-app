import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { FormikProps } from "formik";
import Accordion from "frontend-common/src/components/Accordion";
import FormInput from "frontend-common/src/components/FormInput";
import { FormikErrorsWithModelReturnType } from "frontend-common/src/hooks/useFormikErrorsWithModel";

import { UpdateFormModel } from "../UpdateFormModel/UpdatePaymentRequisitionFormModel";

interface TrusteeInputSubFormProps<T extends UpdateFormModel> {
  formikProps: FormikProps<T>;
  formikErrors: FormikErrorsWithModelReturnType<T>;
}

const TrusteeInputSubForm = <T extends UpdateFormModel>(
  props: TrusteeInputSubFormProps<T>
): ReactElement => {
  const { values, handleChange, handleBlur } = props.formikProps;
  const { isErrors, helperTexts } = props.formikErrors;
  const { t } = useTranslation();
  return (
    <Accordion
      title={t("PaymentRequisitionDetailScreen.trusteeInputSection.title")}
      collapsible={false}
    >
      <FormInput
        required={true}
        fullWidth={true}
        textArea={true}
        id="trusteeComment"
        data-testid="trusteeComment"
        name="trusteeComment"
        className="col-span-3 mb-6"
        multiline={true}
        minRows={3}
        label={t(
          "PaymentRequisitionDetailScreen.trusteeInputSection.trusteeComment.label"
        )}
        value={values.trusteeComment}
        onChange={handleChange}
        onBlur={handleBlur}
        error={isErrors.trusteeComment}
        helperText={helperTexts.trusteeComment}
      />
    </Accordion>
  );
};

export default TrusteeInputSubForm;
