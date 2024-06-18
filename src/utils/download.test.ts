import "@testing-library/jest-dom";

import { downloadBlob, downloadWithLink } from "./download";

describe("downloadWithLink", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("download with link", () => {
    downloadWithLink("https://abc.com/file.xlsx");
  });
});

describe("downloadBlob", () => {
  window.URL.createObjectURL = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("download blob", () => {
    downloadBlob(new Blob(["hello world"], { type: "text/plain" }));
  });

  it("download string", () => {
    downloadBlob("hello world");
  });
});
