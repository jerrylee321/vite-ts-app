import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { FormikProps } from "formik";

import FormSelectWithInput from "../../components/FormSelectWithInput";
import useFormikErrorsWithModel from "../../hooks/useFormikErrorsWithModel";
import { IdDocumentInputType } from "../../models/idDocument";

interface IdDocumentInputProps<T> {
  formikProps: FormikProps<T>;
  required: boolean;
  selectHelperText?: string;
  inputHelperText?: string;
}

const IdDocumentInput = <T extends { idType?: string; idTypeValue?: string }>(
  props: IdDocumentInputProps<T>
): ReactElement => {
  const { t } = useTranslation();

  const { formikProps, required, selectHelperText, inputHelperText } = props;
  const { values, errors, touched, handleChange, handleBlur } = formikProps;
  const { isErrors, helperTexts } = useFormikErrorsWithModel<T>({
    errors,
    touched,
    defaultHelperTexts: {
      idType: selectHelperText,
      idTypeValue:
        inputHelperText ??
        (values.idType === IdDocumentInputType.MemHkidNo
          ? t("IdDocumentInput.helperText")
          : ""),
    },
  });

  return (
    <FormSelectWithInput
      id="idType"
      label={t("IdDocumentInput.title")}
      className="col-span-2"
      required={required}
      selectProps={{
        id: "idType",
        "data-testid": "idType",
        name: "idType",
        value: values.idType,
        onChange: handleChange,
        onBlur: handleBlur,
        error: isErrors.idType,
      }}
      error={isErrors.idType ?? isErrors.idTypeValue}
      inputProps={{
        id: "idTypeValue",
        "data-testid": "idTypeValue",
        name: "idTypeValue",
        value: values.idTypeValue,
        onChange: handleChange,
        onBlur: handleBlur,
        error: isErrors.idTypeValue,
      }}
      inputHelperText={helperTexts.idTypeValue}
      selectHelperText={helperTexts.idType}
      options={[
        {
          value: IdDocumentInputType.MemHkidNo,
          label: t("IdDocumentInput.hkidNo.label"),
        },
        {
          value: IdDocumentInputType.MemPassportNo,
          label: t("IdDocumentInput.passportNo.label"),
        },
      ]}
    />
  );
};

export default IdDocumentInput;
