import { getSuccessQueryResult } from "../../utils/test/queries";
import useQuerySchemeListActual from "../useQuerySchemeList";

const useQuerySchemeList: typeof useQuerySchemeListActual = jest
  .fn()
  .mockReturnValue(
    getSuccessQueryResult([
      {
        schemeCode: "schemeCode",
        schemeName: "TESTschemeName",
        schemeRegNo: "MT00171",
        schemeUuid: "scUuid1",
        trusteeCode: "trCode",
        trusteeUuid: "trUuid1",
      },
    ])
  );

export default useQuerySchemeList;
