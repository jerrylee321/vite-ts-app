import { UserAccountDetails } from "../apis/UserAccountDetailsAPI";
import { PortalAccount } from "../types/Portal";

export const isMpfaOrTrusteePortalAccount = (
  account: PortalAccount
): account is PortalAccount<"mpfa" | "trustee", UserAccountDetails> => {
  return account._portal === "mpfa" || account._portal === "trustee";
};

const useCurrentUserAccountDetails = (): PortalAccount => {
  throw new Error("not implemented, use this only for mocking");
};

export default useCurrentUserAccountDetails;
