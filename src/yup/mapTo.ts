import { Schema } from "yup";

export interface MapToOptions {
  name?: string;
  tupleNames?: string[];

  /**
   * Transform value, not currently implemented.
   */
  transform?: (value: any) => any;
}

/**
 * mapTo does not participate in validation, but it is used to add
 * information to the field's meta object. When set, the specified
 * name will replace the name of the field in validation docs.
 *
 * For array or tuple, it is possible to map individual item to
 * separate fields. For example, specifying ["a1", "a2"] as tupleNames
 * will map array ['hello', 'world'] as `a1: hello` and `a2: world`.
 */
Schema.prototype["mapTo"] = function <T extends Schema>(
  this: T,
  options: MapToOptions
): T {
  return this.meta({ ...this.meta(), mapTo: options });
};
