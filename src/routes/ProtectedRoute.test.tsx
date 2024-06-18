import useQueryUserAccountDetails from "../queries/useQueryUserAccountDetails";
import { renderWithProviders } from "../utils/test/render";

import ProtectedRoute from "./ProtectedRoute";

test("should render", () => {
  renderWithProviders(
    <ProtectedRoute useQueryUserAccountDetails={useQueryUserAccountDetails}>
      <p>Hello World</p>
    </ProtectedRoute>
  );
});
