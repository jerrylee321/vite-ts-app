import { FormikErrors } from "formik";
import {
  AnyObject,
  InferType,
  Maybe,
  ObjectSchema,
  ValidationError,
} from "yup";

export type FormikMessages<Values> = {
  [K in keyof Values]?: string[];
};

export const validateFormMultipleErrors = <
  U extends Maybe<AnyObject>,
  T extends ObjectSchema<U>
>(
  schema: T,
  values: InferType<T>
): {
  errors: FormikErrors<InferType<T>>;
  messages: FormikMessages<InferType<T>>;
} => {
  let errors: FormikErrors<InferType<T>> = {};
  let messages: FormikMessages<InferType<T>> = {};

  try {
    schema.validateSync(values, {
      abortEarly: false,
    });
  } catch (err: unknown) {
    /* istanbul ignore next */
    if (!(err instanceof ValidationError)) {
      throw err;
    }

    messages = err.inner.reduce<FormikMessages<InferType<T>>>((result, e) => {
      const key = e.path as keyof InferType<T> | undefined;
      /* istanbul ignore next */
      if (!key) {
        return result;
      }

      return {
        ...result,
        [key]: [...(result[key] ?? []), e.message],
      };
    }, messages);

    errors = err.inner.reduce<FormikErrors<InferType<T>>>((result, e) => {
      /* istanbul ignore next */
      if (!e.path) {
        return result;
      }

      const field = e.path as keyof InferType<T>;

      if (result[field]) {
        return result;
      }

      return { ...result, [field]: e.message };
    }, errors);
  }
  return { messages, errors };
};
