import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { ButtonProps } from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent, SelectProps } from "@mui/material/Select";

import { SchemeListScheme } from "../apis/models/SchemeList";
import { CustomError } from "../models/errors";
import { useAuth, useCurrentUser } from "../providers/AuthProvider";
import { useQueryCommonOptionsByKey } from "../queries/useQueryCommonOptions";
import useQuerySchemeList from "../queries/useQuerySchemeList";
import { select } from "../redux/scheme";

import useShowErrors from "./useShowErrors";

interface UseSelectSchemeHelperValues {
  bindSelect: () => Partial<SelectProps<string>>;
  bindButton: () => Partial<ButtonProps>;
  isLoading: boolean;
  error: unknown;
}

const useSelectSchemeHelper = (
  onSelect?: (scheme: SchemeListScheme) => void
): UseSelectSchemeHelperValues => {
  const { userID } = useCurrentUser();
  const { portal } = useAuth();

  const { t } = useTranslation();

  const {
    data: schemeList,
    error: schemeListError,
    isLoading: schemeListIsLoading,
  } = useQuerySchemeList(userID, portal);

  const { data: trusteeOptions, error: trusteeOptionsError } =
    useQueryCommonOptionsByKey("cmn_trustee");

  const emptySchemeListError = useMemo(() => {
    if (!schemeListError && !schemeListIsLoading && schemeList?.length === 0) {
      return new CustomError(t("SelectSchemeScreen.noScheme"));
    }
    return null;
  }, [schemeList?.length, schemeListError, schemeListIsLoading, t]);

  const [selectedSchemeUuid, setSelectedSchemeUuid] = useState<string>("");
  const dispatch = useDispatch();

  const handleChange = useCallback((event: SelectChangeEvent) => {
    setSelectedSchemeUuid(event.target.value);
  }, []);

  const selectedItem = useMemo(
    () =>
      schemeList?.find(({ schemeUuid }) => schemeUuid === selectedSchemeUuid),
    [schemeList, selectedSchemeUuid]
  );

  const handleConfirm = useCallback(
    (item: SchemeListScheme) => {
      const selectedTrusteeOption = trusteeOptions?.[item.trusteeCode];
      dispatch(
        select({
          ...item,
          trusteeName: selectedTrusteeOption?.name ?? item.trusteeCode,
        })
      );
      onSelect?.(item);
    },
    [dispatch, onSelect, trusteeOptions]
  );

  const bindSelect = useCallback(() => {
    return {
      onChange: handleChange,
      value: selectedSchemeUuid,
      disabled: !schemeList,
      children: schemeList?.map(({ schemeName, schemeUuid }) => (
        <MenuItem key={schemeUuid} value={schemeUuid} data-testid={schemeUuid}>
          {schemeName}
        </MenuItem>
      )),
    };
  }, [handleChange, selectedSchemeUuid, schemeList]);

  const bindButton = useCallback(() => {
    if (selectedItem) {
      return {
        disabled: false,
        onClick: () => handleConfirm(selectedItem),
      };
    }
    return {
      disabled: true,
    };
  }, [handleConfirm, selectedItem]);

  // NOTE: This error is handled differently because the trustee name is not
  // required for selecting a scheme.
  // We tell the user that there was an error but allow the user to select
  // a scheme.
  useShowErrors([trusteeOptionsError]);

  return {
    bindSelect,
    bindButton,
    isLoading: schemeListIsLoading,
    // NOTE: The error for querying trustee name is ignored because it is not
    // required for operation of the scheme selection.
    error: schemeListError ?? emptySchemeListError,
  };
};

export default useSelectSchemeHelper;
