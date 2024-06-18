export interface Announcement {
  recUuid: string;
  announceRefId: string | null;
  announceSys: string | null;
  category: string | null;
  version: string | null;
  targetPage: string | null;
  titleEn?: string | null;
  bodyEn?: string | null;
  titleZhhk?: string | null;
  bodyZhhk?: string | null;
  titleZhcn?: string | null;
  bodyZhcn?: string | null;
  seqNo: number | null;
  publishDate: Date | null;
  recordUpdateUser: string | null;
  recordUpdateTime: Date | null;
}
