import { ReactElement, useEffect } from "react";
import { screen } from "@testing-library/react";
import { AxiosError } from "axios";
import { ZodError } from "zod";

import { APIError } from "../apis/models/APIError";
import { renderWithProviders } from "../utils/test/render";

import { useErrorAlert } from "./ErrorAlertProvider";

test("useErrorAlert APIError", async () => {
  const TestContainer = (): ReactElement => {
    const { show } = useErrorAlert();
    useEffect(() => {
      show(
        new APIError({
          errorCode: "TEST_ERROR_CODE",
          errorMessage: {
            en: "Test Error Message",
            zhHK: "",
            zhCN: "",
          },
          traceId: "test-trace-id",
        })
      );
    }, [show]);
    return <div data-testid="test-container" />;
  };
  const container = renderWithProviders(<TestContainer />);
  expect(container.getByTestId("test-container")).toBeInTheDocument();
  expect(screen.getAllByText("TEST_ERROR_CODE")).toHaveLength(1);
  expect(container.getByTestId("MessageDialogBody")).toHaveTextContent(
    "Test Error Message"
  );
  expect(container.getByTestId("MessageDialogBody")).toHaveTextContent(
    "test-trace-id"
  );
});

test("useErrorAlert ZodError", async () => {
  const TestContainer = (): ReactElement => {
    const { show } = useErrorAlert();
    useEffect(() => {
      show(new ZodError([]));
    }, [show]);
    return <div data-testid="test-container" />;
  };
  const container = renderWithProviders(<TestContainer />);
  expect(container.getByTestId("test-container")).toBeInTheDocument();
  expect(screen.getAllByText("Schema Error")).toHaveLength(1);
  expect(
    screen.getAllByText("Error parsing API request or response.")
  ).toHaveLength(1);
});

test("useErrorAlert Unknown Error", async () => {
  const TestContainer = (): ReactElement => {
    const { show } = useErrorAlert();
    useEffect(() => {
      show(new Error("Something went wrong!"));
    }, [show]);
    return <div data-testid="test-container" />;
  };
  const container = renderWithProviders(<TestContainer />);
  expect(container.getByTestId("test-container")).toBeInTheDocument();
  expect(screen.getAllByText("Unexpected Error")).toHaveLength(1);
  expect(
    screen.getAllByText(
      "System error. Please contact the system administrator."
    )
  ).toHaveLength(1);
});

test("useErrorAlert AxiosError", async () => {
  const TestContainer = (): ReactElement => {
    const { show } = useErrorAlert();
    useEffect(() => {
      show(
        new AxiosError("HTTP Error", "500", undefined, undefined, {
          data: undefined,
          status: 500,
          statusText: "Error Status Text",
        } as any),
        { iconType: "fail" }
      );
    }, [show]);
    return <div data-testid="test-container" />;
  };
  const container = renderWithProviders(<TestContainer />);
  expect(container.getByTestId("test-container")).toBeInTheDocument();
  expect(screen.getAllByText("Error Status Text")).toHaveLength(1);
  expect(container.getByTestId("MessageDialogBody")).toHaveTextContent(
    "HTTP Error"
  );
});
