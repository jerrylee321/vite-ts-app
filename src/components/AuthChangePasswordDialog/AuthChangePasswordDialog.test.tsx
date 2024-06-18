import { renderWithProviders } from "../../utils/test/render";

import AuthChangePasswordDialog from "./";

describe("AuthChangePasswordDialog", () => {
  test("render", () => {
    const onClose = jest.fn();
    renderWithProviders(
      <AuthChangePasswordDialog onClose={onClose} open={true} />
    );
  });
});
