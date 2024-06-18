export const allTransferCaseStatus = [
  "Saved",
  "Pending Virus Scan",
  "Scan complete",
  "Abandon",
  "Pending",
  "Rejected",
  "Processing",
  "Completed for payment",
] as const;
export type TransferCaseStatus = (typeof allTransferCaseStatus)[number];

export interface TransferCase {
  caseUuid: string;
  submissionDt: Date | null;
  transferType: string | null;
  refNo: string | null;
  orsoSchemeName: string | null;
  mpfSchemeName: string | null;
  trfEffectiveDt: Date | null;
  numMember: number | null;
  status: TransferCaseStatus;
  prepareName: string | null;
  supervisorName: string | null;
}
