export const isMpfaOrTrusteePortalAccount = jest.requireActual(
  "../useCurrentUserAccountDetails"
).isMpfaOrTrusteePortalAccount;

export default jest
  .fn<
    ReturnType<typeof import("../useCurrentUserAccountDetails").default>,
    []
  >()
  .mockImplementation(
    jest.requireActual("../useCurrentUserAccountDetails").default
  );
