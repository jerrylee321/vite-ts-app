import { mockRequest } from "../../__mocks__/axios";
import { renderHookWithProviders } from "../utils/test/render";

import useChangePassword from "./useChangePassword";

beforeEach(() => {
  mockRequest.mockClear();
});

describe("useChangePassword`", () => {
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
    } = renderHookWithProviders(() => useChangePassword());
    const oldValue = "old_pass";
    const newValue = "new_pass";
    await mutateAsync({
      userID: "user-id",
      password: oldValue,
      newPassword: newValue,
    });

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "/trusted/user/changePassword",
        data: expect.objectContaining({
          password: oldValue,
          newPassword: newValue,
        }),
      })
    );
  });
});
