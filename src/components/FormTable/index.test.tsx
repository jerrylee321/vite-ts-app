import { ReactElement, useCallback } from "react";
import { CellProps } from "react-table";
import "@testing-library/jest-dom";
import { Button } from "@mui/material";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik, FormikProps, useFormikContext } from "formik";
import { array, date, InferType, number, object, string } from "yup";

import useQueryCommonOptions from "../../queries/useQueryCommonOptions";
import { getSuccessQueryResult } from "../../utils/test/queries";
import { renderWithProviders } from "../../utils/test/render";
import { advanceTimers } from "../../utils/test/userEvent";
import dateRange from "../../yup/dateRange";
import FormDatePicker from "../FormDatePicker";
import FormInput from "../FormInput";
import FormSelect, { FormSelectOption } from "../FormSelect/NativeFormSelect";

import { withFormTableDisplayErrorRowFormTableName } from "./FormTableDisplayErrorRow";
import FormTable, { FormTableColumnsGetter, makeInputCell } from ".";

jest.mock("frontend-common/src/queries/useQueryCommonOptions");
jest.mocked(useQueryCommonOptions).mockReturnValue(
  getSuccessQueryResult([
    {
      key: "mockOptionCode1",
      name: "mockOptionName1",
    },
    {
      key: "mockOptionCode2",
      name: "mockOptionName2",
    },
  ])
);

const mockRowSchema = object({
  mockDate: date().defined().nullable(),
  mockDateRange: dateRange(),
  mockInput: string(),
  mockSelect: string(),
  mockText: string(),
  mockNumber: number(),
});

type MockRowModel = InferType<typeof mockRowSchema>;

const mockNewRowValue: MockRowModel = {
  mockDate: null,
  mockDateRange: [null, null],
  mockInput: "",
  mockSelect: "",
  mockText: "",
  mockNumber: 0,
};

const mockRowInitialValue: MockRowModel = {
  mockDate: new Date("2023-04-01"),
  mockDateRange: [new Date("2023-04-01"), new Date("2023-04-05")],
  mockInput: "",
  mockSelect: "",
  mockText: "",
  mockNumber: 0,
};

const mockRowData1: MockRowModel = {
  mockDate: new Date("2023-04-02"),
  mockDateRange: [new Date("2023-04-06"), new Date("2023-04-10")],
  mockInput: "mockInput1",
  mockSelect: "mockOptionCode1",
  mockText: "",
  mockNumber: 0,
};

const mockRowData2: MockRowModel = {
  mockDate: new Date("2023-04-03"),
  mockDateRange: [new Date("2023-04-11"), new Date("2023-04-15")],
  mockInput: "mockInput2",
  mockSelect: "mockOptionCode2",
  mockText: "mockText",
  mockNumber: 10.29,
};

const mockFormSchema = object({
  mockForm: array(mockRowSchema),
});

type MockFormModel = InferType<typeof mockFormSchema>;

const mockFormInitialValues: MockFormModel = {
  mockForm: new Array(2).fill(mockRowInitialValue),
};

