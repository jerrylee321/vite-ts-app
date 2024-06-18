import React, { ReactElement, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";

import MessageDialogWithActions, {
  DialogIconType,
} from "../components/MessageDialogWithActions";
import useGenerateErrorContent, {
  ErrorContentFunction,
} from "../hooks/useGenerateErrorContent";
import { isUserSessionEndingError } from "../utils/errors";

import { useAuth } from "./AuthProvider";

export interface ErrorAlertShowOptions {
  onDismiss?: () => void;
  iconType?: DialogIconType;
  hideErrorCode?: boolean;
  logoutOnDismiss?: boolean;
  contentFn?: ErrorContentFunction;
}

interface ErrorAlertContextValue {
  show: (error: unknown, options?: ErrorAlertShowOptions) => void;
  dismiss: () => void;
  isShowingError: boolean;
}

const ErrorAlertContext = React.createContext<ErrorAlertContextValue>(
  null as any
);

const ErrorAlertProvider = (props: React.PropsWithChildren): ReactElement => {
  const { children } = props;
  const { logout } = useAuth();
  const [error, setError] = useState<unknown>(null);
  const [showOptions, setShowOptions] = useState<ErrorAlertShowOptions>({});
  const defaultGenerateErrorContentFn = useGenerateErrorContent();
  const {
    onDismiss,
    logoutOnDismiss = false,
    hideErrorCode = false,
    iconType = "system-alert",
    contentFn: generateErrorContent = defaultGenerateErrorContentFn,
  } = showOptions;
  const [isShowingError, setIsShowingError] = useState<boolean>(false);

  const show = useCallback(
    (err: unknown, options: ErrorAlertShowOptions = {}) => {
      setError(err);
      setIsShowingError(true);
      setShowOptions({
        ...options,
        logoutOnDismiss:
          !!options.logoutOnDismiss || isUserSessionEndingError(err),
      });
    },
    []
  );

  const clear = useCallback(() => {
    setError(null);
    setIsShowingError(false);
    setShowOptions({});
  }, []);

  const dismiss = useCallback(() => {
    setIsShowingError(false);
    onDismiss?.();
    if (logoutOnDismiss) {
      logout().catch(console.error);
    }
  }, [onDismiss, logoutOnDismiss, logout]);

  const { t } = useTranslation();
  const value = useMemo(
    (): ErrorAlertContextValue => ({
      show,
      dismiss,
      isShowingError,
    }),
    [dismiss, show, isShowingError]
  );

  const {
    title,
    message: body,
    itemized,
    traceId,
  } = useMemo(
    () => generateErrorContent(error, { hideErrorCode }),
    [generateErrorContent, error, hideErrorCode]
  );

  return (
    <ErrorAlertContext.Provider value={value}>
      {children}
      <MessageDialogWithActions
        data-testid="ErrorAlertProviderDialog"
        title={title}
        body={
          <>
            <Typography className="whitespace-pre-wrap text-sm">
              {body}
            </Typography>
            {itemized && itemized.length > 0 ? (
              <ul className="mt-2">
                {itemized.map((item, i) => {
                  const key = `${i}`;
                  return (
                    <li key={key} className="text-sm">
                      {item}
                    </li>
                  );
                })}
              </ul>
            ) : null}
            {traceId ? (
              <Typography className="mt-1 whitespace-pre-wrap text-sm">
                {traceId}
              </Typography>
            ) : null}
          </>
        }
        icon={iconType}
        onClose={dismiss}
        open={isShowingError}
        buttons={[
          {
            text: logoutOnDismiss ? t("ErrorAlert.logout") : t("ErrorAlert.ok"),
            style: "primary",
            "data-testid": "ErrorAlertProviderDialogConfirmBtn",
          },
        ]}
        TransitionProps={{
          // This keeps the error state variable until the dialog is completely
          // hidden from view.
          onExited: clear,
        }}
      />
    </ErrorAlertContext.Provider>
  );
};

export default ErrorAlertProvider;

export const useErrorAlert = (): ErrorAlertContextValue => {
  const value = React.useContext(ErrorAlertContext);
  return value;
};
