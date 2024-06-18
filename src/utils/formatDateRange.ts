import { formatInTimeZone } from "date-fns-tz";

const formatDateRange = (
  dateRange: [Date, Date],
  timeZone: string,
  format: string,
  separator: string = " - "
): string => {
  return dateRange
    .map((d) => formatInTimeZone(d, timeZone, format))
    .join(separator);
};

export default formatDateRange;
