import { schemeNameToId } from "./model";

const mockSchemeName = "mock scheme name";

describe("UserGroupList model", () => {
  test("schemeNameToId", () => {
    const schemeTableAccessor = schemeNameToId(mockSchemeName);
    expect(schemeTableAccessor).toEqual("mockschemename");
  });
});
