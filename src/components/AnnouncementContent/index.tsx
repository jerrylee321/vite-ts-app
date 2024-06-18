import React, { ReactElement } from "react";
import { Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { Button, Paper, Typography } from "@mui/material";
import cn from "classnames";

import { MessageKey } from "../../i18n/LocaleModel";
import type { Announcement } from "../../models/announcement";
import AnnouncementNewsRow from "../AnnouncementNewsRow";

interface AnnouncementContentProps {
  "data-testid"?: string;
  announcements: Announcement[];
  generateListPath: () => string;
  generateDetailPath: (announcement: Announcement) => string;
  isLoading: boolean;
}

const AnnouncementContent = (props: AnnouncementContentProps): ReactElement => {
  const {
    announcements,
    generateListPath,
    generateDetailPath,
    isLoading,
    "data-testid": dataTestId,
  } = props;

  const renderList = (list: Announcement[]) => {
    return (
      <>
        {list.map((news: Announcement, index: number) => (
          <AnnouncementNewsRow
            key={`NEWS-${news.recUuid}`}
            announcement={news}
            generatePath={generateDetailPath}
            isHighlight={index === 0}
          />
        ))}
      </>
    );
  };

  return (
    <Paper
      data-testid={dataTestId}
      className="rounded-2xl px-6 pt-6 pb-12 shadow-md"
      elevation={0}
    >
      <div className="flex items-center">
        <Typography
          variant="h5"
          className={cn("grow font-bold text-primary-main")}
        >
          <Trans<MessageKey> i18nKey="AnnouncementContent.title" />
        </Typography>
        <Link to={generateListPath()} className="no-underline">
          <Button
            className={cn(
              "h-6 min-w-20 rounded-full bg-primary-main p-1 text-xs font-bold uppercase text-primary-contrastText"
            )}
          >
            <Trans<MessageKey> i18nKey="AnnouncementContent.seeMore" />
          </Button>
        </Link>
      </div>
      {!isLoading && announcements.length > 0
        ? renderList(announcements)
        : null}
    </Paper>
  );
};

export default AnnouncementContent;
