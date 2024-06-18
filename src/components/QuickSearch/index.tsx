import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "react-use";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import cn from "classnames";

import { quickSearchInputBase } from "./index.module.scss";

interface QuickSearchProps {
  setGlobalFilter: (value: string) => void;
  pageIndex: number;
  className?: string;
}

const QuickSearch = (props: QuickSearchProps): ReactElement => {
  const { setGlobalFilter, pageIndex, className } = props;
  const [value, setValue] = useState("");

  const { t } = useTranslation();
  const onChangeInputBase = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setValue(event.target.value);
    },
    []
  );

  const onClickClear = useCallback((): void => {
    setValue("");
  }, []);

  const [, _] = useDebounce(
    () => {
      setGlobalFilter(value);
    },
    300,
    [value]
  );

  useEffect(() => {
    setValue("");
  }, [pageIndex]);

  return (
    <div
      className={cn(
        className,
        "relative flex w-auto max-w-60 items-center justify-center rounded-full border border-solid border-gray-main bg-white text-primary-main px-1"
      )}
    >
      <div className="pointer-events-none flex h-full items-center justify-center px-2">
        <SearchIcon className="text-spanishGray-main" />
      </div>
      <InputBase
        placeholder="Quick Search"
        size="small"
        onChange={onChangeInputBase}
        className={cn(quickSearchInputBase, "text-spanishGray-main")}
        value={value}
        inputProps={{
          "aria-label": t("QuickSearch.action.input.label"),
          "data-testid": "input",
        }}
      />
      <ClearIcon
        onClick={onClickClear}
        aria-label={t("QuickSearch.action.clear.label")}
        data-testid="clearBtn"
        className="cursor-pointer py-0 px-1 text-spanishGray-main"
      />
    </div>
  );
};

export default QuickSearch;
