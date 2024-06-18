import { useDispatch } from "react-redux";
import { Button, Select } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";

import { SchemeListScheme } from "../apis/models/SchemeList";
import { CommonOption } from "../models/option";
import { useQueryCommonOptionsByKey } from "../queries/useQueryCommonOptions";
import useQuerySchemeList from "../queries/useQuerySchemeList";
import {
  getLoadingQueryResult,
  getSuccessQueryResult,
} from "../utils/test/queries";

import useSelectSchemeHelper from "./useSelectSchemeHelper";
import useShowErrors from "./useShowErrors";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("../providers/AuthProvider", () => ({
  __esModule: true,
  useCurrentUser: jest.fn().mockReturnValue({ userID: "123" }),
  useAuth: jest.fn().mockReturnValue({ portal: "mpfa" }),
}));

jest.mock("../queries/useQuerySchemeList");

jest.mock("../queries/useQueryCommonOptions", () => ({
  __esModule: true,
  default: jest.fn(),
  useQueryCommonOptionsByKey: jest.fn(),
}));

jest.mock("./useShowErrors");

describe("useSelectSchemeHelper", () => {
  const mockUseDispatch = useDispatch as jest.Mock;
  const mockUseQueryCommonOptions = jest.mocked(useQueryCommonOptionsByKey);
  const mockUseQuerySchemeList = jest.mocked(useQuerySchemeList);

  it("handleConfirm should do nothing when data is not found", () => {
    mockUseQuerySchemeList.mockReturnValue(getLoadingQueryResult());
    mockUseQueryCommonOptions.mockReturnValue(getLoadingQueryResult());
    const mockDispatch = jest.fn();
    const mockOnSelect = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);
    const MockButton = () => {
      const { bindButton } = useSelectSchemeHelper(mockOnSelect);
      return <button type="button" {...bindButton()} data-testid="button" />;
    };
    render(<MockButton />);
    fireEvent.click(screen.getByTestId("button"));

    expect(mockDispatch).toHaveBeenCalledTimes(0);
    expect(mockOnSelect).toHaveBeenCalledTimes(0);
    expect(jest.mocked(useShowErrors)).not.toShowErrorsInArgs();
  });

  it("should able to select scheme", async () => {
    const mockSchemeList: SchemeListScheme[] = [
      {
        schemeCode: "mockKey",
        schemeName: "mockName",
        schemeRegNo: "mockRegNo",
        schemeUuid: "mockUuid",
        trusteeCode: "code",
        trusteeUuid: "uuid",
      },
    ];
    mockUseQuerySchemeList.mockReturnValue(
      getSuccessQueryResult(mockSchemeList)
    );
    const mockCommonOption: CommonOption = {
      key: "mockKey",
      name: "mockName",
    };
    const mockOnSelect = jest.fn();
    mockUseQueryCommonOptions.mockReturnValue(
      getSuccessQueryResult({ [mockCommonOption.key]: mockCommonOption })
    );
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);

    const MockSelectScheme = () => {
      const { bindButton, bindSelect } = useSelectSchemeHelper(mockOnSelect);
      return (
        <>
          <Select {...bindSelect()} data-testid="select" />
          <Button {...bindButton()} value="" data-testid="confirmBtn" />
        </>
      );
    };
    render(<MockSelectScheme />);

    fireEvent.mouseDown(screen.getByRole("button", { expanded: false }));
    fireEvent.click(screen.getByTestId("mockUuid"));
    fireEvent.click(screen.getByTestId("confirmBtn"));

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });
});
