import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik } from "formik";

import { renderWithProviders } from "../../../utils/test/render";
import { PaymentRequisitionDetailViewModel } from "../PaymentRequisitionContents";
import {
  getMmbUpdateFormInitialValues,
  UpdateMmbPaymentRequisitionFormSchema,
} from "../UpdateFormModel/UpdatePaymentRequisitionFormModel";

import PaymentDetailsSubForm from "./PaymentDetailsSubForm";

describe("PaymentDetailsSubForm", () => {
  const mockMmbTransferViewModel: PaymentRequisitionDetailViewModel = {
    transferType: "MmbTransfer",
    memberList: [],
    transferRequest: {
      originalRequest: {
        trusteeName: "AIB Company (Trustee) Limited",
        schemeName: "BEA Bunda (MPF) Master Trust Schemes",
        employerName: "Personal Account (ORIGINAL)",
        employerAccountNumber: "91234567891",
      },
      newRequest: {
        trusteeName: "AIA Company (Trustee) Limited",
        schemeName: "AIA MPF - Prime Value Choice",
        employerName: "Personal Account (NEW)",
        employerAccountNumber: "91234567890",
      },
      transferType: "IntraGroupTransfer",
      employerTransferRefNo: "TF95026520230421033218",
      transferEffectiveDate: new Date("2022-08-14"),
      followUp: {
        title: "followUpTitle",
        comment: "followUpComment",
      },
    },
    paymentInfo: {
      billingRefNo: "billRefNo",
      bankName: "bankName",
      paymentMethod: { name: "payMethod", key: "payMethod" },
      bankAcctNo: "bankAccntNumber",
      chequeNo: "chequeNo",
      totalAmount: 100,
    },
    trusteeComment: "trusteeComment",
  };

  const user = userEvent.setup();

  it("should render", async () => {
    renderWithProviders(
      <Formik
        initialValues={getMmbUpdateFormInitialValues(mockMmbTransferViewModel)}
        validationSchema={UpdateMmbPaymentRequisitionFormSchema}
        onSubmit={jest.fn()}
      >
        {(formikProps) => (
          <>
            <form onSubmit={formikProps.handleSubmit}>
              <PaymentDetailsSubForm
                formikProps={formikProps}
                formikErrors={{ isErrors: {}, helperTexts: {} }}
                paymentMethodOptions={[]}
                onUpload={jest.fn()}
                onDownloadTemplateClick={jest.fn()}
              ></PaymentDetailsSubForm>
            </form>
          </>
        )}
      </Formik>
    );

    await user.click(screen.getByTestId("uploadDataByBatchButton"));

    await user.click(screen.getByTestId("UploadDataByBatchDialog.backButton"));

    await user.click(screen.getByTestId("uploadDataByBatchButton"));

    window.URL.createObjectURL = jest.fn().mockImplementation(() => "url");
    const inputEl = screen.getByTestId("uploadFilePickerInput");
    const file = new File(["file"], "test.xlsx", {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    await waitFor(() => {
      fireEvent.change(inputEl, {
        target: { files: [file] },
      });
    });
    await user.click(screen.getByTestId("UploadButton"));
    await user.click(
      screen.getByTestId("UploadDataByBatchDialog.confirmButton")
    );
  });
});
