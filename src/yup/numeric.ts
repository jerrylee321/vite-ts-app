import { number, NumberSchema } from "yup";

export const numericSchema = (
  precision: number,
  scale: number
): NumberSchema<number | null | undefined> =>
  number()
    // allow empty string to pass the validation
    .nullable()
    .transform((_, val) => (val === Number(val) ? val : 0))
    .min(0)
    // test scale
    .test({
      test: (value) => {
        return ((value ?? 0) * Math.pow(10, scale)) % 1 === 0;
      },
      message: `Value has to be in ${scale} decimal places`,
    })
    //test Precision
    .test({
      test: (value) => {
        return (
          ((value ?? 0) * Math.pow(10, scale)) / Math.pow(10, precision) < 1
        );
      },
      message: `Value can only have ${
        precision - scale
      } digit(s) before decimal point`,
    });
