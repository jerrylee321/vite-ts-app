import { renderHook } from "@testing-library/react";

import useTomorrow from "./useTomorrow";

test("tomorrow", () => {
  jest.useFakeTimers().setSystemTime(new Date("2023-02-03 11:23:45"));
  const { result } = renderHook(() => useTomorrow());
  expect(result.current).toBeInstanceOf(Date);
  expect(result.current).toEqual(new Date("2023-02-04 00:00:00"));
});
