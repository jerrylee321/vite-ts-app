import { loginAction } from "./actions";
import reducer, { initialize, reset } from "./verifyAuth";

describe("verify auth reducer", () => {
  test("should have initial state", () => {
    const theState = reducer(undefined, { type: undefined });
    expect(theState).toBeNull();
  });

  test("should handle initialize action", () => {
    const { verificationToken, verificationCodeId } =
      reducer(
        undefined,
        initialize({
          verificationCodeId: "code-id",
          verificationToken: "token",
        })
      ) ?? {};
    expect(verificationToken).toEqual("token");
    expect(verificationCodeId).toEqual("code-id");
  });

  test("should handle reset action", () => {
    const theState = reducer(
      {
        verificationCodeId: "code-id",
        verificationToken: "token",
      },
      reset()
    );
    expect(theState).toBeNull();
  });

  test("should handle login action", () => {
    const theState = reducer(
      {
        verificationCodeId: "code-id",
        verificationToken: "token",
      },
      loginAction({ sessionId: "SID", maintainLastSession: false })
    );
    expect(theState).toBeNull();
  });
});
