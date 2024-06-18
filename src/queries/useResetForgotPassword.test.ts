import { mockRequest } from "../../__mocks__/axios";
import { renderHookWithProviders } from "../utils/test/render";

import useResetForgotPassword from "./useResetForgotPassword";

beforeEach(() => {
  mockRequest.mockClear();
});

describe("useResetForgotPassword", () => {
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
    } = renderHookWithProviders(() => useResetForgotPassword());
    await mutateAsync({
      verificationCodeId: "ver-code",
      email: "abc@example.com",
      newPassword: "new-password",
    });

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "/trusted/forgotpw/resetPassword",
        data: expect.objectContaining({
          verCodeId: "ver-code",
          email: "abc@example.com",
          newPassword: "new-password",
        }),
      })
    );
  });
});
