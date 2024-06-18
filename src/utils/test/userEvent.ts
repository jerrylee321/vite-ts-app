import {
  act,
  buildQueries,
  getByRole,
  Matcher,
  MatcherOptions,
  queries,
  queryHelpers,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

type AdvanceTimersFunction =
  | ((delay: number) => Promise<void>)
  | ((delay: number) => void);

export const advanceTimers: AdvanceTimersFunction = () => {
  // do nothing
};

const queryAllByDataValue = (
  container: HTMLElement,
  id: Matcher,
  options?: MatcherOptions | undefined
) => queryHelpers.queryAllByAttribute("data-value", container, id, options);

const getMultipleError = (_: Element | null, value: string) =>
  `Found multiple elements with the data-value attribute of: ${value}`;
const getMissingError = (_: Element | null, value: string) =>
  `Unable to find an element with the data-value attribute of: ${value}`;

const [
  queryByDataValue,
  getAllByDataValue,
  getByDataValue,
  findAllByDataValue,
  findByDataValue,
] = buildQueries(queryAllByDataValue, getMultipleError, getMissingError);

const allQueries = {
  ...queries,
  ...{
    queryByDataValue,
    getAllByDataValue,
    getByDataValue,
    findAllByDataValue,
    findByDataValue,
  },
};

const customScreen = within(document.body, allQueries);

type UserEvent = ReturnType<typeof userEvent.setup>;

export const setupUserEvent = (): UserEvent => {
  return userEvent.setup({ advanceTimers });
};

export const selectMuiOption = async (
  user: UserEvent,
  selectTestId: string,
  value: string
): Promise<void> => {
  const select = getByRole(customScreen.getByTestId(selectTestId), "button");

  await user.click(select);
  await user.click(await customScreen.findByDataValue(value));
};

export const pasteTextIntoInput = async (
  user: UserEvent,
  inputTestId: string,
  value: string,
  type: "textarea" | "input" = "input"
): Promise<void> => {
  const inputField = customScreen.getByTestId(inputTestId).querySelector(type)!;
  act(() => {
    inputField.focus();
    inputField.select();
  });
  await user.paste(value);
};
