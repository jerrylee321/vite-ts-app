import groupBy from "./groupBy";

describe("groupBy", () => {
  test("should key options by their key", async () => {
    expect(
      groupBy(
        [
          {
            key: "key1",
            name: "name 1",
          },
          {
            key: "key2",
            name: "name 2",
          },
          {
            key: "key3",
            name: "name 3",
          },
          {
            key: "key2",
            name: "name 4",
          },
        ],
        ({ key }) => key
      )
    ).toEqual({
      key1: {
        key: "key1",
        name: "name 1",
      },
      key2: {
        key: "key2",
        name: "name 4", // overwritten
      },
      key3: {
        key: "key3",
        name: "name 3",
      },
    });
  });
});
