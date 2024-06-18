import { appendPathComponent } from "./url";

describe("appendPathComponent", () => {
  test("append", () => {
    expect(appendPathComponent("abc", "https://www.example.com")).toEqual(
      "https://www.example.com/abc"
    );
    expect(appendPathComponent("abc", "https://www.example.com/")).toEqual(
      "https://www.example.com/abc"
    );
    expect(appendPathComponent("abc", "https://www.example.com/path")).toEqual(
      "https://www.example.com/path/abc"
    );
    expect(appendPathComponent("abc", "https://www.example.com/path/")).toEqual(
      "https://www.example.com/path/abc"
    );
  });
});
