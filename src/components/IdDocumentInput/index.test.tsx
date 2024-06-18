import React, { ReactElement } from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik } from "formik";
import { object, string } from "yup";

import { renderWithProviders } from "../../utils/test/render";
import { advanceTimers } from "../../utils/test/userEvent";

import IdDocumentInput from ".";

const mockOnSubmitForm = jest.fn();
const mockValidationSchema = object().shape({
  idType: string().required(),
  idTypeValue: string().required(),
});

const mockInitialValues = {
  idType: "MemHkidNo",
  idTypeValue: "testHkid",
};

afterEach(() => {
  jest.clearAllMocks();
});

const TestingForm = (): ReactElement => {
  return (
    <Formik
      validationSchema={mockValidationSchema}
      initialValues={mockInitialValues}
      onSubmit={mockOnSubmitForm}
    >
      {(props) => (
        <form onSubmit={mockOnSubmitForm}>
          <IdDocumentInput formikProps={props} required={true} />
          <button type="submit" data-testid="submitBtn">
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
};
const testHkid = "testHkid";

describe("IdDocumentInput", () => {
  it("renders the component without errors", async () => {
    const user = userEvent.setup({ advanceTimers });
    renderWithProviders(<TestingForm />);

    expect(screen.getByText("HKID Number")).toBeInTheDocument();
    const idTypeInput = screen
      .getByTestId("idTypeValue")
      .querySelector("input")!;
    idTypeInput.focus();
    await user.paste(testHkid);
    await user.click(screen.getByTestId("submitBtn"));
  });

  it("Invalid submission", async () => {
    const user = userEvent.setup({ advanceTimers });
    renderWithProviders(<TestingForm />);
    await user.click(screen.getByTestId("submitBtn"));
    expect(
      screen.getByText("e.g. A123456(7), input A1234567")
    ).toBeInTheDocument();
  });
});
