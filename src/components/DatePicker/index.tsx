import {
  KeyboardEvent,
  ReactElement,
  ReactNode,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import cn from "classnames";
import { format } from "date-fns";
import { formatInTimeZone, utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

import { ReactComponent as DatePickerIcon } from "../../assets/icons/ic_datepicker.svg";
import FormInput from "../../components/FormInput";
import useTimeZone from "../../hooks/useTimeZone";
import { DateFormat } from "../../models/dateFormat";
import { useAppLayout } from "../../providers/AppLayoutProvider";
import { MuiButtonOverride } from "../../styles/MuiButtonOverride.module.scss";
import formatDateRange from "../../utils/formatDateRange";

import CalendarHeader, { CalendarHeaderProps, Limit } from "./CalendarHeader";

export type ReactDatePickerFunctionParams =
  | Date
  | null
  | [Date | null, Date | null];

const isNonNullDateRange = (
  val: ReactDatePickerFunctionParams
): val is [Date, Date] => {
  return Array.isArray(val) && !val.some((date) => date == null);
};

export type DatePickerProps = Omit<
  ReactDatePickerProps,
  "selectsRange" | "onChange"
> & {
  classNamea?: string;
  name?: string;
  label?: string;
  error?: boolean;
  helperText?: string | string[];
  remaining?: string;
  type?: "default" | "range";
  dateFormat?: DateFormat;
  "data-testid"?: string;
  yearOptionsLowerLimit?: Limit;
  yearOptionsUpperLimit?: Limit;
  onChange: (
    date: ReactDatePickerFunctionParams,
    event: SyntheticEvent<any> | undefined
  ) => void;
  showHelperTextOnTop?: boolean;
  showErrorIcon?: boolean;
};

// eslint-disable-next-line complexity
const DatePicker = (props: DatePickerProps): ReactElement => {
  const { layoutRef } = useAppLayout();

  const tz = useTimeZone();
  const { t } = useTranslation();
  const {
    className,
    name,
    label,
    error,
    helperText,
    type,
    showPopperArrow = false,
    dateFormat = "dd/MM/yyyy",
    placeholderText,
    startDate,
    endDate,
    selected,
    onChange,
    inline,
    "data-testid": dataTestId,
    yearOptionsLowerLimit,
    yearOptionsUpperLimit,
    showHelperTextOnTop,
    showErrorIcon,
    minDate,
    maxDate,
    ...rest
  } = props;
  const isRange = type === "range";

  const renderCustomeHeader = useCallback(
    (customHeaderProps: CalendarHeaderProps) => (
      <CalendarHeader
        {...customHeaderProps}
        isRange={isRange}
        yearOptionsLowerLimit={yearOptionsLowerLimit}
        yearOptionsUpperLimit={yearOptionsUpperLimit}
      />
    ),
    [isRange, yearOptionsLowerLimit, yearOptionsUpperLimit]
  );

  const formatWeekDay = useCallback(
    (date: string): ReactNode => format(new Date(date), "eee"),
    []
  );

  const initialDate: ReactDatePickerFunctionParams = useMemo(() => {
    return isRange ? [startDate ?? null, endDate ?? null] : selected ?? null;
  }, [startDate, endDate, isRange, selected]);

  const [displayDate, setDisplayDate] =
    useState<ReactDatePickerFunctionParams>(initialDate);
  const [open, setOpen] = useState(false);
  const onSelect = useCallback(
    (value: ReactDatePickerFunctionParams) => {
      if (!value) {
        setDisplayDate(value);
        return;
      }

      // NOTE: react-datepicker expect date in system timezone. So we need
      // to change it back to UTC.
      if (Array.isArray(value)) {
        setDisplayDate([
          value[0] ? zonedTimeToUtc(value[0], tz) : null,
          value[1] ? zonedTimeToUtc(value[1], tz) : null,
        ]);
        return;
      }

      setDisplayDate(zonedTimeToUtc(value, tz));
    },
    [tz]
  );

  const onClear = useCallback(() => {
    if (isRange) {
      setDisplayDate([null, null]);
    } else {
      setDisplayDate(null);
    }
    onChange(displayDate, undefined);
  }, [displayDate, isRange, onChange]);

  const onDone = useCallback(() => {
    onChange(displayDate, undefined);
    setOpen(false);
  }, [onChange, displayDate]);

  // Reset previsous value callback
  // const onReset = useCallback(() => {
  //   if (isRange) {
  //     setDisplayDate([startDate ?? null, endDate ?? null]);
  //   } else {
  //     setDisplayDate(selected ?? null);
  //   }
  // }, [endDate, isRange, selected, startDate]);

  const onClickOutside = useCallback(() => {
    if (!inline) {
      onChange(displayDate, undefined);
      setOpen(false);
    }
  }, [displayDate, onChange, inline]);

  const onInputClick = useCallback(() => {
    if (props.disabled) {
      return;
    }
    setOpen(true);
  }, [props.disabled]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        onChange(displayDate, undefined);
        setOpen(false);
      }
    },
    [displayDate, onChange]
  );

  useEffect(() => {
    // If date picker is not active, let the value of the dates be controlled
    // by props values. Required when clearing form values.
    if (!open) {
      setDisplayDate(initialDate);
    }
  }, [open, initialDate]);

  const displayString = useMemo(() => {
    if (isRange) {
      return isNonNullDateRange(displayDate)
        ? formatDateRange(displayDate, tz, dateFormat)
        : "";
    }

    return !Array.isArray(displayDate) && displayDate !== null
      ? formatInTimeZone(displayDate, tz, dateFormat)
      : "";
  }, [dateFormat, displayDate, isRange, tz]);

  const timezoneAdjustedProps: Partial<ReactDatePickerProps> = useMemo(() => {
    const zonedMinDate = minDate ? utcToZonedTime(minDate, tz) : undefined;
    const zonedMaxDate = maxDate ? utcToZonedTime(maxDate, tz) : undefined;

    if (isRange) {
      const zonedStartDate =
        Array.isArray(displayDate) && displayDate[0]
          ? utcToZonedTime(displayDate[0], tz)
          : undefined;
      const zonedEndDate =
        Array.isArray(displayDate) && displayDate[1]
          ? utcToZonedTime(displayDate[1], tz)
          : undefined;
      return {
        startDate: zonedStartDate,
        endDate: zonedEndDate,
        minDate: zonedMinDate,
        maxDate: zonedMaxDate,
      };
    }

    const zonedSelected =
      !Array.isArray(displayDate) && displayDate
        ? utcToZonedTime(displayDate, tz)
        : undefined;

    return {
      selected: zonedSelected,
      minDate: zonedMinDate,
      maxDate: zonedMaxDate,
    };
  }, [minDate, tz, maxDate, isRange, displayDate]);

  return (
    <ReactDatePicker
      disabledKeyboardNavigation={true}
      open={open}
      wrapperClassName={className}
      calendarClassName="grid"
      name={name}
      inline={inline}
      autoComplete="off"
      dateFormat={dateFormat}
      selectsRange={isRange}
      placeholderText={placeholderText}
      value={displayString}
      showPopperArrow={showPopperArrow}
      renderCustomHeader={renderCustomeHeader}
      monthsShown={isRange ? 2 : 1}
      formatWeekDay={formatWeekDay}
      showPreviousMonths={false}
      customInput={
        <FormInput
          error={error}
          label={label}
          autoComplete="off"
          id={name}
          helperText={helperText}
          fullWidth={true}
          data-testid={dataTestId}
          showHelperTextOnTop={showHelperTextOnTop}
          showErrorIcon={showErrorIcon}
          endAdornment={
            <DatePickerIcon
              fill="currentColor"
              className="text-spanishGray-main"
            />
          }
        />
      }
      popperModifiers={[
        {
          name: "preventOverflow",
          options: {
            boundary: layoutRef.current ?? undefined,
            padding: 20,
            rootBoundary: "viewport",
            tether: true,
            altAxis: true,
          },
        },
      ]}
      shouldCloseOnSelect={false}
      onInputClick={onInputClick}
      onChange={onSelect}
      onKeyDown={onKeyDown}
      onClickOutside={onClickOutside}
      popperProps={{
        strategy: "fixed",
        placement: "right-end",
      }}
      {...timezoneAdjustedProps}
      {...rest}
    >
      <div className="flex w-full flex-row items-center justify-center gap-5 py-4">
        {isRange ? (
          <Button
            aria-label={t("DatePicker.action.clear")}
            type="button"
            className={cn(
              MuiButtonOverride,
              "text-primary-main border-primary-main"
            )}
            data-testid="clearBtn"
            variant="outlined"
            onClick={onClear}
          >
            {t("DatePicker.action.clear")}
          </Button>
        ) : null}
        <Button
          aria-label={t("DatePicker.action.done")}
          type="button"
          className={cn(
            MuiButtonOverride,
            "text-primary-contrastText border-primary-main bg-primary-main"
          )}
          data-testid="doneBtn"
          variant="contained"
          onClick={onDone}
        >
          {t("DatePicker.action.done")}
        </Button>
      </div>
    </ReactDatePicker>
  );
};

export default DatePicker;
