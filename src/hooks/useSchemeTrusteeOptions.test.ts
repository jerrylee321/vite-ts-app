import useQuerySchemeList from "../queries/useQuerySchemeList";
import { getSuccessQueryResult } from "../utils/test/queries";
import { renderHookWithProviders } from "../utils/test/render";

import useSchemeTrusteeOptions from "./useSchemeTrusteeOptions";

jest.mock("../queries/useQuerySchemeList");
jest.mocked(useQuerySchemeList).mockReturnValue(
  getSuccessQueryResult([
    {
      schemeCode: "sc1",
      schemeName: "Scheme Name 1",
      schemeRegNo: "MT00171",
      schemeUuid: "scUuid1",
      trusteeCode: "trc1",
      trusteeUuid: "trUuid1",
    },
    {
      schemeCode: "sc2",
      schemeName: "Scheme Name 2",
      schemeRegNo: "MT00172",
      schemeUuid: "scUuid2",
      trusteeCode: "trc2",
      trusteeUuid: "trUuid2",
    },
    {
      schemeCode: "sc1",
      schemeName: "Scheme Name 1",
      schemeRegNo: "MT00173",
      schemeUuid: "scUuid1",
      trusteeCode: "trc3",
      trusteeUuid: "trUuid3",
    },
    {
      schemeCode: "sc3",
      schemeName: "Scheme Name 3",
      schemeRegNo: "MT00172",
      schemeUuid: "scUuid3",
      trusteeCode: "trc3",
      trusteeUuid: "trUuid3",
    },
  ])
);

jest.mock("../queries/useQueryCommonOptions", () => ({
  __esModule: true,
  default: jest.fn(),
  useQueryCommonOptionsByKey: jest.fn(() =>
    getSuccessQueryResult({
      trc1: { key: "trc1", name: "Trustee Name 1" },
      trc2: { key: "trc2", name: "Trustee Name 2" },
      trc3: { key: "trc3", name: "Trustee Name 3" },
    })
  ),
}));

describe("useSchemeTrusteeOptions", () => {
  test("shoule return filtered scheme options", () => {
    const {
      result: {
        current: { filteredSchemeList, filteredTrusteeList },
      },
    } = renderHookWithProviders(() => useSchemeTrusteeOptions("trc1"));

    expect(filteredSchemeList).toEqual([{ key: "sc1", name: "Scheme Name 1" }]);
    expect(filteredTrusteeList).toEqual([
      {
        key: "trc1",
        name: "Trustee Name 1",
      },
      {
        key: "trc2",
        name: "Trustee Name 2",
      },
      {
        key: "trc3",
        name: "Trustee Name 3",
      },
    ]);
  });
});
