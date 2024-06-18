import { UploadFileRequest, UploadFileRequestSchema } from "./FileUploadAPI";

test("FileUploadAPI model", () => {
  const file = new File(["test"], "test.txt");
  const request: UploadFileRequest = {
    branch: "test",
    uploader: "123456",
    file: file,
  };
  const parsedRequest = UploadFileRequestSchema.parse(request);
  expect(parsedRequest.get("branch")).toEqual("test");
  expect(parsedRequest.get("uploader")).toEqual("123456");
  expect(parsedRequest.get("file")).toEqual(file);
});
