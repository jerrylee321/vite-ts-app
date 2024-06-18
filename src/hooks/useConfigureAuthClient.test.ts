import axios, { InternalAxiosRequestConfig } from "axios";

import APIClient from "../apis/APIClient";
import { renderHookWithProviders } from "../utils/test/render";

import useConfigureAuthClient from "./useConfigureAuthClient";

describe("useConfigureAuthClient", () => {
  const axiosClient = jest.mocked(axios.create());
  const { AxiosHeaders } = jest.requireActual("axios");
  const headers = new AxiosHeaders();
  const c = new APIClient(axiosClient);
  const authClient = jest.mocked(c);

  it("no token", async () => {
    axiosClient.interceptors.request.use.mockImplementation((fn) => {
      const config: InternalAxiosRequestConfig = {
        headers: headers,
      };
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (async () => {
        const newConfig = await fn?.(config);
        expect(newConfig?.headers.get("X-eMPF-Interaction-ID")).toHaveLength(
          36 // uuid with dash
        );
      })();
      return 42;
    });

    const { unmount } = renderHookWithProviders(
      () => useConfigureAuthClient(authClient),
      {
        authenticated: false,
      }
    );

    expect(axiosClient.interceptors.request.use).toBeCalled();
    unmount();
    expect(axiosClient.interceptors.request.eject).toBeCalledWith(42);
  });

  it("have verification token", async () => {
    axiosClient.interceptors.request.use.mockImplementation((fn) => {
      const config: InternalAxiosRequestConfig = {
        headers: headers,
      };
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (async () => {
        const newConfig = await fn?.(config);
        expect(newConfig?.headers.get("Authorization")).toEqual(
          "Bearer verification-token"
        );
      })();
      return 42;
    });

    renderHookWithProviders(() => useConfigureAuthClient(authClient), {
      preloadedState: {
        verifyAuth: {
          verificationCodeId: "code-id",
          verificationToken: "verification-token",
        },
      },
    });

    expect(axiosClient.interceptors.request.use).toBeCalled();
  });

  it("have access token", async () => {
    axiosClient.interceptors.request.use.mockImplementation((fn) => {
      const config: InternalAxiosRequestConfig = {
        headers: headers,
      };
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (async () => {
        const newConfig = await fn?.(config);
        expect(newConfig?.headers.get("Authorization")).toEqual(
          "Bearer some-token"
        );
      })();
      return 42;
    });

    renderHookWithProviders(() => useConfigureAuthClient(authClient), {
      authenticated: true, // the access token is provided by helper
    });

    expect(axiosClient.interceptors.request.use).toBeCalled();
  });
});
