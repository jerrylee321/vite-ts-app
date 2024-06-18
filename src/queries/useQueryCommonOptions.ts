import { useQuery, UseQueryResult } from "@tanstack/react-query";

import {
  CommonOptionsAPISchema,
  CommonOptionsType,
} from "../apis/CommonOptionsAPI";
import { CommonOptionsItem } from "../apis/models/CommonScheme";
import { CommonOption } from "../models/option";
import { useAPIClient } from "../providers/APIClientProvider";
import groupBy from "../utils/groupBy";

import QueryKeys from "./QueryKeys";
import { CommonQueryObserverOptions } from "./types";

const transform = (data: CommonOptionsItem[]): CommonOption[] => {
  return data.map(({ key, en: name }) => {
    return { key, name };
  });
};

export const transformByKey = (
  data: CommonOptionsItem[]
): Record<string, CommonOption | undefined> => {
  return groupBy(
    data.map(({ key, en: name }) => {
      return { key, name };
    }),
    ({ key }) => key
  );
};

const useQueryCommonOptions = (
  type: CommonOptionsType,
  options?: CommonQueryObserverOptions
): UseQueryResult<CommonOption[]> => {
  const { apiClient } = useAPIClient();
  const request = { type };

  return useQuery({
    queryKey: QueryKeys.commonOptions(request),
    queryFn: async () => {
      const res = await apiClient.execute(CommonOptionsAPISchema, request);
      return res.payload[type];
    },
    select: transform,
    ...options,
  });
};

export const useQueryCommonOptionsByKey = (
  type: CommonOptionsType,
  options?: CommonQueryObserverOptions
): UseQueryResult<Record<string, CommonOption | undefined>> => {
  const { apiClient } = useAPIClient();
  const request = { type };

  return useQuery({
    queryKey: QueryKeys.commonOptions(request),
    queryFn: async () => {
      const res = await apiClient.execute(CommonOptionsAPISchema, request);
      return res.payload[type];
    },
    select: transformByKey,
    ...options,
  });
};

export default useQueryCommonOptions;
