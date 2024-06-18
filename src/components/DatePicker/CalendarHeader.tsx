import React, { ReactElement, useCallback, useMemo, useState } from "react";
import type { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { useTranslation } from "react-i18next";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import cn from "classnames";
import { format } from "date-fns";
import getYear from "date-fns/getYear";

import range from "../../utils/range";

interface YearButtonProps {
  year: number;
  date: Date;
  onClick: (year: number) => void;
}

const YearButton = (props: YearButtonProps): ReactElement => {
  const { date, year, onClick, ...rest } = props;
  const _onClick = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>) => {
      ev.stopPropagation();
      ev.preventDefault();
      onClick(year);
    },
    [onClick, year]
  );

  return (
    <IconButton
      {...rest}
      className={cn("rounded-full p-2 text-base font-bold", {
        "text-primary-main": year === getYear(date),
      })}
      key={year}
      onClick={_onClick}
    >
      {year}
    </IconButton>
  );
};

export type Limit =
  | {
      type: "relative";
      amount: number;
    }
  | {
      type: "absolute";
      limit: number;
    };

export type CalendarHeaderProps = ReactDatePickerCustomHeaderProps & {
  isRange: boolean;
  yearOptionsLowerLimit?: Limit;
  yearOptionsUpperLimit?: Limit;
};

const CalendarHeader = (props: CalendarHeaderProps): ReactElement => {
  const {
    date,
    monthDate,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
    // eslint-disable-next-line jest/unbound-method
    changeYear,
    // eslint-disable-next-line jest/unbound-method
    increaseMonth,
    // eslint-disable-next-line jest/unbound-method
    decreaseMonth,
    customHeaderCount,
    isRange,
    yearOptionsLowerLimit = { type: "absolute", limit: 1990 },
    yearOptionsUpperLimit = { type: "relative", amount: 10 },
  } = props;
  const { t } = useTranslation();

  const yearOptionsLower = useMemo(() => {
    switch (yearOptionsLowerLimit.type) {
      case "relative":
        return getYear(new Date()) - Math.max(0, yearOptionsLowerLimit.amount);
      case "absolute":
        return yearOptionsLowerLimit.limit;
    }
    return getYear(new Date());
  }, [yearOptionsLowerLimit]);

  const yearOptionsUpper = useMemo(() => {
    switch (yearOptionsUpperLimit.type) {
      case "relative":
        return getYear(new Date()) + Math.max(0, yearOptionsUpperLimit.amount);
      case "absolute":
        return yearOptionsUpperLimit.limit;
    }
    return getYear(new Date());
  }, [yearOptionsUpperLimit]);

  const [isYearsOptionsVisible, setIsYearsOptionsVisible] = useState(false);

  const toggleYearsOptions = useCallback((): void => {
    setIsYearsOptionsVisible((prevState) => !prevState);
  }, []);

  const selectYear = useCallback(
    (year: number): void => {
      changeYear(year);
      setIsYearsOptionsVisible(false);
    },
    [changeYear]
  );

  const renderSelectMonthButton = (direction: "previous" | "next") => {
    return (
      <IconButton
        className="h-5 w-7.5 rounded-none bg-gray-light"
        aria-label={
          direction === "previous"
            ? t("DatePicker.action.previousMonth.label")
            : t("DatePicker.action.nextMonth.label")
        }
        data-testid={direction === "previous" ? "previousMonth" : "nextMonth"}
        disabled={
          direction === "previous"
            ? prevMonthButtonDisabled
            : nextMonthButtonDisabled
        }
        onClick={direction === "previous" ? decreaseMonth : increaseMonth}
      >
        {direction === "previous" ? (
          <ChevronLeftIcon className="h-4 w-4 text-metalicBlue-main" />
        ) : (
          <ChevronRightIcon className="h-4 w-4 text-metalicBlue-main" />
        )}
      </IconButton>
    );
  };

  const renderMonthYears = () => {
    return (
      <div className="flex flex-row items-center gap-1">
        <Typography
          data-testid="month"
          variant="body1"
          className="min-w-20 font-bold text-independence-main"
        >
          {format(monthDate, "LLLL")}
        </Typography>
        <IconButton
          aria-label={t("DatePicker.action.toggleYearsOptions.label")}
          data-testid="toggleYearsOptions"
          disableRipple={true}
          className="text-independence-main"
          onClick={toggleYearsOptions}
        >
          <Typography data-testid="year" variant="body1" className="font-bold">
            {format(monthDate, "yyyy")}
          </Typography>
          {isYearsOptionsVisible ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </IconButton>
      </div>
    );
  };

  return (
    <div className="mx-4 flex flex-col gap-1">
      <div className="flex flex-row items-center justify-between gap-1 p-1">
        {!isRange ? (
          <>
            {renderMonthYears()}
            <div className="flex flex-row gap-1">
              {renderSelectMonthButton("previous")}
              {renderSelectMonthButton("next")}
            </div>
          </>
        ) : (
          <>
            {customHeaderCount === 0 ? (
              <>
                {renderSelectMonthButton("previous")}
                {renderMonthYears()}
                <div className="h-6 w-6"></div>
              </>
            ) : (
              <>
                <div className="h-6 w-6"></div>
                {renderMonthYears()}
                {renderSelectMonthButton("next")}
              </>
            )}
          </>
        )}
      </div>
      {isYearsOptionsVisible ? (
        <div className="grid max-h-25 w-auto grid-cols-3 gap-1 overflow-auto p-2">
          {range(yearOptionsLower, yearOptionsUpper, 1).map((year) => (
            <YearButton
              data-testid={`selectYear${year}`}
              aria-label={t("DatePicker.action.selectYear.label", {
                year: year,
              })}
              key={year}
              year={year}
              date={date}
              onClick={selectYear}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default CalendarHeader;
