import "@testing-library/jest-dom";

import { renderWithProviders } from "../../utils/test/render";

import AuthDialog from "./";

test("should render dialog with custom body", async () => {
  const titleString = "custom title";
  const bodyString = "custom body";
  const onClose = jest.fn();
  renderWithProviders(
    <AuthDialog open={true} onClose={onClose} title={titleString}>
      {bodyString}
    </AuthDialog>
  );
});
