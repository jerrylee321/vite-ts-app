import { AxiosRequestConfig } from "axios";
import { ZodType } from "zod";

import { IAPIErrorResponse } from "./models/APIError";

interface APISchema<IRequest, IResponse> {
  requestConfig: AxiosRequestConfig;
  requestSchema: ZodType<any, any, IRequest>;
  responseSchema: ZodType<IResponse, any, any>;
  errorResponseSchema?: ZodType<IAPIErrorResponse<unknown>, any, any>;
}

// helper to create api schema with inferred generic type
export const makeAPISchema = <IRequest, IResponse>(
  requestConfig: AxiosRequestConfig,
  requestSchema: ZodType<any, any, IRequest>,
  responseSchema: ZodType<IResponse, any, any>,
  errorResponseSchema?: ZodType<IAPIErrorResponse<unknown>, any, any>
): APISchema<IRequest, IResponse> => {
  return {
    requestConfig,
    requestSchema,
    responseSchema,
    errorResponseSchema,
  };
};

export default APISchema;
