import "@testing-library/jest-dom";
import { fireEvent, screen, waitFor } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";
import { setupUserEvent } from "../../utils/test/userEvent";

import UploadFilePicker from ".";

describe("UploadFilePicker", () => {
  const user = setupUserEvent();
  test("render", async () => {
    const onClick = jest.fn();
    const { container } = renderWithProviders(
      <UploadFilePicker
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className="test-class-name"
        dropzoneOptions={{
          accept: {
            "image/pdf": [".pdf"],
            "text/csv": [".csv"],
          },
          maxSize: 1048576,
        }}
        // eslint-disable-next-line react/jsx-no-bind
        onSubmit={onClick}
        isUploading={false}
        uploadProgress={0}
      />
    );

    expect(container.getElementsByClassName("test-class-name").length).toBe(1);
    expect(await screen.findByTestId("UploadButton")).toBeInTheDocument();
    expect(container.getElementsByTagName("input").length).toBe(1);

    // mock file selection flow
    window.URL.createObjectURL = jest.fn().mockImplementation(() => "url");
    const inputEl = container.getElementsByTagName("input").item(0)!;
    const file = new File(["file"], "test.pdf", {
      type: "image/pdf",
    });
    Object.defineProperty(inputEl, "files", {
      value: [file],
    });
    fireEvent.drop(inputEl);
    expect(await screen.findByText("test.pdf")).toBeInTheDocument();

    const uploadButton = await screen.findByTestId("UploadButton");
    await waitFor(() => expect(uploadButton).not.toBeDisabled());
    await user.click(uploadButton);
    expect(onClick).toBeCalledWith([file]);
  });

  test("no dropzone options", () => {
    const { container } = renderWithProviders(
      <UploadFilePicker
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className="test-class-name"
        onSubmit={jest.fn()}
        isUploading={false}
        uploadProgress={0}
      />
    );

    expect(container.getElementsByClassName("test-class-name").length).toBe(1);
  });

  test("file too large", async () => {
    const onClick = jest.fn();
    const { container } = renderWithProviders(
      <UploadFilePicker
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className="test-class-name"
        dropzoneOptions={{
          accept: {
            "image/pdf": [".pdf"],
            "text/csv": [".csv"],
          },
          maxSize: 1,
        }}
        // eslint-disable-next-line react/jsx-no-bind
        onSubmit={onClick}
        isUploading={false}
        uploadProgress={0}
      />
    );

    expect(container.getElementsByClassName("test-class-name").length).toBe(1);
    expect(screen.getAllByTestId("UploadButton")).toHaveLength(1);
    expect(container.getElementsByTagName("input").length).toBe(1);

    // mock file selection flow
    window.URL.createObjectURL = jest.fn().mockImplementation(() => "url");
    const inputEl = container.getElementsByTagName("input").item(0)!;
    const file = new File(["file"], "test.pdf", {
      type: "image/pdf",
    });

    Object.defineProperty(inputEl, "files", {
      value: [file],
    });
    fireEvent.drop(inputEl);
    expect(
      await screen.findByText(
        "test.pdf: File too large: maximum size is 9.5367431640625e-7MB"
      )
    ).toBeInTheDocument();

    const uploadButton = await screen.findByTestId("UploadButton");
    await waitFor(() => expect(uploadButton).toBeDisabled());
  });

  test("denied file type", async () => {
    const onClick = jest.fn();
    const { container } = renderWithProviders(
      <UploadFilePicker
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className="test-class-name"
        dropzoneOptions={{}}
        // eslint-disable-next-line react/jsx-no-bind
        onSubmit={onClick}
        isUploading={false}
        uploadProgress={0}
      />
    );

    expect(container.getElementsByClassName("test-class-name").length).toBe(1);
    expect(screen.getAllByTestId("UploadButton")).toHaveLength(1);
    expect(container.getElementsByTagName("input").length).toBe(1);

    // mock file selection flow
    window.URL.createObjectURL = jest.fn().mockImplementation(() => "url");
    const inputEl = container.getElementsByTagName("input").item(0)!;
    const file = new File(["file"], "test.zip", {
      type: "application/zip",
    });
    const file2 = new File(["file"], "test.exe", {
      type: "application/octet-stream",
    });

    Object.defineProperty(inputEl, "files", {
      value: [file, file2],
    });
    fireEvent.drop(inputEl);
    expect(await screen.findByTestId("filePickerError")).toHaveTextContent(
      "test.zip: Invalid file type"
    );
    const uploadButton = await screen.findByTestId("UploadButton");
    await waitFor(() => expect(uploadButton).toBeDisabled());
  });

  test("uploading", async () => {
    const onClick = jest.fn();
    const { container } = renderWithProviders(
      <UploadFilePicker
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className="test-class-name"
        dropzoneOptions={{
          accept: {
            "image/pdf": [".pdf"],
            "text/csv": [".csv"],
          },
          maxSize: 1048576,
        }}
        // eslint-disable-next-line react/jsx-no-bind
        onSubmit={onClick}
        isUploading={true}
        uploadProgress={12.34}
      />
    );

    const uploadButton = await screen.findByTestId("UploadButton");
    expect(container.getElementsByClassName("test-class-name").length).toBe(1);
    expect(screen.getAllByTestId("UploadButton")).toHaveLength(1);
    expect(container.getElementsByTagName("input").length).toBe(1);

    expect(screen.getAllByText("Uploading: 12%").length).toBe(1);
    await waitFor(() => expect(uploadButton).toBeDisabled());
  });
});
