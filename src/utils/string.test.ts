import { toLowerCase, toUpperCase } from "./string";

test("toLowerCase", () => {
  expect(toLowerCase("Hello World!")).toBe("hello world!");
});

test("toUpperCase", () => {
  expect(toUpperCase("Hello World!")).toBe("HELLO WORLD!");
});
