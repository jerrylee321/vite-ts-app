import { LookupFn } from "../types/lookup";

import { applyLookupColumns } from "./lookup";

interface MockModel {
  name: string;
  hobby: string;
  favorite: string;
}

describe("applyLookupColumns", () => {
  test("apply", () => {
    const columns = applyLookupColumns<MockModel>(
      [
        { accessor: "name", i18nKey: "AppBarTitle.appTitle" },
        { accessor: "hobby", i18nKey: "AppBarTitle.appTitle" },
        { id: "fav", accessor: "favorite", i18nKey: "AppBarTitle.appTitle" },
      ],
      {
        name: ((v: string) => `mock-${v}`) as LookupFn,
        fav: ((v: string) => `test-${v}`) as LookupFn,
        nonexistent: ((v: string) => `no-${v}`) as LookupFn,
      }
    );

    expect(columns[0].lookup?.("hello")).toEqual("mock-hello");
    expect(columns[2].lookup?.("hello")).toEqual("test-hello");
  });
});
