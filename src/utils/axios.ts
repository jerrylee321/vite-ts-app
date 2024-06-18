import { InternalAxiosRequestConfig } from "axios";

export const safeSetHeaders = (
  config: InternalAxiosRequestConfig,
  headers: Record<string, any>
): InternalAxiosRequestConfig => {
  // config.headers can be null when testing.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (config.headers) {
    Object.entries(headers).forEach(([name, value]) => {
      config.headers[name] = value;
    });
  }
  return config;
};
