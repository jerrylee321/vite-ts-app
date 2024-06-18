import { renderHookWithProviders } from "../utils/test/render";

import useCountdownThrottle from "./useCountdownThrottle";

describe("useCountdownThrottle", () => {
  it("should render", () => {
    const { result } = renderHookWithProviders(() => useCountdownThrottle(60));
    expect(result.current.secondsRemaining).toEqual(60);
  });
});
