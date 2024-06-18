import { act, renderHook, waitFor } from "@testing-library/react";

import useDialogState from "./useDialogState";

test("useDialogState", async () => {
  const { result } = renderHook(() => useDialogState());
  expect(result.current[0]).toBeFalsy();
  act(() => {
    result.current[1]();
  });
  await waitFor(() => {
    expect(result.current[0]).toBeTruthy();
  });
  act(() => {
    result.current[2]();
  });
  await waitFor(() => {
    expect(result.current[0]).toBeFalsy();
  });
});
