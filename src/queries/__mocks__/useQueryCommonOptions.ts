import { getSuccessQueryResult } from "frontend-common/src/utils/test/queries";

import { CommonOptionsType } from "../../apis/CommonOptionsAPI";
import useQueryCommonOptionsActual, {
  useQueryCommonOptionsByKey as useQueryCommonOptionsByKeyActual,
} from "../useQueryCommonOptions";

export const testTrustees = [
  { key: "[test trustee 1 key]", name: "[test trustee 1 name]" },
  { key: "[test trustee 2 key]", name: "[test trustee 2 name]" },
];

export const testSchemes = [
  { key: "[test scheme 1 key]", name: "[test scheme 1 name]" },
  { key: "[test scheme 2 key]", name: "[test scheme 2 name]" },
];
export const testTarget = [
  { key: "ER", name: "ER" },
  { key: "EE", name: "EE" },
  { key: "ER_EE", name: "ER_EE" },
  { key: "SEP", name: "SEP" },
];
export const testParReturnType = [
  {
    key: "testReturnType",
    name: "Test Return Type",
  },
];
export const testReportVersion = [
  {
    key: "testReportVersion",
    name: "testReportVersionName",
  },
];
export const testReturnType = [
  {
    key: "testReturnType",
    name: "testReturnTypeName",
  },
];
export const testStatReturnType = [
  {
    key: "testReturnType",
    name: "testReturnTypeName",
  },
];
export const testUamMpfaDeptName = [
  { name: "department", key: "department-uuid" },
];
export const testRequestType = [{ key: "PA", name: "PA" }];

const useQueryCommonOptions: typeof useQueryCommonOptionsActual = jest.fn(
  (type: CommonOptionsType) => {
    switch (type) {
      case "cmn_trustee":
        return getSuccessQueryResult(testTrustees);
      case "cmn_scheme":
        return getSuccessQueryResult(testSchemes);
      case "requestTarget":
        return getSuccessQueryResult(testTarget);
      case "parReturnType":
        return getSuccessQueryResult(testParReturnType);
      case "requestType":
        return getSuccessQueryResult(testRequestType);
      case "reportVersion":
        return getSuccessQueryResult(testReportVersion);
      case "returnType":
        return getSuccessQueryResult(testReturnType);
      case "statReturnType":
        return getSuccessQueryResult(testStatReturnType);
      case "uamMpfaDeptName":
        return getSuccessQueryResult(testUamMpfaDeptName);
      default:
        return getSuccessQueryResult([{ key: "code", name: "name" }]);
    }
  }
);

export const useQueryCommonOptionsByKey: typeof useQueryCommonOptionsByKeyActual =
  jest.fn(() => {
    return getSuccessQueryResult({ key: { key: "code", name: "name" } });
  });

export default useQueryCommonOptions;
