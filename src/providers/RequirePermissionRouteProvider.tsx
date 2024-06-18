import React, { useContext, useMemo } from "react";

export interface Context {
  groupNameCode: string;
  permitNameCode: string;
}

export const RequirePermissionRouteContext =
  React.createContext<Context | null>(null);

type Props = React.PropsWithChildren<{
  groupNameCode: string;
  permitNameCode: string;
}>;

const RequirePermissionRouteProvider = (props: Props): React.ReactElement => {
  const { groupNameCode, permitNameCode } = props;
  const value = useMemo(
    () => ({
      groupNameCode,
      permitNameCode,
    }),
    [groupNameCode, permitNameCode]
  );

  return (
    <RequirePermissionRouteContext.Provider value={value}>
      {props.children}
    </RequirePermissionRouteContext.Provider>
  );
};

export default RequirePermissionRouteProvider;

export function useRoutePermission(): Context | null {
  return useContext(RequirePermissionRouteContext);
}
