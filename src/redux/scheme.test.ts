import { loginAction, logoutAction } from "./actions";
import reducer, { select, SelectedScheme } from "./scheme";

describe("scheme reducer", () => {
  const scheme: SelectedScheme = {
    schemeCode: "code",
    schemeName: "name",
    schemeRegNo: "RegNo",
    schemeUuid: "uuid",
    trusteeCode: "trCode",
    trusteeName: "trName",
    trusteeUuid: "trUuid",
  };
  test("should have initial state", () => {
    const { selectedScheme } = reducer(undefined, { type: undefined });
    expect(selectedScheme).toBeNull();
  });

  test("should select a scheme", () => {
    const { selectedScheme } = reducer(undefined, select(scheme));
    expect(selectedScheme).not.toBeNull();
    if (selectedScheme) {
      expect(selectedScheme.schemeCode).toEqual("code");
      expect(selectedScheme.schemeName).toEqual("name");
      expect(selectedScheme.trusteeName).toEqual("trName");
    }
  });

  test("should deselect a scheme", () => {
    const { selectedScheme } = reducer(undefined, select(null));
    expect(selectedScheme).toBeNull();
  });

  test("should clear scheme when logging in", () => {
    const { selectedScheme } = reducer(
      { selectedScheme: scheme },
      loginAction({ sessionId: "SID", maintainLastSession: false })
    );
    expect(selectedScheme).toBeNull();
  });

  test("should clear scheme when logging out", () => {
    const { selectedScheme } = reducer(
      { selectedScheme: scheme },
      logoutAction()
    );
    expect(selectedScheme).toBeNull();
  });

  test("should not clear scheme when maintain last session is true", () => {
    const { selectedScheme } = reducer(
      { selectedScheme: scheme },
      loginAction({ sessionId: "SID", maintainLastSession: true })
    );
    expect(selectedScheme).not.toBeNull();
  });
});
