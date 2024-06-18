import "./hkid";
import * as yup from "yup";

describe("hkid", () => {
  it("should validate hkid", () => {
    const schema = yup.string().hkid();
    expect(() => schema.validateSync("A1234567")).not.toThrow();
    expect(() => schema.validateSync("AA123456A")).not.toThrow();
    expect(() => schema.validateSync("123456A")).toThrow();
    expect(() => schema.validateSync("A123456")).toThrow();
  });

  it("should validate optional hkid", () => {
    const schema = yup.string().optional().hkid();
    expect(() => schema.validateSync("")).not.toThrow();
  });
});
