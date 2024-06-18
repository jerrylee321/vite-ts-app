import {
  getErrorQueryResult,
  getLoadingQueryResult,
  getSuccessQueryResult,
} from "./test/queries";
import { combineQueryResults } from "./queries";

describe("combineQueryResults", () => {
  test("all loading", () => {
    expect(
      combineQueryResults({
        a: getLoadingQueryResult(),
        b: getLoadingQueryResult(),
        c: getLoadingQueryResult(),
      })
    ).toMatchObject({
      data: { a: undefined, b: undefined, c: undefined },
      isLoading: true,
      isSuccess: false,
      errors: expect.objectContaining({}),
    });
  });

  test("all success", () => {
    expect(
      combineQueryResults({
        a: getSuccessQueryResult("a"),
        b: getSuccessQueryResult("b"),
        c: getSuccessQueryResult("c"),
      })
    ).toMatchObject({
      data: { a: "a", b: "b", c: "c" },
      isLoading: false,
      isSuccess: true,
      errors: null,
    });
  });

  test("some loading", () => {
    expect(
      combineQueryResults({
        a: getLoadingQueryResult(),
        b: getSuccessQueryResult("b"),
        c: getSuccessQueryResult("c"),
      })
    ).toMatchObject({
      data: { a: undefined, b: "b", c: "c" },
      isLoading: true,
      isSuccess: false,
      errors: expect.objectContaining({}),
    });
  });

  test("some errors", () => {
    expect(
      combineQueryResults({
        a: getErrorQueryResult("unknown error"),
        b: getSuccessQueryResult("b"),
        c: getSuccessQueryResult("c"),
      })
    ).toMatchObject({
      data: { a: undefined, b: "b", c: "c" },
      isLoading: false,
      isSuccess: false,
      errors: expect.objectContaining({ a: "unknown error" }),
    });
  });
});
