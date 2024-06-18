import useSchemeTrusteeOptionsActual from "../useSchemeTrusteeOptions";

const useSchemeTrusteeOptions: typeof useSchemeTrusteeOptionsActual = () => {
  return {
    filteredTrusteeList: [
      {
        key: "trc1",
        name: "Trustee Name 1",
      },
      {
        key: "trc2",
        name: "Trustee Name 2",
      },
    ],
    filteredSchemeList: [
      {
        key: "sc1",
        name: "Scheme Name 1",
      },
      {
        key: "sc2",
        name: "Scheme Name 2",
      },
    ],
    schemeList: [
      {
        schemeCode: "sc1",
        schemeName: "Scheme Name 1",
        schemeRegNo: "MT00171",
        schemeUuid: "scUuid1",
        trusteeCode: "trc1",
        trusteeUuid: "trUuid1",
        trusteeName: "Trustee Name 1",
      },
      {
        schemeCode: "sc2",
        schemeName: "Scheme Name 2",
        schemeRegNo: "MT00171",
        schemeUuid: "scUuid2",
        trusteeCode: "trc2",
        trusteeUuid: "trUuid2",
        trusteeName: "Trustee Name 2",
      },
    ],
  };
};

export default jest.fn(useSchemeTrusteeOptions);
