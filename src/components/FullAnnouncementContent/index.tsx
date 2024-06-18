import React, { ReactElement, useCallback, useEffect } from "react";
import { Trans } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import { Row, usePagination, useTable } from "react-table";
import { Paper, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import cn from "classnames";

import { itemsPerPageOptions } from "../../constants/table";
import { MessageKey } from "../../i18n/LocaleModel";
import type { Announcement } from "../../models/announcement";
import { fallback } from "../../types/Nullable";
import FormattedDate from "../FormattedDate";
import InfoBadgeText from "../InfoBadgeText";
import PaginationControl from "../PaginationControl";

import { AnnouncementTableColumns } from "./FullAnnouncementResultsColumn";

interface AnnouncementContentProps {
  announcements: Announcement[] | undefined;
  isLoading: boolean;
  generateDetailPath: (announcement: Announcement) => string;
  showBottomPagination: boolean;
}

interface AnnouncementRowProps {
  announcement: Row<Announcement>;
  isHighlight: boolean;
  generateDetailPath: (announcement: Announcement) => string;
}

export const AnnouncementTableRow = (
  props: AnnouncementRowProps
): ReactElement => {
  const { announcement, isHighlight, generateDetailPath } = props;
  const title = announcement.original.titleEn;

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Link
          to={generateDetailPath(announcement.original)}
          className={cn("no-underline flex text-metalicBlue-main", {
            "font-bold": isHighlight,
          })}
        >
          <div className="mr-2">{title}</div>
          <div className="flex">
            {isHighlight ? (
              <InfoBadgeText>
                <Trans<MessageKey> i18nKey="AnnouncementContent.new" />
              </InfoBadgeText>
            ) : null}
          </div>
        </Link>
      </TableCell>
      <TableCell>
        <FormattedDate
          date={announcement.original.publishDate}
          dateFormat="dd/MM/yyyy"
          fallback="-"
        />
      </TableCell>
    </TableRow>
  );
};

const FullAnnouncementsContent = (
  props: AnnouncementContentProps
): ReactElement => {
  const { announcements, isLoading, generateDetailPath, showBottomPagination } =
    props;
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
  });

  const {
    page,
    pageCount,
    gotoPage,
    setPageSize,
    canNextPage,
    canPreviousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: AnnouncementTableColumns,
      data: fallback(announcements, []),
      initialState: {
        pageIndex: 0,
        pageSize: 50,
      },
      autoResetFilters: false,
      autoResetPage: false,
    },
    usePagination
  );

  useEffect(() => {
    let targetPage = 1;
    const queryPage = searchParams.get("page");
    if (queryPage != null) {
      const _queryPage = parseInt(queryPage, 10);
      if (!isNaN(_queryPage)) {
        targetPage = _queryPage;
      }
    }
    gotoPage(targetPage - 1);
  }, [searchParams, gotoPage]);

  const onPageChange = useCallback(
    (newPage: number) => {
      if (pageIndex === newPage) {
        return;
      }

      setSearchParams({ page: (newPage + 1).toString() });
      gotoPage(newPage);
    },
    [pageIndex, gotoPage, setSearchParams]
  );

  const renderList = (displayList: Row<Announcement>[], pageNum: number) => {
    return (
      <TableContainer className="mb-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography className="text-xs font-bold text-metalicBlue-main">
                  <Trans<MessageKey> i18nKey="AnnouncementsFullList.tableHeader.topic" />
                </Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-xs font-bold text-metalicBlue-main">
                  <Trans<MessageKey> i18nKey="AnnouncementsFullList.tableHeader.date" />
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayList.map((news: Row<Announcement>, index: number) => (
              <AnnouncementTableRow
                announcement={news}
                key={`NEWS-${news.original.recUuid}`}
                // disable autofix for && operator
                // eslint-disable-next-line
                isHighlight={index === 0 && pageNum === 0}
                generateDetailPath={generateDetailPath}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Paper
      className="rounded-2xl p-6 shadow-md"
      elevation={0}
      data-testid="FullAnnouncementListTable"
    >
      <div className="mb-4 flex">
        <Typography
          variant="h5"
          className="flex grow items-end font-bold text-primary-main"
        >
          <Trans<MessageKey> i18nKey="AnnouncementsFullList.title" />
        </Typography>
        <div>
          <PaginationControl
            page={pageIndex}
            itemsPerPageOptions={itemsPerPageOptions}
            shouldShowItemsPerPage={true}
            onPageChange={onPageChange}
            itemsPerPage={pageSize}
            onItemsPerPageChange={setPageSize}
            totalPages={pageCount}
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
          />
        </div>
      </div>
      {!isLoading ? renderList(page, pageIndex) : null}
      {showBottomPagination ? (
        <div className="flex">
          <div className="mx-auto">
            <PaginationControl
              page={pageIndex}
              itemsPerPageOptions={itemsPerPageOptions}
              shouldShowItemsPerPage={false}
              onPageChange={onPageChange}
              itemsPerPage={pageSize}
              onItemsPerPageChange={setPageSize}
              totalPages={pageCount}
              canNextPage={canNextPage}
              canPreviousPage={canPreviousPage}
            />
          </div>
        </div>
      ) : null}
    </Paper>
  );
};

export default FullAnnouncementsContent;
