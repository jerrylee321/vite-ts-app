import { getKeyProps } from "./datatable";

describe("getKeyProps", () => {
  test("return key if value is string", () => {
    expect(getKeyProps({ id: "hello" }, "id")).toEqual({ key: "hello" });
  });

  test("return key if value is number", () => {
    expect(getKeyProps({ id: 42 }, "id")).toEqual({ key: 42 });
  });

  test("do not return key with non string not number value", () => {
    expect(getKeyProps({ id: true }, "id")).toBeUndefined();
  });

  test("do not return key if field name not specified", () => {
    expect(getKeyProps({ id: true }, undefined)).toBeUndefined();
  });

  test("do not return key if no such key", () => {
    expect(getKeyProps({ id: true }, "not-id" as any)).toBeUndefined();
  });
});
