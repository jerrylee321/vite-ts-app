import { AnyObject, date, tuple, TupleSchema } from "yup";

type DateRangeSchema = TupleSchema<
  [Date | null, Date | null],
  AnyObject,
  [null, null],
  "d"
>;

/**
 * It is a schema for validating the dateRange type, you can pass a boolean to make dateRange become required or not, default is optional
 */

function dateRange(
  isRequired?: boolean,
  errorMessage?: string
): DateRangeSchema {
  return tuple([date().defined().nullable(), date().defined().nullable()])
    .defined()
    .default([null, null])
    .test(
      "invalid_date_range",
      errorMessage ?? "dateRange.invalid.errorMessage",
      ([date1, date2]) => {
        if (isRequired) {
          return date1 != null && date2 != null;
        }
        return (
          (date1 != null && date2 != null) || (date1 == null && date2 == null)
        );
      }
    );
}

export default dateRange;
