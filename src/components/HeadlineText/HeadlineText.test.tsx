import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import HeadlineText from ".";

test("HeadlineText Component", () => {
  const { container } = renderWithProviders(
    <span>
      <HeadlineText
        variant="h5"
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className="test-class-name"
      >
        [test title h5]
      </HeadlineText>
      <HeadlineText variant="h4">[test title h4]</HeadlineText>
      <HeadlineText variant="h3">[test title h3]</HeadlineText>
      <HeadlineText variant="h2">[test title h2]</HeadlineText>
      <HeadlineText variant="h1">[test title h1]</HeadlineText>
    </span>
  );

  expect(container.getElementsByClassName("test-class-name").length).toBe(1);
  expect(container.getElementsByClassName("text-[42px]").length).toBe(1);
  expect(screen.getByText("[test title h5]")).toBeInTheDocument();
  expect(screen.getByText("[test title h4]")).toBeInTheDocument();
  expect(screen.getByText("[test title h3]")).toBeInTheDocument();
  expect(screen.getByText("[test title h2]")).toBeInTheDocument();
  expect(screen.getByText("[test title h1]")).toBeInTheDocument();
});
