import { useQuery, UseQueryResult } from "@tanstack/react-query";

import QueryKeys from "../queries/QueryKeys";
import { makePortalAccount, PortalAccount } from "../types/Portal";

const useQueryUserAccountDetails = (
  userID: string
): UseQueryResult<PortalAccount> => {
  return useQuery({
    queryKey: QueryKeys.userAccountDetails(userID),
    queryFn: async () => {
      throw new Error("not implemented");
    },
    select: (data) => {
      return makePortalAccount("mpfa", data);
    },
  });
};

export default useQueryUserAccountDetails;
