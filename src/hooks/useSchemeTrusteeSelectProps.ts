import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SelectChangeEvent } from "@mui/material";
import { FormikProps } from "formik";

import {
  FormSelectProps,
  renderSelectCommonOption,
} from "../components/FormSelect";
import { SelectedScheme } from "../redux/scheme";

import useSchemeTrusteeOptions from "./useSchemeTrusteeOptions";

type CodeValueType = string;

type Model = { [key in string]: unknown };

type EmptyObject = Record<string, never>;

// Used to assert that SchemeCode (schemeCode) and TrusteeCode (trCode) exists
// and the type is CodeValueType (string).
type ModelWithSchemeAndTrusteeCode<
  T extends Model,
  SchemeCode extends keyof T = "schemeCode",
  TrusteeCode extends keyof T = "trCode"
> = T[SchemeCode] extends CodeValueType
  ? T[TrusteeCode] extends CodeValueType
    ? T
    : EmptyObject
  : EmptyObject;

interface UseSchemeTrusteeSelectPropsValues {
  trusteeSelectProps: FormSelectProps;
  schemeSelectProps: FormSelectProps;
}
interface UseSchemeTrusteeSelectPropsOptions<
  T extends Model,
  SchemeCode extends keyof T = "schemeCode",
  TrusteeCode extends keyof T = "trCode"
> {
  // If the form model uses different key as above, specify it here.
  schemeCodeKey?: SchemeCode;
  trusteeCodeKey?: TrusteeCode;

  // If the following info is needed by the form model, specify here.
  schemeNameKey?: string;
  schemeRegNoKey?: string;
  trusteeNameKey?: string;

  // If the scheme and trustee dropdown has an "all" option, set it to true.
  hasAllOption?: boolean;
}

function useSchemeTrusteeSelectProps<
  T extends Model,
  SchemeCode extends keyof T = "schemeCode",
  TrusteeCode extends keyof T = "trCode"
