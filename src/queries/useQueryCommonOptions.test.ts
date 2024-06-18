import { waitFor } from "@testing-library/react";

import { mockRequest } from "../../__mocks__/axios";
import { renderHookWithProviders } from "../utils/test/render";

import useQueryCommonOptions, { transformByKey } from "./useQueryCommonOptions";

beforeEach(() => {
  mockRequest.mockClear();
});

describe("useQueryCommonOptions", () => {
  it("should render", async () => {
    mockRequest.mockImplementation(() => {
      return {
        data: {
          success: true,
          payload: {
            cmn_scheme: [
              {
                key: "abc",
                zhHK: "zhHK",
                zhCN: "zhCN",
                en: "en",
              },
            ],
          },
        },
      };
    });
    const { result } = renderHookWithProviders(() =>
      useQueryCommonOptions("cmn_scheme")
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data).toEqual([
      {
        key: "abc",
        name: "en",
      },
    ]);

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "",
        params: {
          type: "cmn_scheme",
        },
        method: "GET",
      })
    );
  });

  it("transformByKey", () => {
    expect(
      transformByKey([
        {
          key: "key1",
          zhHK: null,
          zhCN: null,
          en: "en1",
        },
      ])
    ).toEqual({ key1: { key: "key1", name: "en1" } });
  });
});
