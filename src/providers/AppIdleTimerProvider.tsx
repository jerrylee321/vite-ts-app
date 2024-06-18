import React, {
  Dispatch,
  PropsWithChildren,
  ReactElement,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { IIdleTimer, useIdleTimer } from "react-idle-timer";

import Config from "../Config";
import { PortalType } from "../types/Portal";

// NOTE: IdleTimer library has built in provider / context but does not expose a state, so we are making our own here

type IdleTimerState = "initial" | "active" | "prompt" | "idle";

interface AppIdleTimerContextValue {
  idleTimer: IIdleTimer;
  idleTimerState: IdleTimerState;
  didLogoutInOtherTab: boolean;
  resetDidLogoutInOtherTab: () => void;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
}

const AppIdleTimerContext = React.createContext<AppIdleTimerContextValue>(
  null as any
);

export interface AppIdleTimerProviderProps extends PropsWithChildren {
  portal: PortalType;
}

const AppIdleTimerProvider = (
  props: AppIdleTimerProviderProps
): ReactElement => {
  const { children, portal } = props;

  const [idleTimerState, setIdleTimerState] =
    useState<IdleTimerState>("initial");
  // Idle Timer is enabled at AuthProvider, when keycloak state is restored or user logins.
  const [disabled, setDisabled] = useState(true);

  const [didLogoutInOtherTab, setDidLogoutInOtherTab] = useState(false);

  const onPrompt = useCallback(() => {
    // State cannot go back to other state if already in 'idle'.
    setIdleTimerState((oldValue) => (oldValue !== "idle" ? "prompt" : "idle"));
  }, []);
  const onActive = useCallback(() => {
    // State cannot go back to other state if already in 'idle'.
    setIdleTimerState((oldValue) => (oldValue !== "idle" ? "active" : "idle"));
  }, []);
  const onIdle = useCallback(() => {
    setIdleTimerState("idle");
  }, []);
  const onMessage = useCallback((data: any) => {
    if (data === "logout") {
      setDidLogoutInOtherTab(true);
    }
  }, []);

  const resetDidLogoutInOtherTab = useCallback(() => {
    setDidLogoutInOtherTab(false);
  }, []);

  const idleTimer = useIdleTimer({
    onPrompt: onPrompt,
    onActive: onActive,
    onIdle: onIdle,
    onMessage: onMessage,
    promptBeforeIdle: parseInt(Config.idleWarningSeconds, 10) * 1000,
    timeout: parseInt(Config.idleLogoutSeconds, 10) * 1000,
    crossTab: true,
    leaderElection: true,
    syncTimers: 200,
    disabled,
    name: portal,
  });

  const value = useMemo((): AppIdleTimerContextValue => {
    return {
      idleTimer: idleTimer,
      idleTimerState,
      didLogoutInOtherTab,
      resetDidLogoutInOtherTab,
      disabled,
      setDisabled,
    };
  }, [
    didLogoutInOtherTab,
    idleTimer,
    idleTimerState,
    resetDidLogoutInOtherTab,
    disabled,
    setDisabled,
  ]);

  return (
    <AppIdleTimerContext.Provider value={value}>
      {children}
    </AppIdleTimerContext.Provider>
  );
};

export default AppIdleTimerProvider;

export const useAppIdleTimer = (): AppIdleTimerContextValue => {
  return useContext(AppIdleTimerContext);
};
