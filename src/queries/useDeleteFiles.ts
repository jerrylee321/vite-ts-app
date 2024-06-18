import { useMutation, UseMutationResult } from "@tanstack/react-query";

import {
  DeleteFilesRequest,
  DeleteFilesResponse,
  makeDeleteFilesAPISchema,
} from "../apis/FileUploadAPI";
import { useAPIClient } from "../providers/APIClientProvider";

import { MutationKeys } from "./QueryKeys";

// File Delete API is no longer need to call in FE (ref: #2115)
const useDeleteFiles = (): UseMutationResult<
  DeleteFilesResponse,
  unknown,
  DeleteFilesRequest
> => {
  const { apiClient } = useAPIClient();

  return useMutation({
    mutationKey: MutationKeys.deleteFile(),
    mutationFn: async (
      request: DeleteFilesRequest
    ): Promise<DeleteFilesResponse> => {
      const res = await apiClient.execute(makeDeleteFilesAPISchema(), request);
      return res;
    },
  });
};

export default useDeleteFiles;
