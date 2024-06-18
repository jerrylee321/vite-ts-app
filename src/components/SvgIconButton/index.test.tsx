import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";

import { ReactComponent as TestIcon } from "../../assets/icons/ic_alert.svg";
import { renderWithProviders } from "../../utils/test/render";

import SvgIconButton from ".";

describe("SvgIconButton Component", () => {
  test("button", () => {
    const testFunction = jest.fn();
    renderWithProviders(
      <SvgIconButton Icon={TestIcon} onClick={testFunction} />
    );

    expect(screen.getByTestId("Icon")).toBeInTheDocument();
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(testFunction).toBeCalledTimes(1);
  });

  test("button disabled", () => {
    const testFunction = jest.fn();
    renderWithProviders(
      <SvgIconButton Icon={TestIcon} onClick={testFunction} disabled={true} />
    );

    expect(screen.getByTestId("Icon")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("link", () => {
    renderWithProviders(
      <SvgIconButton Icon={TestIcon} to="https://example.com" type="Link" />
    );

    expect(screen.getByTestId("Icon")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://example.com"
    );
  });

  test("link disabled", () => {
    renderWithProviders(
      <SvgIconButton
        Icon={TestIcon}
        to="https://example.com"
        type="Link"
        disabled={true}
      />
    );

    expect(screen.getByTestId("Icon")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("aria-disabled", "true");
  });
});
