export type TransferType = "MMB_SCHEME_TRAN" | "MMB_INTRA_GROUP" | "MMB";

export interface TrusteeAddress {
  country: string | null;
  city: string | null;
  room: string | null;
  floor: string | null;
  block: string | null;
  building: string | null;
  street: string | null;
  district: string | null;
  postCode: string | null;
}

export interface OrsoScheme {
  trusteeName: string | null;
  schemeName: string | null;
  registrationNumber: string | null;
  employerName: string | null;
  employerAccountNumber: string | null;
  trusteeAddress: TrusteeAddress | null;
  transferEffectiveDate: Date | null;
}

export interface MpfScheme {
  trusteeName: string | null;
  schemeName: string | null;
  employerName: string | null;
  employerAccountNumber: string | null;
  payrollGroupCode: string | null;
}

export interface UncleanReason {
  field: string;
  uncleanMsg: string;
}

export interface TransferCaseMember {
  rowId: number;
  orsoAcctNo: string | null;
  mpfAcctNo: string | null;
  // Following fields only exist for record with certain transfer type
  orsoJoinDt?: Date | null;
  existingErEmpDt?: Date | null;
  newErEmpDt?: Date | null;
  newMemberFlg?: boolean | null;
  // Fields above only exist for record with certain transfer type
  lastName: string | null;
  firstName: string | null;
  lastNameCn: string | null;
  firstNameCn: string | null;
  idType: string | null;
  idNo: string | null;
  uncleanFlg?: string | null;
  errorFields: string[];
  uncleanReason: UncleanReason[];
}
