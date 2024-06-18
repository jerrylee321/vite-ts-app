import i18n from "../i18n";

import { existsTranslationKey } from "./i18n";

describe("existsTranslationKey", () => {
  it("exists", () => {
    expect(existsTranslationKey(i18n, "AppBarTitle.appTitle")).toBeTruthy();
  });

  it("not exists", () => {
    expect(existsTranslationKey(i18n, "non-existent")).toBeFalsy();
  });
});
