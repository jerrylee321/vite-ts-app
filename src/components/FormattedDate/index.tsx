import { ReactElement, useMemo } from "react";
import { formatInTimeZone } from "date-fns-tz";

import useTimeZone from "../../hooks/useTimeZone";

interface Props {
  className?: string;
  date: Date | null | undefined;
  dateFormat: string;
  fallback?: string;
}

const FormattedDate = (props: Props): ReactElement => {
  const { className, date, dateFormat, fallback = "" } = props;

  const timeZone = useTimeZone();
  const dateString = useMemo(
    () => (date ? formatInTimeZone(date, timeZone, dateFormat) : fallback),
    [date, dateFormat, fallback, timeZone]
  );

  return <span className={className}>{dateString}</span>;
};

export default FormattedDate;
