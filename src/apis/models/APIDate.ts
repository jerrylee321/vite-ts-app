import { isValid, parse } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { z } from "zod";

import { defaultTimeZone } from "../../models/time";

export const APIDateSchema = z
  .date()
  .transform((date) => formatInTimeZone(date, defaultTimeZone, "yyyy-MM-dd"));

interface APIDateTimeSchemaAttr {
  timeZone: string;
  formatStr: string;
}

type APIDateTimeSchemaTimeZone = "HongKong" | "UTC";

export const APIDateTimeSchemaAttrDefs: {
  [key in APIDateTimeSchemaTimeZone]: APIDateTimeSchemaAttr;
} = {
  HongKong: {
    formatStr: "yyyy-MM-dd'T'HH:mm:ss'+0800'",
    timeZone: "Asia/Hong_Kong",
  },
  UTC: {
    formatStr: "yyyy-MM-dd'T'HH:mm:ss'+0000'",
    timeZone: "Etc/UTC",
  },
};

export const APIDateTimeSchema = makeAPIDateTimeSchema(
  APIDateTimeSchemaAttrDefs.UTC
);

export function makeAPIDateTimeSchema(
  attr: APIDateTimeSchemaAttr
): z.ZodEffects<z.ZodDate, string, Date> {
  return z
    .date()
    .transform((date) => formatInTimeZone(date, attr.timeZone, attr.formatStr));
}

export const APIDateResponseSchema = z
  .union([z.number(), z.string(), z.date()])
  .pipe(z.coerce.date());

export const APIDayFirstDateSchema = z.union([
  z
    .string()
    .transform((date) => parse(date, "dd/MM/yyyy", new Date()))
    .refine(isValid),
  z
    .string()
    .transform((date) => parse(date, "ddMMyyyy", new Date()))
    .refine(isValid),
]);

export const APIDayFirstDateRequestSchema = z
  .date()
  .transform((date) => formatInTimeZone(date, defaultTimeZone, "dd/MM/yyyy"));

export const APINullableDayFirstDateRequestSchema = z
  .date()
  .nullable()
  .transform((date) => {
    return date ? formatInTimeZone(date, defaultTimeZone, "dd/MM/yyyy") : null;
  });
