import { addMethod, Message, mixed, object, ObjectSchema } from "yup";

import areAllFieldsEmpty from "../utils/areAllFieldsEmpty";

const errorKey = "_atLeastOneRequired";

const findKeys = (
  all: string[],
  specified: string[] | undefined,
  except: boolean
): string[] => {
  if (!specified) {
    return all;
  }

  return all.filter((f) => {
    if (f === errorKey) return false;
    const included = specified.includes(f);
    return except ? !included : included;
  });
};

export interface AtLeastOneRequiredOptions {
  message?: Message;
  except?: boolean;
}

/**
 * atLeastOneRequired can be added to ObjectSchema to check that at least
 * one of the specified fields must have non-empty value. If no fields are
 * specified, all fields of the object will be considered.
 *
 * This method uses the field's schema to check if a field pass `required`
 * check.
 */
/* eslint-disable @typescript-eslint/no-invalid-this */
addMethod(
  object,
  "atLeastOneRequired",
  function (fields?: string[], options: AtLeastOneRequiredOptions = {}) {
    const { message, except = false } = options;
    return this.shape({
      [errorKey]: mixed().optional(),
    }).test({
      name: "atLeastOneRequired",
      message,
      params: { fields },
      test: function (item) {
        const schema = this.schema as ObjectSchema<Record<string, any>>;

        // `keys` include name of fields that will be checked.
        const keys = findKeys(Object.keys(schema.fields), fields, except);

        const result = !areAllFieldsEmpty(item, { fields: keys as any });

        // Formik requires a path to detect an error.
        if (!result) {
          return this.createError({ params: { path: errorKey } });
        }

        return true;
      },
    });
  }
);
