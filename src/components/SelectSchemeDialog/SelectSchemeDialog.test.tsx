import { renderWithProviders } from "../../utils/test/render";

import SelectSchemeDialog from "./";

describe("SelectSchemeDialog", () => {
  test("render", () => {
    const onClose = jest.fn();
    renderWithProviders(<SelectSchemeDialog onClose={onClose} open={true} />);
  });
});
