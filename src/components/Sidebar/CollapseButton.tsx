import type { ReactElement } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface CollapseButtonProps {
  isCollapsed: boolean;
  onClick: () => void;
}

const CollapseButton = (props: CollapseButtonProps): ReactElement => {
  const { isCollapsed, onClick } = props;

  return (
    <button
      className="absolute top-4 -right-2 z-above-drawer flex h-5 w-5 cursor-pointer items-center justify-center rounded-[50%] border-0 bg-common-white shadow-collapse-button"
      type="button"
      onClick={onClick}
      data-testid="collapseButton"
    >
      {isCollapsed ? (
        <ChevronLeftIcon className="text-independence-main" />
      ) : (
        <ChevronRightIcon className="text-independence-main" />
      )}
    </button>
  );
};

export default CollapseButton;
