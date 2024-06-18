import { InternalAxiosRequestConfig } from "axios";

import { safeSetHeaders } from "./axios";

describe("safeSetHeaders", () => {
  test("should set headers with headers object", () => {
    // mock axios will have no headers object
    expect(
      safeSetHeaders({ headers: {} } as InternalAxiosRequestConfig, {
        "x-example": "true",
      }).headers
    ).toMatchObject({
      "x-example": "true",
    });
  });
});
