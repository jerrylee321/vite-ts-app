import { getLoadingQueryResult } from "../../utils/test/queries";

function useQueryUserFunctionMenu() {
  return getLoadingQueryResult();
}

export default jest.fn(useQueryUserFunctionMenu);
