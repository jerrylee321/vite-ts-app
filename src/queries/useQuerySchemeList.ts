import { useQuery, UseQueryResult } from "@tanstack/react-query";

import {
  makeSchemeListAPISchema,
  SchemeListResponse,
} from "../apis/SchemeListAPI";
import { useAPIClient } from "../providers/APIClientProvider";
import { PortalType } from "../types/Portal";

import QueryKeys from "./QueryKeys";

/**
 * API ID: UAM-TR-QUERY-MPF-SCHEME-LIST
 */
const useQuerySchemeList = (
  userId: string,
  portal: PortalType
): UseQueryResult<SchemeListResponse["payload"]> => {
  const { apiClient } = useAPIClient();
  return useQuery({
    queryKey: QueryKeys.schemeList(userId),
    queryFn: async () => {
      const apiSchema = makeSchemeListAPISchema(userId, portal);
      const res = await apiClient.execute(apiSchema, undefined);
      return res.payload;
    },
  });
};

export default useQuerySchemeList;
