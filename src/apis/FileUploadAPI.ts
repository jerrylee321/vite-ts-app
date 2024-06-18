import { z } from "zod";

import Config from "../Config";

import APISchema, { makeAPISchema } from "./APISchema";
export const UploadFileRequestSchema = z
  .object({
    branch: z.string(),
    uploader: z.string().optional(),
    file: z.instanceof(File),
  })
  .transform((obj): FormData => {
    const formData = new FormData();
    formData.append("branch", obj.branch);
    if (obj.uploader != null) {
      formData.append("uploader", obj.uploader);
    }
    formData.append("file", obj.file);
    return formData;
  });
export type UploadFileRequest = z.input<typeof UploadFileRequestSchema>;

export const UploadFileResponseSchema = z.object({
  success: z.boolean(),
  payload: z.object({
    id: z.string(),
  }),
});
export type UploadFileResponse = z.infer<typeof UploadFileResponseSchema>;

export const makeUploadFileAPISchema = (): APISchema<
  UploadFileRequest,
  UploadFileResponse
> => {
  /* istanbul ignore next */
  if (!Config.fileUploadApiBaseUrl) {
    throw new Error("File Upload API not configured.");
  }
  return makeAPISchema(
    {
      baseURL: Config.fileUploadApiBaseUrl,
      method: "POST",
      url: "/uploads",
    },
    UploadFileRequestSchema,
    UploadFileResponseSchema
  );
};

export const DeleteFilesRequestSchema = z.array(z.string());
export type DeleteFilesRequest = z.infer<typeof DeleteFilesRequestSchema>;

export const DeleteFilesResponseSchema = z.object({
  success: z.boolean(),
  payload: z.literal(true),
});
export type DeleteFilesResponse = z.infer<typeof DeleteFilesResponseSchema>;
export const makeDeleteFilesAPISchema = (): APISchema<
  DeleteFilesRequest,
  DeleteFilesResponse
> => {
  /* istanbul ignore next */
  if (!Config.fileUploadApiBaseUrl) {
    throw new Error("File Upload API not configured.");
  }
  return makeAPISchema(
    {
      baseURL: Config.fileUploadApiBaseUrl,
      method: "POST",
      url: "/delete",
    },
    DeleteFilesRequestSchema,
    DeleteFilesResponseSchema
  );
};
