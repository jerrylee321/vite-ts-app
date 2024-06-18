import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik } from "formik";

import { renderWithProviders } from "../../utils/test/render";
import { advanceTimers } from "../../utils/test/userEvent";

import {
  DeleteUserGroupDialogSubmitForm,
  SubmitFormInitialValue,
  SubmitFormSchema,
} from "./DeleteUserGroupDialogSubmitForm";

describe("Search Form", () => {
  it("should render", async () => {
    const user = userEvent.setup({ advanceTimers });
    const mockOnSubmitForm = jest.fn();
    renderWithProviders(
      <Formik
        initialValues={SubmitFormInitialValue}
        validationSchema={SubmitFormSchema}
        onSubmit={mockOnSubmitForm}
      >
        {(props) => <DeleteUserGroupDialogSubmitForm {...props} />}
      </Formik>
    );

    expect(screen.getByTestId("effectiveDate")).toBeInTheDocument();

    const searchButton = screen.getByTestId("submitBtn");

    expect(searchButton).toBeInTheDocument();

    await user.click(searchButton);
    await waitFor(() => expect(mockOnSubmitForm).toHaveBeenCalledTimes(1));
  });
});
