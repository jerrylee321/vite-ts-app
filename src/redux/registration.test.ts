import reducer, { requestOTP, reset, verifyOTP } from "./registration";

describe("registration reducer", () => {
  const mockTrusteeId = "trusteeId";
  const mockSubmissionId = "submissionId";
  const mockAccountSetUpAccessToken = "token";
  test("should have initial state", () => {
    const { stage } = reducer(undefined, {
      type: undefined,
    });
    expect(stage).toEqual("initial");
  });

  test("should handle request OTP payload", () => {
    const { stage, email, trusteeId } = reducer(
      undefined,
      requestOTP({
        email: "abc@example.com",
        trusteeId: mockTrusteeId,
      })
    );
    expect(stage).toEqual("otp");
    expect(email).toEqual("abc@example.com");
    expect(trusteeId).toEqual(mockTrusteeId);
  });

  test("should handle verify OTP", () => {
    const { stage } = reducer(
      undefined,
      verifyOTP({
        submissionId: mockSubmissionId,
        accountSetUpAccessToken: mockAccountSetUpAccessToken,
      })
    );
    expect(stage).toEqual("setUp");
  });

  test("should set Up", () => {
    const { stage } = reducer(undefined, reset());
    expect(stage).toEqual("initial");
  });
});
