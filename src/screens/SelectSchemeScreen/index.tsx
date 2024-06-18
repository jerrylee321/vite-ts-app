import { ReactElement, useCallback, useMemo } from "react";
import { Trans } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import cn from "classnames";

import useSelectSchemeHelper from "../../hooks/useSelectSchemeHelper";
import useShowErrors from "../../hooks/useShowErrors";
import { MessageKey } from "../../i18n/LocaleModel";
import { useCurrentUser } from "../../providers/AuthProvider";
import AppRoutes from "../../routes/AppRoutes";
import { MuiSelectOverride } from "../../styles/MuiSelectOverride.module.scss";

/**
 * @empfPortal trustee
 * @empfConnMap Overview - Login
 * @empfScreenID B3
 * @empfComponent
 * @empfDesc It is a screen component of "Overview - Login" for selecing scheme. It wraps the form component.
 * @empfAction useQuerySchemeList - Query Scheme List on page load
 * @empfActionDesc useQuerySchemeList - This API is for querying scheme list
 * @empfAPI useQuerySchemeList - UAM-TR-QUERY-MPF-SCHEME-LIST
 */
const SelectSchemeScreen = (): ReactElement => {
  const user = useCurrentUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectPath = useMemo(() => {
    const path = searchParams.get("redirect_path");
    return path?.startsWith("/") ? path : AppRoutes.Home.path;
  }, [searchParams]);

  const { bindSelect, bindButton, error } = useSelectSchemeHelper(
    useCallback(() => {
      navigate(redirectPath);
    }, [navigate, redirectPath])
  );

  useShowErrors([error], { logoutOnDismiss: true });

  return (
    <main>
      <Typography
        variant="h1"
        className="text-center text-xl font-bold text-auth-contrastText"
      >
        <Trans<MessageKey> i18nKey="AuthLayout.appTitle" />
      </Typography>
      <Typography
        variant="h2"
        className="text-center text-lg uppercase text-auth-contrastText"
      >
        <Trans<MessageKey> i18nKey="SelectSchemeScreen.title" />
      </Typography>
      <Typography className="my-10 text-center text-xl font-bold text-auth-contrastText">
        <Trans<MessageKey>
          i18nKey="SelectSchemeScreen.welcome"
          values={{
            name: user.name,
          }}
        />
      </Typography>
      <FormControl fullWidth={true}>
        <Typography className="my-2 text-xs text-auth-contrastText">
          <Trans<MessageKey> i18nKey="SelectSchemeScreen.pleaseSelect" />
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
          <Trans<MessageKey> i18nKey="SelectSchemeScreen.enter" />
        </Button>
      </FormControl>
    </main>
  );
};

export default SelectSchemeScreen;
