import { loginAction, logoutAction } from "./actions";
import reducer, {
  AuthState,
  error,
  initialize,
  setRedirectPath,
  updateToken,
} from "./auth";

const user = {
  name: "John Doe",
  email: "johndoe@example.com",
  username: "johndoe",
  userID: "24601",
  role: "User",
};

const authenticatedState: AuthState = {
  isAuthenticated: true,
  accessToken: "access-token1",
  refreshToken: "refresh-token1",
  idToken: "id-token1",
  currentUser: user,
  lastError: null,
  isLoggingOut: false,
  lastSessionId: null,
  redirectPath: null,
};
const unauthenticatedState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  idToken: null,
  currentUser: null,
  lastError: null,
  isLoggingOut: false,
  lastSessionId: null,
  redirectPath: null,
};

describe("auth reducer", () => {
  test("should have initial state", () => {
    const { isAuthenticated } = reducer(undefined, { type: undefined });
    expect(isAuthenticated).toEqual(false);
  });

  test("should handle initialize action with unauthenticated payload", () => {
    const { isAuthenticated, accessToken, currentUser, isLoggingOut } = reducer(
      undefined,
      initialize({
        isAuthenticated: false,
      })
    );
    expect(isAuthenticated).toEqual(false);
    expect(accessToken).toEqual(null);
    expect(currentUser).toEqual(null);
    expect(isLoggingOut).toBeFalsy();
  });

  test("should handle initialize action with authenticated payload", () => {
    const {
      isAuthenticated,
      accessToken,
      idToken,
      refreshToken,
      currentUser,
      lastSessionId,
      isLoggingOut,
    } = reducer(
      undefined,
      initialize({
        accessToken: "some-access-token",
        refreshToken: "some-refresh-token",
        idToken: "some-id-token",
        isAuthenticated: true,
        user,
      })
    );
    expect(isAuthenticated).toEqual(true);
    expect(accessToken).toEqual("some-access-token");
    expect(idToken).toEqual("some-id-token");
    expect(refreshToken).toEqual("some-refresh-token");
    expect(currentUser).toMatchObject(user);
    expect(lastSessionId).toBeNull();
    expect(isLoggingOut).toBeFalsy();
  });

  test("should set session id", () => {
    const { lastSessionId } = reducer(
      undefined,
      loginAction({ sessionId: "SID", maintainLastSession: false })
    );
    expect(lastSessionId).toEqual("SID");
  });

  test("should set redirect path", () => {
    const { redirectPath } = reducer(undefined, setRedirectPath("/example"));
    expect(redirectPath).toEqual("/example");
  });

  test("should update token", () => {
    const { accessToken, refreshToken, idToken } = reducer(
      authenticatedState,
      updateToken({
        accessToken: "access-token2",
        refreshToken: "refresh-token2",
        idToken: "id-token2",
      })
    );
    expect(accessToken).toEqual("access-token2");
    expect(refreshToken).toEqual("refresh-token2");
    expect(idToken).toEqual("id-token2");
  });

  test("should not update token if not authenticated", () => {
    const { accessToken, refreshToken, idToken } = reducer(
      unauthenticatedState,
      updateToken({
        accessToken: "access-token2",
        refreshToken: "refresh-token2",
        idToken: "id-token2",
      })
    );
    expect(accessToken).toBeNull();
    expect(refreshToken).toBeNull();
    expect(idToken).toBeNull();
  });

  test("should logout", () => {
    const { isAuthenticated } = reducer(authenticatedState, logoutAction());
    expect(isAuthenticated).toBeFalsy();
  });

  test("should error", () => {
    const err = new Error();
    const { isAuthenticated, lastError } = reducer(
      authenticatedState,
      error(err)
    );
    expect(isAuthenticated).toBeFalsy();
    expect(lastError).toEqual(err);
  });
});
