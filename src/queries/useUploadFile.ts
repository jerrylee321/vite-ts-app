import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosProgressEvent, InternalAxiosRequestConfig } from "axios";

import {
  makeUploadFileAPISchema,
  UploadFileRequest,
  UploadFileResponse,
} from "../apis/FileUploadAPI";
import { useAPIClient } from "../providers/APIClientProvider";

import { MutationKeys } from "./QueryKeys";

interface UploadFileVariables {
  request: UploadFileRequest;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}

const useUploadFile = (): UseMutationResult<
  UploadFileResponse["payload"],
  unknown,
  UploadFileVariables
> => {
  const { apiClient } = useAPIClient();
  return useMutation({
    mutationKey: MutationKeys.uploadFile(),
    mutationFn: async ({
      request,
      onUploadProgress,
    }: UploadFileVariables): Promise<UploadFileResponse["payload"]> => {
      const uploadProgressInterceptor =
        apiClient.axios.interceptors.request.use(
          (config: InternalAxiosRequestConfig) => {
            config.onUploadProgress = onUploadProgress;
            return config;
          }
        );
      const res = await apiClient.execute(makeUploadFileAPISchema(), request);
      apiClient.axios.interceptors.request.eject(uploadProgressInterceptor);
      return res.payload;
    },
  });
};

export default useUploadFile;
