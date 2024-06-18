import React, { ReactElement, useCallback } from "react";

import IdleAlertDialog from "../components/IdleAlertDialog";
import IdleTooLongAlertDialog from "../components/IdleTooLongAlertDialog";

import { useAppIdleTimer } from "./AppIdleTimerProvider";
import { useAuth } from "./AuthProvider";

const IdleAlertProvider = (props: React.PropsWithChildren): ReactElement => {
  const { children } = props;
  const { idleTimer, idleTimerState } = useAppIdleTimer();
  const { logout } = useAuth();

  const onClose = useCallback(() => {
    idleTimer.activate();
    // then, idleTimerState should transit to "active" and thus de-render the dialog
  }, [idleTimer]);

  const onSelectLogout = useCallback(() => {
    logout().catch((err) => {
      console.error("Error occurred when logging out", err);
    });
  }, [logout]);

  return (
    <>
      {children}
      {idleTimerState === "prompt" ? (
        <IdleAlertDialog
          open={true}
          onClose={onClose}
          onSelectLogout={onSelectLogout}
          idleTimer={idleTimer}
        />
      ) : null}
      {/* if idle for too long, the user is logged out when they close the dialog */}
      {idleTimerState === "idle" ? (
        <IdleTooLongAlertDialog open={true} onClose={onSelectLogout} />
      ) : null}
    </>
  );
};

export default IdleAlertProvider;
