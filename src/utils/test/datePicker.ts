import { Screen } from "@testing-library/react";
import { addDays, format as formatDate } from "date-fns";

const DATEPICKER_BUTTON_LABEL_FORMAT = "EEEE, MMMM do, yyyy";

export const getTargetDateFromDatePicker = (
  screen: Screen,
  targetDate: Date
): HTMLElement => {
  const dateLabel = formatDate(targetDate, DATEPICKER_BUTTON_LABEL_FORMAT);
  return screen.getByLabelText(`Choose ${dateLabel}`);
};

export const getTomorrowFromDatePicker = (screen: Screen): HTMLElement => {
  return getTargetDateFromDatePicker(screen, addDays(new Date(), 1));
};
