import { addMethod, Message, string } from "yup";

/**
 * Checks if the input string is a valid hkid
 */
/* eslint-disable @typescript-eslint/no-invalid-this */
addMethod(string, "hkid", function (message?: Message) {
  return this.test({
    name: "hkid",
    message,
    params: { test: "hkid" },
    test: function (item) {
      if (!item || item === "") {
        return true;
      }

      // This ignores the check digit. The following align with the server
      // implementation.
      return !!/^[A-Z]{1,2}\d{6}[0-9A]$/.exec(item);
    },
  });
});
