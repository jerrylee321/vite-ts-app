import { ReactElement, useCallback } from "react";
import { Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import cn from "classnames";

import useSelectSchemeHelper from "../../hooks/useSelectSchemeHelper";
import useShowErrors from "../../hooks/useShowErrors";
import { MessageKey } from "../../i18n/LocaleModel";
import AppRoutes from "../../routes/AppRoutes";
import { MuiSelectOverride } from "../../styles/MuiSelectOverride.module.scss";
import AuthDialog, { AuthDialogProps } from "../AuthDialog";

type SelectSchemeDialogProps = Omit<AuthDialogProps, "children">;

/**
 * @empfPortal trustee
 * @empfConnMap Overview - Overview
 * @empfScreenID A5, A8
 * @empfComponent
 * @empfDesc It is a dialog component for "Select Scheme". It wraps the form components.
 * @empfProp open
 * @empfProp onClose
 * @empfAction useQuerySchemeList - Query Scheme List on page load
 * @empfActionDesc useQuerySchemeList - This API is for querying scheme list
 * @empfAPI useQuerySchemeList - UAM-TR-QUERY-MPF-SCHEME-LIST
 */
const SelectSchemeDialog = ({
  open,
  onClose,
}: SelectSchemeDialogProps): ReactElement => {
  const navigate = useNavigate();
  const { bindSelect, bindButton, error } = useSelectSchemeHelper(
    useCallback(() => {
      onClose();
      navigate(AppRoutes.Home.path);
    }, [navigate, onClose])
  );

  useShowErrors([error], { onDismiss: onClose });

  return (
    <AuthDialog open={open} onClose={onClose}>
      <Typography
        variant="h1"
        className="text-center text-xl font-bold uppercase text-auth-contrastText"
      >
        <Trans<MessageKey> i18nKey="SelectSchemeDialog.title" />
      </Typography>
      <FormControl fullWidth={true} className="mt-4">
        <Typography className="my-2 text-xs text-auth-contrastText">
          <Trans<MessageKey> i18nKey="SelectSchemeDialog.pleaseSelect" />
        </Typography>
        <Select
          className={cn(
            MuiSelectOverride,
            "bg-white border-0 text-independence-main font-bold h-12"
          )}
          {...bindSelect()}
        />
        <Button
          className="mx-auto mt-6 rounded-full bg-auth-action-main px-6 py-1 text-auth-action-contrastText disabled:bg-gray-main"
          {...bindButton()}
        >
          <Trans<MessageKey> i18nKey="SelectSchemeDialog.switch" />
        </Button>
      </FormControl>
    </AuthDialog>
  );
};

export default SelectSchemeDialog;
