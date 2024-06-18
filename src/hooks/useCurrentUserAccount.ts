import { useContext } from "react";

import { CurrentUserAccountContext } from "../providers/CurrentUserAccountProvider";
import { PortalAccount } from "../types/Portal";

const useCurrentUserAccount = (): PortalAccount => {
  return useContext(CurrentUserAccountContext);
};
export default useCurrentUserAccount;
