import "@testing-library/jest-dom";

import { renderWithProviders } from "../../utils/test/render";

import InfoBadgeText from "./";

test("should render target string with style", async () => {
  const testString = "badge Text";
  const { container } = renderWithProviders(
    <InfoBadgeText>{testString}</InfoBadgeText>
  );

  const badgeTextElement = container.getElementsByClassName("bg-lightRed-main");
  expect(badgeTextElement.length).toBe(1);

  const text = badgeTextElement.item(0);
  expect(text?.textContent).toBe(testString);
});
