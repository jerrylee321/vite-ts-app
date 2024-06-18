import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import FormattedDate from ".";

describe("FormattedDate", () => {
  test("render null", () => {
    renderWithProviders(
      <FormattedDate
        date={null}
        dateFormat="dd/MM/yyyy"
        fallback="myfallback"
      />
    );
    expect(screen.getByText("myfallback")).toBeInTheDocument();
  });

  test("render date", () => {
    const date = new Date("2023-06-29");
    renderWithProviders(
      <FormattedDate
        date={date}
        dateFormat="dd/MM/yyyy"
        fallback="myfallback"
      />
    );
    expect(screen.getByText("29/06/2023")).toBeInTheDocument();
  });
});
