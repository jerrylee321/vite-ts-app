import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import { getYear } from "date-fns";

import { renderWithProviders } from "../../utils/test/render";

import CalendarHeader from "./CalendarHeader";

describe("Calendar Header", () => {
  it("should render components correctly", () => {
    renderWithProviders(
      <CalendarHeader
        monthDate={new Date()}
        date={new Date()}
        changeYear={jest.fn()}
        changeMonth={jest.fn()}
        customHeaderCount={0}
        decreaseMonth={jest.fn()}
        increaseMonth={jest.fn()}
        prevMonthButtonDisabled={false}
        nextMonthButtonDisabled={false}
        decreaseYear={jest.fn()}
        increaseYear={jest.fn()}
        prevYearButtonDisabled={false}
        nextYearButtonDisabled={false}
        isRange={false}
      />
    );

    expect(screen.getByTestId("toggleYearsOptions")).toBeInTheDocument();
    expect(screen.getByTestId("previousMonth")).toBeInTheDocument();
    expect(screen.getByTestId("nextMonth")).toBeInTheDocument();

    expect(screen.getByTestId("year")).toBeInTheDocument();
    expect(screen.getByTestId("month")).toBeInTheDocument();
  });

  it("should show correct year options absolute year limits", () => {
    renderWithProviders(
      <CalendarHeader
        monthDate={new Date()}
        date={new Date()}
        changeYear={jest.fn()}
        changeMonth={jest.fn()}
        customHeaderCount={0}
        decreaseMonth={jest.fn()}
        increaseMonth={jest.fn()}
        prevMonthButtonDisabled={false}
        nextMonthButtonDisabled={false}
        decreaseYear={jest.fn()}
        increaseYear={jest.fn()}
        prevYearButtonDisabled={false}
        nextYearButtonDisabled={false}
        isRange={false}
        yearOptionsLowerLimit={{ type: "absolute", limit: 1990 }}
        yearOptionsUpperLimit={{ type: "absolute", limit: 2010 }}
      />
    );

    const toggleYearsOptionsBtn = screen.getByTestId("toggleYearsOptions");
    fireEvent.click(toggleYearsOptionsBtn);

    for (let year = 1990; year <= 2010; year++) {
      expect(screen.getByTestId(`selectYear${year}`)).toBeInTheDocument();
    }
    expect(() => screen.getByTestId(`selectYear2011`)).toThrow();
    expect(() => screen.getByTestId(`selectYear1989`)).toThrow();
  });

  it("should show correct year options relative year limits", () => {
    const amount = 13;
    renderWithProviders(
      <CalendarHeader
        monthDate={new Date()}
        date={new Date()}
        changeYear={jest.fn()}
        changeMonth={jest.fn()}
        customHeaderCount={0}
        decreaseMonth={jest.fn()}
        increaseMonth={jest.fn()}
        prevMonthButtonDisabled={false}
        nextMonthButtonDisabled={false}
        decreaseYear={jest.fn()}
        increaseYear={jest.fn()}
        prevYearButtonDisabled={false}
        nextYearButtonDisabled={false}
        isRange={false}
        yearOptionsLowerLimit={{ type: "relative", amount }}
        yearOptionsUpperLimit={{ type: "relative", amount }}
      />
    );

    const toggleYearsOptionsBtn = screen.getByTestId("toggleYearsOptions");
    fireEvent.click(toggleYearsOptionsBtn);

    for (
      let year = getYear(new Date()) - amount;
      year <= getYear(new Date()) + amount;
      year++
    ) {
      expect(screen.getByTestId(`selectYear${year}`)).toBeInTheDocument();
    }
    expect(() =>
      screen.getByTestId(`selectYear${getYear(new Date()) + amount + 1}`)
    ).toThrow();
    expect(() =>
      screen.getByTestId(`selectYear${getYear(new Date()) - amount - 1}`)
    ).toThrow();
  });

  it("should have proper functional button", () => {
    const changeYear = jest.fn();
    const changeMonth = jest.fn();
    const decreaseMonth = jest.fn();
    const increaseMonth = jest.fn();
    const decreaseYear = jest.fn();
    const increaseYear = jest.fn();

    renderWithProviders(
      <CalendarHeader
        monthDate={new Date()}
        date={new Date()}
        changeYear={changeYear}
        changeMonth={changeMonth}
        customHeaderCount={0}
        decreaseMonth={decreaseMonth}
        increaseMonth={increaseMonth}
        prevMonthButtonDisabled={false}
        nextMonthButtonDisabled={false}
        decreaseYear={decreaseYear}
        increaseYear={increaseYear}
        prevYearButtonDisabled={false}
        nextYearButtonDisabled={false}
        isRange={false}
      />
    );

    const toggleYearsBtn = screen.getByTestId("toggleYearsOptions");
    const previousMonthBtn = screen.getByTestId("previousMonth");
    const nextMonthBtn = screen.getByTestId("nextMonth");

    fireEvent.click(toggleYearsBtn);
    fireEvent.click(screen.getByTestId("selectYear1990"));
    expect(changeYear).toHaveBeenCalledTimes(1);
    fireEvent.click(previousMonthBtn);
    expect(decreaseMonth).toHaveBeenCalledTimes(1);
    fireEvent.click(nextMonthBtn);
    expect(increaseMonth).toHaveBeenCalledTimes(1);
  });
});
