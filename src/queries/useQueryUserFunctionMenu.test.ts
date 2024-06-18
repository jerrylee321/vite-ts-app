import { waitFor } from "@testing-library/react";

import { mockRequest } from "../../__mocks__/axios";
import { renderHookWithProviders } from "../utils/test/render";

import useQueryUserFunctionMenu from "./useQueryUserFunctionMenu";

beforeEach(() => {
  mockRequest.mockClear();
});

test("useQueryUserFunctionMenu`", async () => {
  mockRequest.mockImplementation(() => {
    return {
      data: {
        success: true,
        code: 200,
        payload: [
          {
            category: "Member Request on PA/UB",
            functionType: "Page",
            functionId: "ffa0a4d8-efb2-edac-e053-0c15d70ae5a2",
            functionName: "Received from eMPF",
          },
        ],
      },
    };
  });

  const { result } = renderHookWithProviders(() =>
    useQueryUserFunctionMenu({
      categoryList: ["categoryList"],
      schemeUuid: "schemeUuid",
    })
  );

  expect(mockRequest).toHaveBeenCalledWith(
    expect.objectContaining({
      url: "/permissions/userFunctionMenu",
      data: {
        platform: "MPFA",
        categoryList: ["categoryList"],
        schemeUuid: "schemeUuid",
      },
    })
  );

  await waitFor(() => {
    expect(result.current.data).toMatchObject([
      {
        category: "Member Request on PA/UB",
        functionType: "Page",
        functionId: "ffa0a4d8-efb2-edac-e053-0c15d70ae5a2",
        functionName: "Received from eMPF",
      },
    ]);
  });
});
