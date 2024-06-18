import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import CaseDetailSection, { CaseDetail } from ".";

const detail: CaseDetail = {
  requestType: "REQUEST_TYPE",
  submissionDate: new Date("2023-01-31"),
  referenceNumber: "REFERENCE_NUMBER",
  status: "Submitted",
};

test("render", () => {
  renderWithProviders(<CaseDetailSection detail={detail} />);
  expect(screen.queryByText(detail.requestType!)).toBeInTheDocument();
});

test("render with children", () => {
  renderWithProviders(
    <CaseDetailSection detail={detail}>Hello World</CaseDetailSection>
  );
  expect(screen.queryByText("Hello World")).toBeInTheDocument();
});
