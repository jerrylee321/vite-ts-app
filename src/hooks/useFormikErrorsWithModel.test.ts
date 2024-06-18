import "@testing-library/jest-dom";
import { renderHook } from "@testing-library/react";
import * as yup from "yup";

import useFormikErrorsWithModel from "./useFormikErrorsWithModel";

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: (str: string) => str,
  }),
}));

const DummySchema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  count: yup.number().optional(),
});

type DummyModel = yup.InferType<typeof DummySchema>;

const dummyErrors = {
  id: "dummy error",
  count: "dummy count error",
  name: "dummy name error",
};
const dummyHelperTexts = {
  id: "dummy helper id",
  name: "dummy helper name",
};

describe("useFormikErrorsWithModel", () => {
  it("should transform formik error align with form model", async () => {
    const { result } = renderHook(() =>
      useFormikErrorsWithModel<DummyModel>({
        errors: dummyErrors,
        touched: {
          id: true,
          count: false,
        },
      })
    );

    const { isErrors, helperTexts } = result.current;
    expect(isErrors.id).toBeTruthy();
    expect(isErrors.name).toBeFalsy();
    expect(isErrors.count).toBeFalsy();

    expect(helperTexts.id).toBe(dummyErrors.id);
    expect(helperTexts.name).toBeUndefined();
    expect(helperTexts.count).toBeUndefined();
  });

  it("should transform formik error with default helper text", async () => {
    const { result } = renderHook(() =>
      useFormikErrorsWithModel<DummyModel>({
        errors: dummyErrors,
        touched: {
          name: true,
          count: true,
        },
        defaultHelperTexts: dummyHelperTexts,
      })
    );

    const { isErrors, helperTexts } = result.current;

    expect(isErrors.id).toBeFalsy();
    expect(isErrors.name).toBeTruthy();
    expect(isErrors.count).toBeTruthy();

    expect(helperTexts.id).toBe(dummyHelperTexts.id);
    expect(helperTexts.name).toBe(dummyErrors.name);
    expect(helperTexts.count).toBe(dummyErrors.count);
  });
});
