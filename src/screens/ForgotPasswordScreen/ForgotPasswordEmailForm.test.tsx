import { screen, waitFor } from "@testing-library/react";
import { Formik } from "formik";

import { renderWithProviders } from "../../utils/test/render";
import { setupUserEvent } from "../../utils/test/userEvent";

import ForgotPasswordEmailForm from "./ForgotPasswordEmailForm";
import { ForgotPasswordEmailFormSchema } from "./ForgotPasswordEmailFormModel";

describe("ForgotPasswordEmailForm", () => {
  test("invalid email", async () => {
    const onSubmit = jest.fn();
    const user = setupUserEvent();
    renderWithProviders(
      <Formik
        initialValues={{ email: "" }}
        validationSchema={ForgotPasswordEmailFormSchema}
        validateOnMount={true}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <ForgotPasswordEmailForm
            formikProps={formik}
            isSubmitting={false}
            lastError={null}
          />
        )}
      </Formik>
    );

    const emailInput = screen.getByTestId("email").querySelector("input")!;

    emailInput.focus();
    await user.paste("example");
    emailInput.blur();

    expect(await screen.findByTestId("email.invalid")).toHaveTextContent(
      "invalid"
    );
  });

  test("should submit", async () => {
    const onSubmit = jest.fn();
    const user = setupUserEvent();
    renderWithProviders(
      <Formik
        initialValues={{ email: "" }}
        validationSchema={ForgotPasswordEmailFormSchema}
        validateOnMount={true}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <ForgotPasswordEmailForm
            formikProps={formik}
            isSubmitting={false}
            lastError={null}
          />
        )}
      </Formik>
    );

    const emailInput = screen.getByTestId("email").querySelector("input")!;

    emailInput.focus();
    await user.paste("abc@example.com");
    emailInput.blur();

    await user.click(screen.getByTestId("submitButton"));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
