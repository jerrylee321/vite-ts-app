import { useQuery, UseQueryResult } from "@tanstack/react-query";

import {
  UserFunctionMenuAPISchema,
  UserFunctionMenuRequest,
  UserFunctionMenuResponse,
} from "../apis/UserFunctionMenuAPI";
import { useAPIClient } from "../providers/APIClientProvider";
import { useAuth } from "../providers/AuthProvider";
import { PortalType } from "../types/Portal";

import QueryKeys from "./QueryKeys";

function mapPortalTypeToPlatform(
  portalType: PortalType
): UserFunctionMenuRequest["platform"] {
  switch (portalType) {
    case "mpfa":
      return "MPFA";
    case "orso":
      return "ORSO";
    case "trustee":
      return "TR";
    default: {
      const s: never = portalType;
      console.warn(`Unknown step: ${s as any as string}`);
      return "MPFA"; // Just a dummy value
    }
  }
}

function useQueryUserFunctionMenu(
  request?: Omit<UserFunctionMenuRequest, "platform">
): UseQueryResult<UserFunctionMenuResponse["payload"]> {
  const { apiClient } = useAPIClient();
  const { portal } = useAuth();
  const platform = mapPortalTypeToPlatform(portal);
  return useQuery({
    queryKey: QueryKeys.userFunctionMenu({
      platform,
      ...request,
    }),
    queryFn: async () => {
      const resp = await apiClient.execute(UserFunctionMenuAPISchema, {
        platform,
        ...request,
      });
      return resp.payload;
    },
  });
}

export default useQueryUserFunctionMenu;
