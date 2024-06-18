import { renderHook } from "@testing-library/react";

import useToday from "./useToday";

test("today", () => {
  jest.useFakeTimers().setSystemTime(new Date("2023-02-03 11:23:45"));
  const { result } = renderHook(() => useToday());
  expect(result.current).toBeInstanceOf(Date);
  expect(result.current).toEqual(new Date("2023-02-03 00:00:00"));
});
