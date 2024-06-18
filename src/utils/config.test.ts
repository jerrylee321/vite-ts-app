import { getConfigProxy } from "./config";

jest.mock("./config", () => {
  return {
    getAppConfig: jest.fn(),
    getConfigProxy: jest.requireActual("./config").getConfigProxy,
  };
});

test("getConfigProxy", () => {
  const proxy = getConfigProxy({ hello: "world" });
  expect(proxy.hello).toEqual("world");
});
