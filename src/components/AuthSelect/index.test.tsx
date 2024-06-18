import "@testing-library/jest-dom";

import { ReactComponent as EmailIcon } from "../../assets/icons/ic_email.svg";
import { renderWithProviders } from "../../utils/test/render";

import AuthSelect from ".";

describe("AuthSelect", () => {
  it("should able to render Adormnent", () => {
    renderWithProviders(<AuthSelect StartAdormnment={EmailIcon} />);
  });

  it("should able to render without Adormnent", () => {
    renderWithProviders(<AuthSelect />);
  });
});
