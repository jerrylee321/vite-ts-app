import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  isAxiosError,
} from "axios";

import { isRetryableError } from "../utils/errors";

import { APIError, APIErrorResponseSchema } from "./models/APIError";
import APISchema from "./APISchema";

export const APIClientRetryHeader = "X-eMPF-Retry";

interface APIClientOptions {
  retryEnabled?: boolean;
}

class APIClient {
  axios: AxiosInstance;
  retryEnabled: boolean;

  constructor(axios: AxiosInstance, options?: APIClientOptions) {
    this.axios = axios;
    this.retryEnabled = options?.retryEnabled ?? false;
  }

  private static makeAxiosRequest<IRequest, IResponse>(
    apiSchema: APISchema<IRequest, IResponse>,
    request: IRequest,
    retry: boolean = false
  ): AxiosRequestConfig {
    const { requestConfig } = apiSchema;
    const { method } = requestConfig;
    return {
      ...requestConfig,

      // NOTE: If request is a GET request, the parsedReq.data is assumed
      // to pass by parameters. Otherwise it will be passed by request body.
      // Note that this does not support the case where request parameters
      // and request body are both needed.
      ...(method?.toLowerCase() === "get"
        ? {
            params: request,
          }
        : {
            data: request,
          }),

      headers: {
        ...requestConfig.headers,
        ...(retry
          ? {
              [APIClientRetryHeader]: "true",
            }
          : {}),
      },
    };
  }

  async execute<IRequest, IResponse>(
    apiSchema: APISchema<IRequest, IResponse>,
    request: IRequest
  ): Promise<IResponse> {
    return this.executeImpl(apiSchema, request);
  }

  private async executeImpl<IRequest, IResponse>(
    apiSchema: APISchema<IRequest, IResponse>,
    request: IRequest,
    retry: boolean = false
  ): Promise<IResponse> {
    const {
      requestSchema,
      responseSchema,
      errorResponseSchema = APIErrorResponseSchema,
    } = apiSchema;
    const parsedReq = requestSchema.parse(request);
    try {
      const res = await this.axios.request(
        APIClient.makeAxiosRequest(apiSchema, parsedReq)
      );
      return responseSchema.parse(res.data);
    } catch (e: unknown) {
      console.error(
        `Error from ${apiSchema.requestConfig.method} ${apiSchema.requestConfig.baseURL}${apiSchema.requestConfig.url}`
      );
      // inject api request context to error object
      // usage: isErrorWithAPIRequestContext(e) && e.apiRequestContext
      (e as any).apiRequestContext = {
        method: apiSchema.requestConfig.method,
        baseURL: apiSchema.requestConfig.baseURL,
        url: apiSchema.requestConfig.url,
      };
      if (!isAxiosError(e) || e.response == null) {
        throw e;
      }
      const responseObj = await retrieveErrorResponse(e.response);
      const httpStatus = e.response.status;
      const parsedRes = errorResponseSchema.safeParse(responseObj);
      if (!parsedRes.success) {
        // If response cannot be parsed and it is a server side error, it is
        // likely not to be a schema problem (e.g. server responded html),
        // return the axios error instead.
        if (httpStatus >= 500) {
          throw e;
        }
        throw parsedRes.error;
      }

      const apiError = APIError.fromParsedData(parsedRes.data, {
        httpStatus,
      });

      if (isRetryableError(apiError) && !retry && this.retryEnabled) {
        return this.executeImpl(apiSchema, request, true);
      }

      throw apiError;
    }
  }
}

export default APIClient;

async function retrieveErrorResponse(
  response: AxiosResponse
): Promise<unknown> {
  return response.data instanceof Blob &&
    response.data.type.toLowerCase().indexOf("json") !== -1
    ? // This is a blob request error response
      JSON.parse(await response.data.text())
    : // Normal json error response
      response.data;
}
