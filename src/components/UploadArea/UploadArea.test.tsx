import { ReactElement, useCallback, useReducer, useState } from "react";
import { CellProps, Column } from "react-table";
import "@testing-library/jest-dom";
import { Button } from "@mui/material";
import { fireEvent, screen } from "@testing-library/react";
import { format as formatDate } from "date-fns";

import useDeleteFile from "../../hooks/useDeleteFile";
import useUploadFiles from "../../hooks/useUploadFiles";
import { UploadedFile } from "../../models/uploadedFile";
import { renderWithProviders } from "../../utils/test/render";
import { setupUserEvent } from "../../utils/test/userEvent";

import UploadArea from ".";

const mockDate = new Date("2022-03-10T00:00:00.000Z");

jest.mock("frontend-common/src/queries/useUploadFile", () => {
  return jest.fn(() => ({
    mutateAsync: async (): Promise<UploadedFile> => {
      return Promise.resolve({
        id: "123456",
        uploadDate: mockDate,
        name: "test file name",
      });
    },
  }));
});

const mockGetUploadedFilesTableColumns = (
  onDeleteFile: (file: UploadedFile) => void
): Column<UploadedFile>[] => [
  {
    Header: "File Name",
    i18nKey: null,
    accessor: "name",
  },
  {
    Header: "Submit Date & Time",
    i18nKey: "UploadArea.header.submittedDateTime",
    accessor: "uploadDate",
    dateFormat: "dd/MM/yyyy",
  },
  {
    Header: "Action",
    i18nKey: null,
    accessor: (data) => data,
    Cell: ({ value }: CellProps<UploadedFile>): ReactElement => {
      const handleClick = useCallback(() => {
        onDeleteFile(value);
      }, [value]);

      return <Button data-testid="DeleteButton" onClick={handleClick} />;
    },
    id: "action",
    disableSortBy: true,
  },
];

interface TestingUploadAreaParentProps {
  errorMessage?: string;
}
const TestingUploadAreaParent = ({
  errorMessage,
}: TestingUploadAreaParentProps): ReactElement => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [filePickerKey, resetFilePicker] = useReducer((i: number) => i + 1, 0);
  const filesUpload = useUploadFiles({
    setUploadedFiles,
    resetFilePicker,
  });
  const { onDeleteFile } = useDeleteFile({ setUploadedFiles });

  return (
    <UploadArea
      uploadedFiles={uploadedFiles}
      getUploadedFileTableColumns={mockGetUploadedFilesTableColumns}
      key={filePickerKey}
      onDeleteFile={onDeleteFile}
      filesUpload={filesUpload}
      emptyFileTableDisplayString=""
      errorMessage={errorMessage}
    />
  );
};

describe("UploadArea Component", () => {
  const user = setupUserEvent();

  it("should render text correctly", async () => {
    const { container } = renderWithProviders(<TestingUploadAreaParent />);

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

    await user.click(await screen.findByTestId("UploadButton"));
    expect(screen.getByText("test.pdf")).toBeInTheDocument();

    expect(
      await screen.findByText(formatDate(new Date(), "dd/MM/yyyy"))
    ).toBeInTheDocument();
    const deleteButton = await screen.findByTestId("DeleteButton");
    expect(deleteButton).toBeInTheDocument();
    await user.click(deleteButton);

    expect(await screen.findByTestId("noTableData")).toBeInTheDocument();
  });

  it("should show error message when props is passed", async () => {
    const mockErrorMessage = "mockErrorMessage";

    renderWithProviders(
      <TestingUploadAreaParent errorMessage={mockErrorMessage} />
    );

    expect(await screen.findByText(mockErrorMessage)).toBeInTheDocument();
  });
});
