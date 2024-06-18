import axios, { AxiosError } from "axios";
import { z, ZodError } from "zod";

import { mockRequest } from "../../__mocks__/axios";

import { APIError } from "./models/APIError";
import APIClient from "./APIClient";
import { makeAPISchema } from "./APISchema";

jest.mock("axios");

afterEach(() => {
  mockRequest.mockReset();
});

const requestConfig = {
  method: "post",
  baseURL: "https://example.com",
  url: "/test",
};
const reqSchema = z.object({
  someKey: z.string(),
});
const resSchema = z.object({
  anotherKey: z.string(),
});
const apiSchema = makeAPISchema(requestConfig, reqSchema, resSchema);

test("api client success", async () => {
  const expectedRequest = {
    someKey: "someValue",
  };
  const expectedResponse = {
    anotherKey: "anotherValue",
  };

  mockRequest.mockResolvedValue({ data: expectedResponse });
  const apiClient = new APIClient(axios.create());
  apiClient
    .execute(apiSchema, expectedRequest)
    .then((res) => expect(res).toEqual(expectedResponse))
    .catch(null);

  expect(mockRequest).toBeCalledWith(
    expect.objectContaining({
      ...requestConfig,
      data: expectedRequest,
    })
  );
});

test("api client response invalid", async () => {
  const expectedRequest = {
    someKey: "someValue",
  };
  const badResponse = {
    noAnotherKey: "notAnotherValue",
  };

  mockRequest.mockResolvedValue({ data: badResponse });

  const apiClient = new APIClient(axios.create());
  apiClient.execute(apiSchema, expectedRequest).catch((e) => {
    expect(e).toBeInstanceOf(ZodError);
  });

  expect(mockRequest).toBeCalledWith(
    expect.objectContaining({
      ...requestConfig,
      data: expectedRequest,
    })
  );
});

test("api client api error", async () => {
  const expectedRequest = {
    someKey: "someValue",
  };
  const errorResponse = {
    success: false,
    error: {
      traceId: "some trace id",
      errorCode: "some error code",
      errorMessage: {
        en: "some en message",
        zhHK: "some hk message",
        zhCN: "some cn message",
      },
    },
  };

  mockRequest.mockRejectedValue({
    isAxiosError: true,
    response: {
      data: errorResponse,
    },
  });

  const apiClient = new APIClient(axios.create());
  apiClient.execute(apiSchema, expectedRequest).catch((e) => {
    expect(e).toBeInstanceOf(APIError);
  });

  expect(mockRequest).toBeCalledWith(
    expect.objectContaining({
      ...requestConfig,
      data: expectedRequest,
    })
  );
});

test("api client invalid request", async () => {
  const unexpectedRequest = {
    notSomeKey: "notSomeValue",
  };

  const apiClient = new APIClient(axios);
  apiClient
    .execute(apiSchema, unexpectedRequest as any as z.infer<typeof reqSchema>)
    .catch((e) => {
      expect(e).toBeInstanceOf(ZodError);
    });

  expect(mockRequest).not.toBeCalled();
});

test("api client invalid api error", async () => {
  const expectedRequest = {
    someKey: "someValue",
  };
  const errorResponse = {
    success: false,
    notError: "not error object",
  };

  mockRequest.mockRejectedValue({
    isAxiosError: true,
    response: {
      data: errorResponse,
    },
  });

  const apiClient = new APIClient(axios.create());
  apiClient.execute(apiSchema, expectedRequest).catch((e) => {
    expect(e).toBeInstanceOf(ZodError);
  });

  expect(mockRequest).toBeCalledWith(
    expect.objectContaining({
      ...requestConfig,
      data: expectedRequest,
    })
  );
});

test("api client retry auth error", async () => {
  const expectedRequest = {
    someKey: "someValue",
  };

  const errorResponse = {
    success: false,
    error: {
      traceId: "some trace id",
      errorCode: "some error code",
      errorMessage: {
        en: "some en message",
        zhHK: "some hk message",
        zhCN: "some cn message",
      },
    },
  };
  mockRequest.mockRejectedValue(
    new AxiosError("error message", "error code", undefined, undefined, {
      data: errorResponse,
      status: 401,
      statusText: "Unauthorized",
    } as any)
  );

  const apiClient = new APIClient(axios.create(), { retryEnabled: true });
  const promise = apiClient.execute(apiSchema, expectedRequest);
  await expect(promise).rejects.not.toBeNull();

  expect(mockRequest).toBeCalledTimes(2);
});
