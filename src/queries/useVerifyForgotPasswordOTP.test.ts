import { mockRequest } from "../../__mocks__/axios";
import { renderHookWithProviders } from "../utils/test/render";

import useVerifyForgotPasswordOTP from "./useVerifyForgotPasswordOTP";

beforeEach(() => {
  mockRequest.mockClear();
});

describe("useVerifyForgotPasswordOTP", () => {
  it("mutate", async () => {
    mockRequest.mockImplementation(() => {
      return {
        data: {
          success: true,
          code: 200,
          payload: {
            code: "SUCCESS",
            message: {
              en: "some en message",
              zhHK: "some hk message",
              zhCN: "some cn message",
            },
            submitTime: "2022-09-04T22:50:14.912+08:00",
          },
        },
      };
    });
    const {
      result: {
        current: { mutateAsync },
      },
    } = renderHookWithProviders(() => useVerifyForgotPasswordOTP());
    await mutateAsync({
      verificationCodeId: "ver-code",
      otp: "123456",
      email: "abc@example.com",
    });

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "/trusted/forgotpw/verifyOtp",
        data: expect.objectContaining({
          verCodeId: "ver-code",
          otp: "123456",
          email: "abc@example.com",
        }),
      })
    );
  });
});
