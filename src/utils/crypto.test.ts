import { getRandomNumber } from "./crypto";

jest.spyOn(window.crypto, "getRandomValues").mockImplementation(() => {
  return new Uint16Array([0]);
});

test("getRandomNumber", () => {
  expect(getRandomNumber()).toEqual(0);
});
