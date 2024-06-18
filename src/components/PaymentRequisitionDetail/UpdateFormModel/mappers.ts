import {
  IntraGroupTransferViewModel,
  MmbTransferViewModel,
  SchemeTransferViewModel,
} from "../PaymentRequisitionContents";

import {
  IntraGroupBenefitsDetailsRowModel,
  MmbBenefitsDetailsRowModel,
  SchemeBenefitsDetailsRowModel,
} from "./BenefitsDetailsRowSchema";

export const mapViewModelToSchemeOrIntraGroupBenefitsDetailsRows = (
  viewModel: SchemeTransferViewModel | IntraGroupTransferViewModel
): SchemeBenefitsDetailsRowModel[] | IntraGroupBenefitsDetailsRowModel[] => {
  return viewModel.memberList.map((member) => {
    return {
      transferType: viewModel.transferType,
      surnameZh: member.surnameZh,
      givenNameZh: member.givenNameZh,
      surnameEn: member.surnameEn,
      givenNameEn: member.givenNameEn,
      idType: member.idType,
      idNo: member.idNo,
      newMemberFlg: member.newMemberFlg,
      eeMmb: member.eeBenfMmb,
      eePreMpf: member.eeBenfPreMpf,
      eeOrso: member.eeBenfOrso,
      eePostMpf: member.eeBenfPostMpf,
      erMmb: member.erBenfMmb,
      erPreMpf: member.erBenfPreMpf,
      erOrso: member.erBenfOrso,
      erPostMpf: member.erBenfPostMpf,
    };
  });
};

export const mapViewModelToMmbBenefitsDetailsRows = (
  viewModel: MmbTransferViewModel
): MmbBenefitsDetailsRowModel[] => {
  return viewModel.memberList.map((member) => {
    return {
      transferType: viewModel.transferType,
      surnameZh: member.surnameZh,
      givenNameZh: member.givenNameZh,
      surnameEn: member.surnameEn,
      givenNameEn: member.givenNameEn,
      idType: member.idType,
      idNo: member.idNo,
      mmbAmount: member.mmbAmount,
    };
  });
};
