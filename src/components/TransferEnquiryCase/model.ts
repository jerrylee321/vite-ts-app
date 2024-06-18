export interface TransferEnquiryCase {
  caseUuid: string;
  submissionDt: Date | null;
  transferType: string | null;
  refNo: string | null;
  orsoSchemeName: string | null;
  mpfSchemeName: string | null;
  effDt: Date | null;
  numMember: number;
}

export interface TransferEnquiryTransferTypeOption {
  labelCode: string;
  labelEn: string;
}
