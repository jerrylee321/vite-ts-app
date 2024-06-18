import { UseQueryResult } from "@tanstack/react-query";
import { CommonOption } from "frontend-common/src/models/option";
import { CommonQueryObserverOptions } from "frontend-common/src/queries/types";
import useQueryCommonOptions from "frontend-common/src/queries/useQueryCommonOptions";

const useQueryDepartmentList = (
  options?: CommonQueryObserverOptions
): UseQueryResult<CommonOption[]> => {
  return useQueryCommonOptions("uamMpfaDeptName", options);
};

export default useQueryDepartmentList;
