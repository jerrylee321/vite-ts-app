import { useMemo } from "react";

import { CommonOption } from "../models/option";
import { useAuth, useCurrentUser } from "../providers/AuthProvider";
import { useQueryCommonOptionsByKey } from "../queries/useQueryCommonOptions";
import useQuerySchemeList from "../queries/useQuerySchemeList";
import { SelectedScheme } from "../redux/scheme";

import useShowErrors from "./useShowErrors";

export interface UseSchemeTrusteeOptionsReturns {
  filteredSchemeList: CommonOption[];
  filteredTrusteeList: CommonOption[];
  schemeList: SelectedScheme[];
}

const useSchemeTrusteeOptions = (
  selectedTrusteeCode: string | undefined | null
): UseSchemeTrusteeOptionsReturns => {
  const { userID } = useCurrentUser();
  const { portal } = useAuth();

  const { data: schemeListResponse, error: schemeListError } =
    useQuerySchemeList(userID, portal);

  const { data: trusteeOptionByKey, error: trusteeOptionByKeyError } =
    useQueryCommonOptionsByKey("cmn_trustee");

  const schemeList = useMemo(
    (): SelectedScheme[] =>
      schemeListResponse?.map((item) => {
        return {
          ...item,
          trusteeName: trusteeOptionByKey?.[item.trusteeCode]?.name ?? "",
        };
      }) ?? [],
    [schemeListResponse, trusteeOptionByKey]
  );

  useShowErrors([schemeListError, trusteeOptionByKeyError]);

  const filteredSchemeList = useMemo(() => {
    const filteredList = schemeList
      .filter((scheme) => {
        return (
          selectedTrusteeCode == null ||
          selectedTrusteeCode === "" ||
          scheme.trusteeCode === selectedTrusteeCode
        );
      })
      .map((item) => {
        return {
          key: item.schemeCode,
          name: item.schemeName,
        };
      });

    return [...new Map(filteredList.map((v) => [v.key, v])).values()];
  }, [schemeList, selectedTrusteeCode]);

  const filteredTrusteeList = useMemo(() => {
    const filteredList = schemeList.map((item) => {
      return {
        key: item.trusteeCode,
        name: item.trusteeName,
      };
    });

    return [...new Map(filteredList.map((v) => [v.key, v])).values()];
  }, [schemeList]);

  const returns = useMemo((): UseSchemeTrusteeOptionsReturns => {
    return {
      filteredSchemeList,
      filteredTrusteeList,
      schemeList,
    };
  }, [filteredSchemeList, filteredTrusteeList, schemeList]);

  return returns;
};

export default useSchemeTrusteeOptions;
