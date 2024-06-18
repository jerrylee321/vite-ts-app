import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import MessageDialogWithActions from ".";

test("should render dialog with icon and message", async () => {
  const titleString = "custom title";
  const bodyString = "custom body";
  const onClose = jest.fn();
  renderWithProviders(
    <MessageDialogWithActions
      open={true}
      onClose={onClose}
      title={titleString}
      body={bodyString}
      icon="success"
      buttons={[
        {
          text: "BACK",
          style: "secondary",
        },
        {
          text: "SUBMIT",
          style: "primary",
        },
      ]}
    />
  );
  expect(screen.getByTestId("DialogSuccessIcon")).toBeInTheDocument();
  expect(screen.getByTestId("MessageDialogTitle").textContent).toBe(
    titleString
  );
  expect(screen.getByTestId("MessageDialogBody").textContent).toBe(bodyString);
});

test("should render dialog with fail icon", async () => {
  const titleString = "custom title";
  const bodyString = "custom body";
  const onClose = jest.fn();
  renderWithProviders(
    <MessageDialogWithActions
      open={true}
      onClose={onClose}
      title={titleString}
      body={bodyString}
      icon="fail"
      buttons={[
        {
          text: "BACK",
          style: "secondary",
        },
        {
          text: "SUBMIT",
          style: "primary",
        },
      ]}
    />
  );
  expect(screen.getByTestId("DialogFailIcon")).toBeInTheDocument();
});
test("should render dialog with warning icon", async () => {
  const titleString = "custom title";
  const bodyString = "custom body";
  const onClose = jest.fn();
  renderWithProviders(
    <MessageDialogWithActions
      open={true}
      onClose={onClose}
      title={titleString}
      body={bodyString}
      icon="warning"
      buttons={[
        {
          text: "BACK",
          style: "secondary",
        },
        {
          text: "SUBMIT",
          style: "primary",
        },
      ]}
    />
  );
  expect(screen.getByTestId("DialogWarningIcon")).toBeInTheDocument();
});
test("should render dialog with question icon", async () => {
  const titleString = "custom title";
  const bodyString = "custom body";
  const onClose = jest.fn();
  renderWithProviders(
    <MessageDialogWithActions
      open={true}
      onClose={onClose}
      title={titleString}
      body={bodyString}
      icon="question"
      buttons={[
        {
          text: "BACK",
          style: "secondary",
        },
        {
          text: "SUBMIT",
          style: "primary",
        },
      ]}
    />
  );
  expect(screen.getByTestId("DialogQuestionIcon")).toBeInTheDocument();
});

test("should render dialog with system alert important icon", async () => {
  const titleString = "custom title";
  const bodyString = "custom body";
  const onClose = jest.fn();
  renderWithProviders(
    <MessageDialogWithActions
      open={true}
      onClose={onClose}
      title={<span>{titleString}</span>}
      body={bodyString}
      icon="system-alert-important"
      buttons={[
        {
          text: "BACK",
          style: "secondary",
        },
        {
          text: "SUBMIT",
          style: "primary",
        },
      ]}
    />
  );
  expect(
    screen.getByTestId("DialogSystemAlertImportantIcon")
  ).toBeInTheDocument();
});

test("should render dialog with system alert icon", async () => {
  const titleString = "custom title";
  const bodyString = "custom body";
  const onClose = jest.fn();
  renderWithProviders(
    <MessageDialogWithActions
      open={true}
      onClose={onClose}
      title={<span>{titleString}</span>}
      body={bodyString}
      icon="system-alert"
      buttons={[
        {
          text: "BACK",
          style: "secondary",
        },
        {
          text: "SUBMIT",
          style: "primary",
        },
      ]}
    />
  );
  expect(screen.getByTestId("DialogSystemAlertIcon")).toBeInTheDocument();
});
