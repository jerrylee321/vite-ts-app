import * as yup from "yup";

import {
  getFieldArrayItemError,
  hasFieldArrayError,
} from "./getFieldArrayItemError";

export const MockFormSchema = yup.object({
  userName: yup.string().default("").min(1),
  userGroupUuids: yup
    .array()
    .of(yup.string().required())
    .required()
    .default([])
    .min(1),
  companyName: yup.string().default("").min(1),
  department: yup.string().default("").min(1),
  userId: yup.string().default("").min(1),
  email: yup.string().email("").default("").min(1),
  telNo: yup.string().default("").min(1),
  effectiveDate: yup
    .date()
    .nullable()
    .test({
      test(value, ctx) {
        if (value == null) {
          return ctx.createError({
            message: "",
          });
        }
        return true;
      },
    }),
});

export type MockForm = yup.InferType<typeof MockFormSchema>;

describe("getFieldArrayItemError", () => {
  test("compute field error from field array item", () => {
    expect(getFieldArrayItemError<MockForm>(undefined, 0, "userName")).toEqual(
      null
    );

    expect(
      getFieldArrayItemError<MockForm>("list error", 0, "userName")
    ).toEqual("list error");

    expect(
      getFieldArrayItemError<MockForm>([null as any], 0, "userName")
    ).toEqual(null);

    expect(
      getFieldArrayItemError<MockForm>(["item error"], 0, "userName")
    ).toEqual("item error");

    expect(
      getFieldArrayItemError<MockForm>(
        [
          {
            userName: "field error",
          },
        ],
        0,
        "userName"
      )
    ).toEqual("field error");

    expect(
      getFieldArrayItemError<MockForm>(
        [
          {
            companyName: "field error",
          },
        ],
        0,
        "userName"
      )
    ).toEqual(null);
  });
});

describe("hasFieldArrayError", () => {
  test("compute field error from field array item", () => {
    expect(hasFieldArrayError<MockForm>(undefined, 0)).toBeFalsy();

    expect(hasFieldArrayError<MockForm>("list error", 0)).toBeTruthy();

    expect(hasFieldArrayError<MockForm>([null as any], 0)).toBeFalsy();

    expect(hasFieldArrayError<MockForm>(["item error"], 0)).toBeTruthy();

    expect(
      hasFieldArrayError<MockForm>(
        [
          {
            userName: "field error",
          },
        ],
        0
      )
    ).toBeTruthy();
  });
});
