import { I18nextProvider } from "react-i18next";
import "@testing-library/jest-dom";
import { SelectChangeEvent } from "@mui/material";
import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormikProps } from "formik";

import FormSelect from "../components/FormSelect";
import i18n from "../i18n";
import { advanceTimers } from "../utils/test/userEvent";

import useSchemeTrusteeOptions from "./useSchemeTrusteeOptions";
import useSchemeTrusteeSelectProps from "./useSchemeTrusteeSelectProps";

jest.mock("../hooks/useSchemeTrusteeOptions");

const schemeList = [
  {
    schemeCode: "sc3",
    schemeName: "Scheme Name 3",
    schemeRegNo: "MT00172",
    schemeUuid: "scUuid3",
    trusteeCode: "trc3",
    trusteeUuid: "trUuid3",
    trusteeName: "Trustee Name 3",
  },
  {
    schemeCode: "sc4",
    schemeName: "Scheme Name 4",
    schemeRegNo: "MT00173",
    schemeUuid: "scUuid4",
    trusteeCode: "trc4",
    trusteeUuid: "trUuid4",
    trusteeName: "Trustee Name 4",
  },
];

describe("useSchemeTrusteeSelectProps", () => {
  const user = userEvent.setup({ advanceTimers });

  beforeEach(() => {
    jest.mocked(useSchemeTrusteeOptions).mockReturnValue({
      filteredSchemeList: [{ key: "sc3", name: "Scheme Name 3" }],
      filteredTrusteeList: [{ key: "trc3", name: "Trustee Name 3" }],
      schemeList: schemeList,
    });
  });

  test("value prop", () => {
    const { result } = renderHook(() =>
      useSchemeTrusteeSelectProps({
        values: { trCode: "trc3", schemeCode: "sc3" },
      } as FormikProps<any>)
    );

    expect(result.current.trusteeSelectProps.value).toEqual("trc3");
    expect(result.current.schemeSelectProps.value).toEqual("sc3");
  });

  test("childen prop", async () => {
    const { result } = renderHook(() =>
      useSchemeTrusteeSelectProps({
        values: { trCode: "trc3", schemeCode: "sc3" },
      } as FormikProps<any>)
    );

    expect(useSchemeTrusteeOptions).toBeCalledWith("trc3");

    const { trusteeSelectProps, schemeSelectProps } = result.current;

    render(<FormSelect {...trusteeSelectProps} />, {
      wrapper: ({ children }) => (
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      ),
    });

    await user.click(screen.getByRole("button"));
    expect(
      screen
        .queryAllByRole("option")
        .some((node) => node.textContent === "Trustee Name 3")
    ).toBeTruthy();

    render(<FormSelect {...schemeSelectProps} />, {
      wrapper: ({ children }) => (
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      ),
    });

    await user.click(screen.getByRole("button"));
    expect(
      screen
        .queryAllByRole("option")
        .some((node) => node.textContent === "Scheme Name 3")
    ).toBeTruthy();
  });

  test("onChange prop", async () => {
    const setFieldValue = jest.fn() as jest.Mock<
      FormikProps<any>["setFieldValue"]
    >;
    const { result } = renderHook(() =>
      useSchemeTrusteeSelectProps({
        setFieldValue,
        values: { trCode: "trc3", schemeCode: "sc3" },
      } as any as FormikProps<any>)
    );

    const { trusteeSelectProps, schemeSelectProps } = result.current;

    trusteeSelectProps.onChange!(
      { target: { value: "trc4" } } as SelectChangeEvent,
      {} as any
    );
    expect(setFieldValue).toBeCalledWith("trCode", "trc4");
    expect(setFieldValue).toBeCalledWith("schemeCode", "");

    setFieldValue.mockClear();
    schemeSelectProps.onChange!(
      { target: { value: "sc4" } } as SelectChangeEvent,
      {} as any
    );
    expect(setFieldValue).toBeCalledWith("schemeCode", "sc4");

    setFieldValue.mockClear();
    schemeSelectProps.onChange!(
      { target: { value: "" } } as SelectChangeEvent,
      {} as any
    );
    expect(setFieldValue).toBeCalledWith("schemeCode", "");

    setFieldValue.mockClear();
    trusteeSelectProps.onChange!(
      { target: { value: "" } } as SelectChangeEvent,
      {} as any
    );
    expect(setFieldValue).toBeCalledWith("trCode", "");
  });

  test("onChange prop with setting key", async () => {
    const setFieldValue = jest.fn() as jest.Mock<
      FormikProps<any>["setFieldValue"]
    >;
    const { result } = renderHook(() =>
      useSchemeTrusteeSelectProps(
        {
          setFieldValue,
          values: { trCode: undefined, schemeCode: undefined },
        } as any as FormikProps<any>,
        {
          schemeRegNoKey: "schemeRegNo",
          schemeNameKey: "schemeName",
          trusteeNameKey: "trName",
          hasAllOption: true,
        }
      )
    );

    const { trusteeSelectProps, schemeSelectProps } = result.current;

    trusteeSelectProps.onChange!(
      { target: { value: "trc4" } } as SelectChangeEvent,
      {} as any
    );
    expect(setFieldValue).toBeCalledWith("trName", "Trustee Name 4");
    expect(setFieldValue).toBeCalledWith("schemeRegNo", "");
    expect(setFieldValue).toBeCalledWith("schemeName", "");

    setFieldValue.mockClear();
    schemeSelectProps.onChange!(
      { target: { value: "sc4" } } as SelectChangeEvent,
      {} as any
    );
    expect(setFieldValue).toBeCalledWith("schemeCode", "sc4");
    expect(setFieldValue).toBeCalledWith("schemeRegNo", "MT00173");
    expect(setFieldValue).toBeCalledWith("schemeName", "Scheme Name 4");

    setFieldValue.mockClear();
    schemeSelectProps.onChange!(
      { target: { value: "" } } as SelectChangeEvent,
      {} as any
    );
    expect(setFieldValue).toBeCalledWith("schemeCode", "");
    expect(setFieldValue).toBeCalledWith("schemeRegNo", "");
    expect(setFieldValue).toBeCalledWith("schemeName", "");

    setFieldValue.mockClear();
    trusteeSelectProps.onChange!(
      { target: { value: "" } } as SelectChangeEvent,
      {} as any
    );
    expect(setFieldValue).toBeCalledWith("trCode", "");
    expect(setFieldValue).toBeCalledWith("trName", "");
  });
});
