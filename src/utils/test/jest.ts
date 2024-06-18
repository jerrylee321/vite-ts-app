import type { MatcherFunction } from "@jest/expect";
import {
  matcherErrorMessage,
  matcherHint,
  printReceived,
  printWithType,
  RECEIVED_COLOR,
} from "jest-matcher-utils";

const isMock = (received: unknown): received is jest.Mock => {
  return jest.isMockFunction(received);
};

export const toShowErrorsInArgs: MatcherFunction = function (actual) {
  const matcherName = "toHaveBeenCalledWithErrorsInArguments";
  const matcherOptions = {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    isNot: this.isNot,
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    promise: this.promise,
  };

  if (!isMock(actual)) {
    throw new Error(
      matcherErrorMessage(
        matcherHint(matcherName, undefined, "", matcherOptions),
        `${RECEIVED_COLOR("received")} value must be a mock or spy function`,
        printWithType("Received", actual, printReceived)
      )
    );
  }

  const errors = actual.mock.calls
    .map((call) => call[0])
    .flat()
    .filter((e) => !!e);
  const pass = errors.length > 0;
  const message = pass
    ? () => {
        return (
          matcherHint(matcherName, undefined, "", matcherOptions) +
          "\n\n" +
          "Expected useShowErrors not to have been called with any errors." +
          `Received: ${printReceived(errors[0])}`
        );
      }
    : () => {
        return (
          matcherHint(matcherName, undefined, "", matcherOptions) +
          "\n\n" +
          "Expected useShowErrors to have been called with some errors. Received none."
        );
      };
  return { message, pass };
};
