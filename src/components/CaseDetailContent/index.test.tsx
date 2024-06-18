import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import CaseDetailContent, { CaseDetail } from ".";

const detail: CaseDetail = {
  requestType: "REQUEST_TYPE",
  submissionDate: new Date("2023-01-31"),
  referenceNumber: "REFERENCE_NUMBER",
  status: "Submitted",
};

const nullDetail: CaseDetail = {
  requestType: null,
  submissionDate: null,
  referenceNumber: null,
  status: null,
};

test("render", () => {
  renderWithProviders(<CaseDetailContent detail={detail} />);
  expect(screen.queryByText(detail.requestType!)).toBeInTheDocument();
  expect(screen.queryByText(detail.referenceNumber!)).toBeInTheDocument();
  expect(screen.queryByText(detail.status!)).toBeInTheDocument();
  expect(screen.queryByText("31/01/2023")).toBeInTheDocument();
});

test("render with null values", () => {
  renderWithProviders(<CaseDetailContent detail={nullDetail} />);
});