>(
  formikProps: FormikProps<
    ModelWithSchemeAndTrusteeCode<T, SchemeCode, TrusteeCode> extends T
      ? T
      : never
  >,
  options: UseSchemeTrusteeSelectPropsOptions<T, SchemeCode, TrusteeCode> = {}
): UseSchemeTrusteeSelectPropsValues {
  const { values, setFieldValue, handleBlur } = formikProps;

  const {
    trusteeCodeKey = "trCode",
    schemeCodeKey = "schemeCode",
    schemeNameKey,
    schemeRegNoKey,
    trusteeNameKey,
    hasAllOption = false,
  } = options;

  const { t } = useTranslation();

  // Type already asserted.
  const trusteeCode =
    (values[trusteeCodeKey as string] as CodeValueType | undefined | null) ??
    "";
  const schemeCode =
    (values[schemeCodeKey as string] as CodeValueType | undefined | null) ?? "";

  const {
    filteredSchemeList: _filteredSchemeList,
    filteredTrusteeList: _filteredTrusteeList,
    schemeList,
  } = useSchemeTrusteeOptions(trusteeCode);

  const filteredSchemeList = useMemo(() => {
    if (hasAllOption) {
      return [
        {
          key: "all",
          name: t("Common.schemeName.all"),
        },
        ..._filteredSchemeList,
      ];
    }
    return _filteredSchemeList;
  }, [_filteredSchemeList, hasAllOption, t]);

  const filteredTrusteeList = useMemo(() => {
    if (hasAllOption) {
      return [
        {
          key: "all",
          name: t("Common.trusteeName.all"),
        },
        ..._filteredTrusteeList,
      ];
    }
    return _filteredTrusteeList;
  }, [_filteredTrusteeList, hasAllOption, t]);

  const setScheme = useCallback(
    (selectedScheme: SelectedScheme | undefined) => {
      setFieldValue(schemeCodeKey as string, selectedScheme?.schemeCode ?? "");
      if (schemeRegNoKey) {
        setFieldValue(schemeRegNoKey, selectedScheme?.schemeRegNo ?? "");
      }
      if (schemeNameKey) {
        setFieldValue(schemeNameKey, selectedScheme?.schemeName ?? "");
      }
    },
    [schemeCodeKey, schemeNameKey, schemeRegNoKey, setFieldValue]
  );

  const setAllScheme = useCallback(() => {
    setFieldValue(schemeCodeKey as string, "all");
    if (schemeNameKey) {
      setFieldValue(schemeNameKey, t("Common.schemeName.all"));
    }
  }, [schemeCodeKey, schemeNameKey, setFieldValue, t]);

  const setTrusteeWithScheme = useCallback(
    (selectedScheme: SelectedScheme) => {
      setFieldValue(trusteeCodeKey as string, selectedScheme.trusteeCode);
      if (trusteeNameKey) {
        setFieldValue(trusteeNameKey, selectedScheme.trusteeName);
      }
    },
    [setFieldValue, trusteeCodeKey, trusteeNameKey]
  );

  const setAllTrustee = useCallback(() => {
    setFieldValue(trusteeCodeKey as string, "all");
    if (trusteeNameKey) {
      setFieldValue(trusteeNameKey, t("Common.trusteeName.all"));
    }
  }, [setFieldValue, trusteeCodeKey, trusteeNameKey, t]);

  const clearTrustee = useCallback(() => {
    setFieldValue(trusteeCodeKey as string, "");
    if (trusteeNameKey) {
      setFieldValue(trusteeNameKey, "");
    }
  }, [setFieldValue, trusteeCodeKey, trusteeNameKey]);

  const handleSchemeChange = useCallback(
    (e: SelectChangeEvent) => {
      if (hasAllOption && e.target.value === "all") {
        setAllScheme();
        setAllTrustee();
        return;
      }

      const selectedScheme = schemeList.find(
        (item) => item.schemeCode === e.target.value
      );
      setScheme(selectedScheme);
      if (selectedScheme) {
        setTrusteeWithScheme(selectedScheme);
      }
    },
    [
      hasAllOption,
      schemeList,
      setAllScheme,
      setAllTrustee,
      setScheme,
      setTrusteeWithScheme,
    ]
  );

  const handleTrusteeChange = useCallback(
    (e: SelectChangeEvent) => {
      const newTrusteeCode = e.target.value;

      if (!newTrusteeCode) {
        clearTrustee();
        setScheme(undefined);
        return;
      }

      if (hasAllOption && newTrusteeCode === "all") {
        setAllTrustee();
        return;
      }

      // Update trustee data
      const anySchemeMatchingTrusteeCode = schemeList.find(
        (item) => item.trusteeCode === newTrusteeCode
      );
      /* istanbul ignore next */

      if (!anySchemeMatchingTrusteeCode) {
        console.warn(
          `Unable to find scheme matching trustee code ${newTrusteeCode}`
        );
        return;
      }
      setTrusteeWithScheme(anySchemeMatchingTrusteeCode);

      // Update scheme data
      const schemeMatchingTrusteeAndSchemeCode = schemeList.find(
        (item) =>
          item.trusteeCode === e.target.value && item.schemeCode === schemeCode
      );
      setScheme(schemeMatchingTrusteeAndSchemeCode);
    },
    [
      hasAllOption,
      schemeList,
      setTrusteeWithScheme,
      setScheme,
      clearTrustee,
      setAllTrustee,
      schemeCode,
    ]
  );

  return {
    trusteeSelectProps: {
      onChange: handleTrusteeChange,
      onBlur: handleBlur,
      children: filteredTrusteeList.map(renderSelectCommonOption),
      value: trusteeCode,
    },
    schemeSelectProps: {
      onChange: handleSchemeChange,
      onBlur: handleBlur,
      children: filteredSchemeList.map(renderSelectCommonOption),
      value: schemeCode,
    },
  };
}

export default useSchemeTrusteeSelectProps;
