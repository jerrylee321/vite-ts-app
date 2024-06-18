import React, { PropsWithChildren, ReactElement } from "react";

import { PortalAccount } from "../types/Portal";

type CurrentUserAccountContextValue = PortalAccount;

export const CurrentUserAccountContext =
  React.createContext<CurrentUserAccountContextValue>(undefined!);

interface CurrentUserAccountProviderProps extends PropsWithChildren {
  account: PortalAccount;
}

const CurrentUserAccountProvider = ({
  children,
  account,
}: CurrentUserAccountProviderProps): ReactElement => {
  return (
    <CurrentUserAccountContext.Provider value={account}>
      {children}
    </CurrentUserAccountContext.Provider>
  );
};

export default CurrentUserAccountProvider;
