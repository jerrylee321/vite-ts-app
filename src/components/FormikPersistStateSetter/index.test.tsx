import { act, waitFor } from "@testing-library/react";
import { Formik } from "formik";

import { renderWithProviders } from "../../utils/test/render";

import FormikPersistStateSetter from ".";

describe("FormikPersistStateSetter", () => {
  test("should render", async () => {
    const mockValidate = jest.fn();
    await act(async () => {
      renderWithProviders(
        <Formik
          initialValues={{}}
          onSubmit={jest.fn()}
          validateOnChange={true}
          validate={mockValidate}
        >
          {(props) => (
            <FormikPersistStateSetter
              {...props}
              searchFormParams={{ hello: "world" }}
            />
          )}
        </Formik>
      );
    });

    await waitFor(() => {
      expect(mockValidate).toBeCalledWith({ hello: "world" }, undefined);
    });
  });

  test("should not update values if equal", async () => {
    const mockValidate = jest.fn();
    await act(async () => {
      renderWithProviders(
        <Formik
          initialValues={{ hello: "world" }}
          onSubmit={jest.fn()}
          validateOnChange={true}
          validate={mockValidate}
        >
          {(props) => (
            <FormikPersistStateSetter
              {...props}
              searchFormParams={{ hello: "world" }}
            />
          )}
        </Formik>
      );
    });

    expect(mockValidate).not.toBeCalled();
  });
});