const FormTableName = "mockForm";
const MockInputCell = ({ row }: CellProps<MockRowModel>): ReactElement => {
  const { handleChange, handleBlur, values } =
    useFormikContext<MockFormModel>();

  return (
    <FormInput
      name={`${FormTableName}[${row.index}].mockInput`}
      data-testid={`${FormTableName}[${row.index}].mockInput`}
      value={values.mockForm ? values.mockForm[row.index].mockInput : ""}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

const MockDateRangeCell = ({ row }: CellProps<MockRowModel>): ReactElement => {
  const { setFieldValue, handleBlur, values } =
    useFormikContext<MockFormModel>();

  return (
    <FormDatePicker
      type="range"
      name={`${FormTableName}[${row.index}].mockDateRange`}
      data-testid={`${FormTableName}[${row.index}].mockDateRange`}
      startDate={
        values.mockForm ? values.mockForm[row.index].mockDateRange[0] : null
      }
      endDate={
        values.mockForm ? values.mockForm[row.index].mockDateRange[1] : null
      }
      onChange={setFieldValue}
      onBlur={handleBlur}
    />
  );
};

const MockSelectCell = ({ row }: CellProps<MockRowModel>): ReactElement => {
  const { data: requestPriorityOptions } =
    useQueryCommonOptions("requestPriority");
  const { handleChange, handleBlur, values } =
    useFormikContext<MockFormModel>();

  return (
    <FormSelect
      fullWidth={true}
      id={`${FormTableName}[${row.index}].mockSelect`}
      data-testid={`${FormTableName}[${row.index}].mockSelect`}
      name={`${FormTableName}[${row.index}].mockSelect`}
      value={values.mockForm ? values.mockForm[row.index].mockSelect : ""}
      onChange={handleChange}
      onBlur={handleBlur}
    >
      {requestPriorityOptions?.map((requestPriorityOption) => (
        <FormSelectOption
          key={requestPriorityOption.key}
          label={requestPriorityOption.name}
          value={requestPriorityOption.key}
        />
      ))}
    </FormSelect>
  );
};

const MockDateCell = ({ row }: CellProps<MockRowModel>): ReactElement => {
  const { setFieldValue, handleBlur, values } =
    useFormikContext<MockFormModel>();

  return (
    <FormDatePicker
      name={`${FormTableName}[${row.index}].mockDate`}
      data-testid={`${FormTableName}[${row.index}].mockDate`}
      value={values.mockForm ? values.mockForm[row.index].mockDate : null}
      onChange={setFieldValue}
      onBlur={handleBlur}
    />
  );
};

const MockTextInput = makeInputCell<MockRowModel, MockFormModel>({
  type: "text",
  formTableName: FormTableName,
  columnName: "mockText",
});
const MockNumberInput = makeInputCell<MockRowModel, MockFormModel>({
  type: "number",
  formTableName: FormTableName,
  columnName: "mockNumber",
  numberInputOptions: {
    disableHandleEmptyNumberInput: false,
    decimalPlaces: 2,
  },
});

const getMockColumns: FormTableColumnsGetter<MockRowModel, MockFormModel> = (
  name,
  arrayHelpers
) => {
  return [
    {
      i18nKey: null,
      Header: "mockInput",
      id: "mockInput",
      accessor: "mockInput",
      Cell: MockInputCell,
    },
    {
      i18nKey: null,
      Header: "mockSelect",
      id: "mockSelect",
      accessor: "mockSelect",
      Cell: MockSelectCell,
    },
    {
      i18nKey: null,
      Header: "mockDate",
      id: "mockDate",
      accessor: "mockDate",
      Cell: MockDateCell,
    },
    {
      i18nKey: null,
      Header: "mockDateRange",
      id: "mockDateRange",
      accessor: "mockDateRange",
      Cell: MockDateRangeCell,
    },
    {
      i18nKey: null,
      Header: "mockText",
      id: "mockText",
      accessor: "mockText",
      Cell: MockTextInput,
    },
    {
      i18nKey: null,
      Header: "mockNumber",
      id: "mockNumber",
      accessor: "mockNumber",
      Cell: MockNumberInput,
    },
    {
      i18nKey: null,
      Header: "action",
      id: "action",
      Cell: ({ row }: CellProps<MockRowModel>): ReactElement => {
        const onDelete = useCallback(() => {
          arrayHelpers.remove(row.index);
        }, [row.index]);
        return (
          <Button
            id={`${name}[${row.index}].deleteButton`}
            data-testid={`${name}[${row.index}].deleteButton`}
            onClick={onDelete}
          >
            Delete
          </Button>
        );
      },
    },
  ];
};

const MockFormChildren = (props: FormikProps<MockFormModel>): ReactElement => {
  return (
    <form onSubmit={props.handleSubmit}>
      <FormTable
        name={FormTableName}
        columnsGetter={getMockColumns}
        data={props.values.mockForm}
        newItemValue={mockNewRowValue}
        isAddItemEnabled={true}
        isDeleteEnabled={true}
        showDeleteAlert={true}
      />
      <Button data-testid="submitBtn" type="submit">
        Submit
      </Button>
    </form>
  );
};

const MockWithErrorFormChildren = (
  props: FormikProps<MockFormModel>
): ReactElement => {
  return (
    <form onSubmit={props.handleSubmit}>
      <FormTable
        name={FormTableName}
        columnsGetter={getMockColumns}
        data={props.values.mockForm}
        newItemValue={mockNewRowValue}
        isAddItemEnabled={true}
        isDeleteEnabled={true}
        showDeleteAlert={true}
        DataTableRow={withFormTableDisplayErrorRowFormTableName<
          MockFormModel,
          "mockForm",
          MockRowModel
        >("mockForm")}
      />
      <Button data-testid="submitBtn" type="submit">
        Submit
      </Button>
    </form>
  );
};

describe("Form Table", () => {
  it("Should able to submit form", async () => {
    const mockSubmit = jest.fn();

    const user = userEvent.setup({ advanceTimers });
    renderWithProviders(
      <Formik
        initialValues={mockFormInitialValues}
        validationSchema={mockFormSchema}
        // Bypass validation to improve typing performance
        validateOnChange={false}
        onSubmit={mockSubmit}
      >
        {(props: FormikProps<MockFormModel>) => {
          return <MockFormChildren {...props} />;
        }}
      </Formik>
    );

    expect(screen.getAllByTestId("dataTable.body.row").length).toEqual(2);

    await user.click(screen.getByTestId("mockForm[0].deleteButton"));
    expect(screen.getAllByTestId("dataTable.body.row").length).toEqual(1);
  });

  it("Should rendering correct components", async () => {
    const mockSubmit = jest.fn();

    const user = userEvent.setup({ advanceTimers });
    renderWithProviders(
      <Formik
        initialValues={mockFormInitialValues}
        validationSchema={mockFormSchema}
        // Bypass validation to improve typing performance
        validateOnChange={false}
        onSubmit={mockSubmit}
      >
        {(props: FormikProps<MockFormModel>) => {
          return <MockFormChildren {...props} />;
        }}
      </Formik>
    );

    expect(screen.getAllByTestId("dataTable.body.row").length).toEqual(2);

    // Set mockSelect inputs
    await user.selectOptions(
      screen.getByTestId(`mockForm[0].mockSelect`).querySelector("select")!,
      mockRowData1.mockSelect!
    );
    await user.selectOptions(
      screen.getByTestId(`mockForm[1].mockSelect`).querySelector("select")!,
      mockRowData2.mockSelect!
    );
    // Set mockSelect inputs end

    // Set mockInput inputs
    const mockInput1 = screen
      .getByTestId(`mockForm[0].mockInput`)
      .querySelector("input")!;

    mockInput1.focus();
    await user.paste("mockInput1");

    const mockInput2 = screen
      .getByTestId(`mockForm[1].mockInput`)
      .querySelector("input")!;
    mockInput2.focus();
    await user.paste("mockInput2");

    const mockTextInput = screen
      .getByTestId(`mockForm[1].mockText`)
      .querySelector("input")!;
    mockTextInput.focus();
    await user.paste("mockText");

    const mockNumberInput = screen
      .getByTestId(`mockForm[1].mockNumber`)
      .querySelector("input")!;
    mockNumberInput.focus();
    await user.clear(mockNumberInput);
    await user.paste("");
    await user.paste("10");
    await user.paste(".299");

    await user.click(screen.getByTestId(`${FormTableName}[0].mockDate`));
    await user.click(screen.getByLabelText("Choose Sunday, April 2nd, 2023"));
    await user.click(screen.getByTestId("doneBtn"));

    await user.click(screen.getByTestId(`${FormTableName}[1].mockDate`));
    await user.click(screen.getByLabelText("Choose Monday, April 3rd, 2023"));
    await user.click(screen.getByTestId("doneBtn"));
    // Set mockInput inputs end

    // Set mockDate inputs
    await user.click(screen.getByTestId(`${FormTableName}[0].mockDateRange`));
    await user.click(screen.getByLabelText("Choose Thursday, April 6th, 2023"));
    await user.click(screen.getByLabelText("Choose Monday, April 10th, 2023"));
    await user.click(screen.getByTestId("doneBtn"));

    await user.click(screen.getByTestId(`${FormTableName}[1].mockDateRange`));
    await user.click(screen.getByLabelText("Choose Tuesday, April 11th, 2023"));
    await user.click(
      screen.getByLabelText("Choose Saturday, April 15th, 2023")
    );
    await user.click(screen.getByTestId("doneBtn"));
    // Set mockDate inputs end

    await user.click(screen.getByTestId("submitBtn"));
    await waitFor(() =>
      expect(mockSubmit).toHaveBeenCalledWith(
        {
          mockForm: [mockRowData1, mockRowData2],
        },
        expect.objectContaining({})
      )
    );
  }, 50000);

  it("Should be able to add new row", async () => {
    const mockSubmit = jest.fn();

    const user = userEvent.setup({ advanceTimers });
    renderWithProviders(
      <Formik
        initialValues={mockFormInitialValues}
        validationSchema={mockFormSchema}
        // Bypass validation to improve typing performance
        validateOnChange={false}
        onSubmit={mockSubmit}
      >
        {(props: FormikProps<MockFormModel>) => {
          return <MockFormChildren {...props} />;
        }}
      </Formik>
    );

    expect(screen.getAllByTestId("dataTable.body.row").length).toEqual(2);

    const addButton = screen.getByTestId("AddItemButton");
    expect(addButton).toBeInTheDocument();
    await user.click(addButton);

    expect(screen.getAllByTestId("dataTable.body.row").length).toEqual(3);
  }, 20000);

  it("Should be able to delete row", async () => {
    const mockSubmit = jest.fn();

    const user = userEvent.setup({ advanceTimers });
    renderWithProviders(
      <Formik
        initialValues={mockFormInitialValues}
        validationSchema={mockFormSchema}
        // Bypass validation to improve typing performance
        validateOnChange={false}
        onSubmit={mockSubmit}
      >
        {(props: FormikProps<MockFormModel>) => {
          return <MockFormChildren {...props} />;
        }}
      </Formik>
    );

    expect(screen.getAllByTestId("dataTable.body.row").length).toEqual(2);

    await user.click(screen.getAllByRole("checkbox")[1]);
    const deleteButton = screen.getByTestId("DeleteSelectedItemButton");
    expect(deleteButton).toBeInTheDocument();
    await user.click(deleteButton);
    await user.click(screen.getByTestId("confirmDeleteButton"));

    expect(screen.getAllByTestId("dataTable.body.row").length).toEqual(1);
  }, 20000);

  it("Should rendering form with error row", async () => {
    const mockSubmit = jest.fn();

    const schema = object({
      mockForm: array(
        object({
          mockDate: date().defined().nullable(),
          mockDateRange: dateRange(),
          mockInput: string().required(), // test if error is displayed for mockInput
          mockSelect: string(),
          mockText: string(),
          mockNumber: number(),
        })
      ),
    });

    const user = userEvent.setup({ advanceTimers });
    renderWithProviders(
      <Formik
        initialValues={mockFormInitialValues}
        validationSchema={schema}
        validateOnMount={true}
        onSubmit={mockSubmit}
      >
        {(props: FormikProps<MockFormModel>) => {
          return <MockWithErrorFormChildren {...props} />;
        }}
      </Formik>
    );

    await user.click(screen.getByTestId("submitBtn"));
    await waitFor(async () => {
      expect(
        screen.queryAllByText("This field is required")[0]
      ).toBeInTheDocument();
    });
  });
});
