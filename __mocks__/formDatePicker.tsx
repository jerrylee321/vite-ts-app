import { ChangeEvent, ReactElement, useCallback, useMemo } from "react";
import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";

// Note:
//
// Workaround jest cannot interact with react date-picker
// Mock FormDatePicker with text input, changing value to JSON serialised value
//
// Usage:
//
// import "frontend-common/__mocks__/formDatePicker";
// ...
// describe(your test...);

jest.mock("frontend-common/src/components/FormDatePicker", () => {
  const MockFormDatePicker = (props: any): ReactElement => {
    const {
      name,
      type,
      onChange,
      startDate,
      minDate,
      endDate,
      error,
      helperText,
      value,
      dateFormat,
      ...restProps
    } = props;

    const _value = useMemo(() => (value === null ? "" : value), [value]);
    const _onChange = useCallback(
      (ev: ChangeEvent<HTMLInputElement>) => {
        ev.preventDefault();
        ev.stopPropagation();
        onChange(
          name,
          type === "range"
            ? JSON.parse(ev.target.value).map((str: string) => new Date(str))
            : new Date(ev.target.value)
        );
      },
      [name, onChange, type]
    );
    return (
      <input
        type="text"
        name={name}
        onChange={_onChange}
        {...restProps}
        value={_value}
      />
    );
  };

  return {
    __esModule: true,
    default: MockFormDatePicker,
  };
});

export function fillMockDateRangePicker(
  instance: ReturnType<typeof screen.getByTestId>,
  value: (Date | null)[]
): void {
  fireEvent.change(instance, {
    target: {
      value: JSON.stringify(value),
    },
  });
}

export function fillMockDateRangePickerByTestId(
  testId: string,
  value: (Date | null)[]
): void {
  fillMockDateRangePicker(screen.getByTestId(testId), value);
}

export function fillMockDatePicker(
  instance: ReturnType<typeof screen.getByTestId>,
  value: Date
): void {
  fireEvent.change(instance, {
    target: {
      value: value.toISOString(),
    },
  });
}

export function fillMockDatePickerByTestId(testId: string, value: Date): void {
  fillMockDatePicker(screen.getByTestId(testId), value);
}
