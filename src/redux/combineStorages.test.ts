import storage from "redux-persist/lib/storage";

import { combineStorages } from "./combineStorages";

describe("combineStorages", () => {
  it("should function properly", async () => {
    const s = combineStorages([storage]);
    const item1 = await s.getItem("abc");
    expect(item1).toEqual(null);
    await s.setItem("abc", "123");
    const item2 = await s.getItem("abc");
    expect(item2).toEqual("123");
    await s.removeItem("abc");
    const item3 = await s.getItem("abc");
    expect(item3).toBeNull();
  });
});
