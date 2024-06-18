import { useSelector } from "react-redux";

import { RootState } from "../redux";
import { SelectedScheme } from "../redux/scheme";

const useSelectedScheme = (): SelectedScheme => {
  const selectedScheme = useSelector(
    (state: RootState) => state.scheme.selectedScheme
  );
  if (!selectedScheme) {
    throw new Error(
      "There is no selected scheme. Make sure your screen is included in a hierarchy that contains `<RequireSchemeRoute>`, which will make sure there is a selected scheme. In the case that scheme is optional, use `useSelector`."
    );
  }
  return selectedScheme;
};

export default useSelectedScheme;
