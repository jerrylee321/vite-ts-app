import { renderHookWithProviders } from "../utils/test/render";

import useUploadFiles from "./useUploadFiles";

test("useUploadFiles", () => {
  renderHookWithProviders(() => useUploadFiles());
});
