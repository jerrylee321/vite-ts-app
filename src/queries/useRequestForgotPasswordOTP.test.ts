import { mockRequest } from "../../__mocks__/axios";
import { renderHookWithProviders } from "../utils/test/render";

import useRequestForgotPasswordOTP from "./useRequestForgotPasswordOTP";

beforeEach(() => {
  mockRequest.mockClear();
});

describe("useRequestForgotPasswordOTP`", () => {
  it("mutate", async () => {
    mockRequest.mockImplementation(() => {
      return {
        data: {
          success: true,
          code: 200,
          payload: {
            accessToken: "access-token",
            expiresIn: 900,
            verCodeId: "ver-code",
          },
        },
      };
    });
    const {
      result: {
        current: { mutateAsync },
      },
    } = renderHookWithProviders(() => useRequestForgotPasswordOTP());
    const result = await mutateAsync({ email: "abc@example.com" });
    expect(result).toMatchObject({
      accessToken: "access-token",
      expiresIn: 900,
      verCodeId: "ver-code",
    });

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "/trusted/forgotpw/public/requestOtp",
        data: expect.objectContaining({
          email: "abc@example.com",
        }),
      })
    );
  });
});
