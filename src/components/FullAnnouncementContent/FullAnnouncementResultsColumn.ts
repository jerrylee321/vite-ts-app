import { Column } from "react-table";

import type { Announcement } from "../../models/announcement";

const AnnouncementField = [
  "recUuid",
  "titleEn",
  "publishDate",
  "announceRefId",
  "announceSys",
  "category",
  "version",
  "targetPage",
  "bodyEn",
  "titleZhhk",
  "bodyZhhk",
  "titleZhcn",
  "bodyZhcn",
  "seqNo",
  "recordUpdateUser",
  "recordUpdateTime",
];
export const AnnouncementTableColumns: Column<Announcement>[] =
  AnnouncementField.map(
    (field) => ({ accessor: field } as Column<Announcement>)
  );
