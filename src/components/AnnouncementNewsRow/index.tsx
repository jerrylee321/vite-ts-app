import { ReactElement } from "react";
import { Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import cn from "classnames";

import InfoBadgeText from "../../components/InfoBadgeText";
import { MessageKey } from "../../i18n/LocaleModel";
import { Announcement } from "../../models/announcement";
import FormattedDate from "../FormattedDate";

interface AnnouncementContentProps {
  announcement: Announcement;
  generatePath: (announcement: Announcement) => string;
  isHighlight?: boolean;
}

const AnnouncementNewsRow = ({
  announcement,
  generatePath,
  isHighlight,
}: AnnouncementContentProps): ReactElement => {
  const title = announcement.titleEn;

  return (
    <>
      <Link to={generatePath(announcement)} className="text-black no-underline">
        <div className="flex pt-2 text-metalicBlue-main">
          <div className="flex grow">
            <Typography
              variant="body2"
              className={cn("mr-2", {
                "font-bold": isHighlight,
              })}
              data-testid="HighlightTitle"
            >
              {title}
            </Typography>
            {isHighlight ? (
              <InfoBadgeText>
                <Trans<MessageKey> i18nKey="Announcement.newTag" />
              </InfoBadgeText>
            ) : null}
          </div>
          <div>
            <Typography variant="body2">
              <FormattedDate
                date={announcement.publishDate}
                dateFormat="dd/MM/yyyy"
                fallback="-"
              />
            </Typography>
          </div>
        </div>
      </Link>
    </>
  );
};

export default AnnouncementNewsRow;
