import { INVALIDATE } from "./constants";
import { subscribeStorageEvent } from "./subscribeStorageEvent";

const mockAddEventListener = jest.spyOn(window, "addEventListener");

beforeEach(() => {
  mockAddEventListener.mockReset();
});

test("subscribe storage event", () => {
  mockAddEventListener.mockImplementation((event, cb) => {
    if (event === "storage") {
      const listener = cb as any as (ev: WindowEventMap["storage"]) => any;
      listener({
        key: "persist:some-key",
      } as StorageEvent);
    }
  });

  const dispatch = jest.fn();
  const persist = jest.fn();
  subscribeStorageEvent({ dispatch } as any, { persist } as any, {
    keys: ["some-key"],
  });

  expect(mockAddEventListener).toBeCalledWith("storage", expect.anything());
  expect(dispatch).toBeCalledWith(
    expect.objectContaining({
      type: INVALIDATE,
      key: "some-key",
    })
  );
  expect(persist).toBeCalled();
});

test("ignore non-subscribed keys", () => {
  mockAddEventListener.mockImplementation((event, cb) => {
    if (event === "storage") {
      const listener = cb as any as (ev: WindowEventMap["storage"]) => any;
      listener({
        key: "persist:other-key",
      } as StorageEvent);
    }
  });

  const dispatch = jest.fn();
  const persist = jest.fn();
  subscribeStorageEvent({ dispatch } as any, { persist } as any, {
    keys: ["some-key"],
  });

  expect(mockAddEventListener).toBeCalledWith("storage", expect.anything());
  expect(dispatch).not.toBeCalled();
  expect(persist).not.toBeCalled();
});
