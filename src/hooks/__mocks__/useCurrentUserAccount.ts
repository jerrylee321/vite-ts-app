import { PortalAccount } from "../../types/Portal";

const useCurrentUserAccount = jest.fn((): PortalAccount => {
  throw new Error("not implemented");
});

export default useCurrentUserAccount;
