import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Trans } from "react-i18next";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosNewIcon from "@mui/icons-material/ArrowForwardIos";
import cn from "classnames";

import { MessageKey } from "../../i18n/LocaleModel";

const getBoundedPage = (page: number, totalPages: number): number => {
  return Math.max(Math.min(page, totalPages - 1), 0);
};

interface ItemsPerPageDisplayProps {
  onItemsPerPageClick: (targetIndex: number) => void;
  focusIndex: number;
  itemsPerPageOptions: number[];
  itemsPerPage: number;
}

export const ItemsPerPageDisplay = (
  props: ItemsPerPageDisplayProps
): ReactElement => {
  const { onItemsPerPageClick, focusIndex, itemsPerPageOptions, itemsPerPage } =
    props;
  const itemCount = itemsPerPageOptions[focusIndex];
  return (
    <div
      className={cn("cursor-pointer", {
        "mr-2": focusIndex + 1 !== itemsPerPageOptions.length,
        "text-secondary-main": itemCount === itemsPerPage,
      })}
      key={`PAGE-${itemCount}-${focusIndex}`}
      onClick={() => onItemsPerPageClick(focusIndex)}
      data-testid="ItemsPerPageDisplayRoot"
    >
      {itemCount}
    </div>
  );
};

interface PaginationControlProps {
  onPageChange: (targetPage: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  page: number;
  totalPages: number;
  itemsPerPage?: number;
  itemsPerPageOptions?: number[];
  shouldShowItemsPerPage?: boolean;
  canPreviousPage: boolean;
  canNextPage: boolean;
  disabled?: boolean;
}

const PaginationControl = ({
  onPageChange,
  onItemsPerPageChange,
  page,
  totalPages,
  itemsPerPage = 0,
  itemsPerPageOptions,
  shouldShowItemsPerPage,
  canPreviousPage,
  canNextPage,
  disabled,
}: PaginationControlProps): ReactElement => {
  const _page = useMemo(() => {
    return getBoundedPage(page, totalPages);
  }, [page, totalPages]);
  const displayPage = useMemo(() => {
    return (_page + 1).toString();
  }, [_page]);
  const [inputPage, setInputPage] = useState(displayPage);
  useEffect(() => {
    setInputPage(displayPage);
  }, [displayPage]);

  const pageChange = useCallback(
    (targetPage: number) => {
      const goToPage = getBoundedPage(targetPage, totalPages);
      onPageChange(goToPage);
      setInputPage((goToPage + 1).toString());
    },
    [onPageChange, totalPages]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputPage(e.target.value);
    },
    []
  );

  const handleInputFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.select();
    },
    []
  );

  const handlePreviousPageClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();

      pageChange(page - 1);
    },
    [page, pageChange]
  );

  const handleNextPageClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();

      pageChange(page + 1);
    },
    [page, pageChange]
  );

  const handleGoToPageKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.stopPropagation();
      e.preventDefault();

      if (e.key === "Enter") {
        let targetPage = parseInt(inputPage, 10);
        if (isNaN(targetPage)) {
          targetPage = 1;
        }
        pageChange(targetPage - 1);
      }
    },
    [inputPage, pageChange]
  );

  const handleItemsPerPageClick = useCallback(
    (index: number) => {
      if (onItemsPerPageChange && itemsPerPageOptions) {
        onItemsPerPageChange(itemsPerPageOptions[index]);
        pageChange(0);
      }
    },
    [onItemsPerPageChange, pageChange, itemsPerPageOptions]
  );

  return (
    <div
      className={cn("text-sm text-metalicBlue-main", {
        "opacity-50 pointer-events-none": disabled,
      })}
      data-testid="PaginationControlRoot"
    >
      {shouldShowItemsPerPage ? (
        <div className="flex flex-row justify-end text-xs font-bold">
          <div className="mr-2">
            <Trans<MessageKey> i18nKey="Pagination.itemsPerPage" />
          </div>
          {itemsPerPageOptions?.map((itemCount, index) => (
            <ItemsPerPageDisplay
              key={`ITEMS-${itemCount}`}
              focusIndex={index}
              itemsPerPageOptions={itemsPerPageOptions}
              itemsPerPage={itemsPerPage}
              onItemsPerPageClick={handleItemsPerPageClick}
            />
          ))}
        </div>
      ) : null}
      <div className="mt-1 flex flex-row items-center justify-end">
        <button
          type="button"
          className="mr-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border border-solid border-gray-400 bg-white text-center hover:bg-gray-200 active:bg-white disabled:pointer-events-none disabled:hover:bg-inherit"
          onClick={handlePreviousPageClick}
          disabled={!canPreviousPage}
          data-testid="PreviousPageButton"
        >
          <ArrowBackIosNewIcon className="text-[0.5rem]" />
        </button>
        <div className="mr-2 flex h-6 w-10 items-center justify-center rounded-md border border-solid border-gray-400">
          <input
            type="text"
            onKeyUp={handleGoToPageKeyUp}
            value={inputPage}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="w-8 border-none text-center font-bold"
            data-testid="PageInput"
          />
        </div>
        <button
          type="button"
          className="mr-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border border-solid border-gray-400 bg-white text-center hover:bg-gray-200 active:bg-white disabled:pointer-events-none disabled:hover:bg-inherit"
          onClick={handleNextPageClick}
          disabled={!canNextPage}
          data-testid="NextPageButton"
        >
          <ArrowForwardIosNewIcon className="text-[0.5rem]" />
        </button>
        <div className="whitespace-nowrap text-gray-600">
          <Trans<MessageKey>
            i18nKey="Pagination.page"
            values={{ n: totalPages }}
          />
        </div>
      </div>
    </div>
  );
};

export default PaginationControl;
