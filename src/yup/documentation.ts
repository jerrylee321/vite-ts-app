import { Schema } from "yup";

export interface DocumentationOptions {
  hidden?: boolean;
  validations?: Record<string, string | string[]>;
  label?: string;
}

/**
 * documentation does not participate in validation, but it is used to add
 * information to the field's meta object.
 */
Schema.prototype["documentation"] = function <T extends Schema>(
  this: T,
  options?: DocumentationOptions
): T | DocumentationOptions {
  if (!options) {
    return this.meta()?.documentation ?? {};
  }

  const { documentation, ...rest } = this.meta() ?? {};
  return this.meta({ rest, documentation: { documentation, ...options } });
};
