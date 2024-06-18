import { MessageKey } from "../i18n/LocaleModel";

const allTransferType = ["MMB_SCHEME_TRAN", "MMB_INTRA_GROUP", "MMB"] as const;
export type TransferCaseTransferType = (typeof allTransferType)[number];

export const transferTypeMessageIdMap: Record<
  TransferCaseTransferType,
  MessageKey
> = {
  MMB_SCHEME_TRAN: "TransferCaseTransferType.schemeTransfer",
  MMB_INTRA_GROUP: "TransferCaseTransferType.intraGroupTransfer",
  MMB: "TransferCaseTransferType.mmbTransfer",
};
