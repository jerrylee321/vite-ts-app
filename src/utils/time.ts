import { addDays, startOfDay, subDays } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

import { defaultTimeZone } from "../models/time";

/**
 * Returns the start time of the day when considering the specified Date
 * in the specified timezone.
 *
 * The returned date is in UTC. Use formatInTimeZone to format the date
 * in the required timezone.
 */
export const startOfDayInZone = (date: Date, tz: string): Date => {
  return zonedTimeToUtc(startOfDay(utcToZonedTime(date, tz)), tz);
};

export const todayDateInZone = (tz: string): Date => {
  return startOfDayInZone(new Date(), tz);
};

export const tomorrowDateInZone = (tz: string): Date => {
  return addDays(todayDateInZone(tz), 1);
};

export const yesterdayDateInZone = (date: Date, tz: string): Date => {
  return subDays(startOfDayInZone(date, tz), 1);
};

export const todayDateInDefaultZone = (): Date => {
  return todayDateInZone(defaultTimeZone);
};

export const tomorrowDateInDefaultZone = (): Date => {
  return tomorrowDateInZone(defaultTimeZone);
};

export const yesterdayDateInDefaultZone = (date: Date): Date => {
  return yesterdayDateInZone(date, defaultTimeZone);
};
