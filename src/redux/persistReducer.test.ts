import { PERSIST } from "redux-persist";

import { INVALIDATE } from "./constants";
import { PersistConfig, persistReducer } from "./persistReducer";

const mockReducer = jest.fn();

jest.mock("redux-persist", () => {
  return {
    ...jest.requireActual("redux-persist"),
    persistReducer: jest.fn((_config, baseReducer) => {
      return baseReducer;
    }),
  };
});

beforeEach(() => {
  mockReducer.mockReset();
});

test("invalidate", () => {
  mockReducer.mockImplementation((state: any, _action: any) => {
    return state;
  });

  const reducer = persistReducer(
    { shouldInvalidate: true } as PersistConfig<any>,
    mockReducer
  );
  expect(
    reducer({ _persist: {}, hello: "world" }, { type: INVALIDATE })._persist
  ).toBeUndefined();
  expect(mockReducer).not.toBeCalled();
});

test("should not invalidate", () => {
  mockReducer.mockImplementation((state: any, _action: any) => {
    return state;
  });

  const reducer = persistReducer(
    { shouldInvalidate: false } as PersistConfig<any>,
    mockReducer
  );
  expect(
    reducer({ _persist: {}, hello: "world" }, { type: INVALIDATE })._persist
  ).toEqual({});
  expect(mockReducer).not.toBeCalled();
});

test("should pass PERSIST", () => {
  mockReducer.mockImplementation((_state: any, _action: any) => {
    return { hello: "bye" };
  });

  const reducer = persistReducer({} as PersistConfig<any>, mockReducer);

  expect(reducer({ hello: "world" }, { type: PERSIST })).toMatchObject({
    hello: "bye",
  });
  expect(mockReducer).toBeCalledWith(
    expect.objectContaining({ hello: "world" }),
    expect.objectContaining({ type: PERSIST })
  );
});

test("should not pass PERSIST", () => {
  mockReducer.mockImplementation((_state: any, _action: any) => {
    return { hello: "bye" };
  });

  const reducer = persistReducer({} as PersistConfig<any>, mockReducer);

  expect(
    reducer(
      { _persist: { rehydrated: true }, hello: "world" },
      { type: PERSIST }
    )
  ).toMatchObject({
    hello: "world",
  });
  expect(mockReducer).not.toBeCalled();
});

test("should pass other actions", () => {
  mockReducer.mockImplementation((_state: any, _action: any) => {
    return { hello: "bye" };
  });

  const reducer = persistReducer({} as PersistConfig<any>, mockReducer);

  expect(reducer(undefined, { type: "OTHER" })).toMatchObject({
    hello: "bye",
  });
  expect(mockReducer).toBeCalledWith(
    undefined,
    expect.objectContaining({ type: "OTHER" })
  );
});
