import {
  CommonDocumentFileTypes,
  isCommonDocumentFileTypes,
  toFileExtensions,
} from "./uploadFileTypes";

test("toFileExtensions", () => {
  expect(
    toFileExtensions({
      "image/ipeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/tiff": [".tiff"],
    })
  ).toMatchObject(expect.arrayContaining([".jpg", ".jpeg", ".png", ".tiff"]));
});

test("isCommonDocumentFileTypes", () => {
  expect(isCommonDocumentFileTypes(CommonDocumentFileTypes)).toBeTruthy();
});
