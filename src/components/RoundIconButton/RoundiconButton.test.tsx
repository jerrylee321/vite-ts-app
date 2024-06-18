import "@testing-library/jest-dom";
import DeleteIcon from "@mui/icons-material/Delete";

import { renderWithProviders } from "../../utils/test/render";

import RoundIconButton from ".";

test("RoundIconButton Component", () => {
  const { container } = renderWithProviders(
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <RoundIconButton className="test-class-name" Icon={DeleteIcon} />
  );

  expect(container.getElementsByClassName("test-class-name").length).toBe(1);
  expect(container.getElementsByClassName("MuiSvgIcon-root").length).toBe(1);
});
