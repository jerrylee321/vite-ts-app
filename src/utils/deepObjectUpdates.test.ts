import deepObjectUpdates, { flattenUpdatesByKey } from "./deepObjectUpdates";

interface DummyAddressType {
  block: string | null;
  building: string | null;
  city: string | null;
  clientAddrUuid: string | null;
  country: string | null;
  district: string | null;
  floor: string | null;
  postal: string | null;
  room: string | null;
  street: string | null;
  version: string | null;
  flag: string | null;
}

interface DummyFundType {
  fundCode: string | null;
  fundDescriptor: string | null;
  fundName: string | null;
  fundNameZHCN: string | null;
  fundNameZHHK: string | null;
  fundUuid: string | null;
  riskCLass: string | null;
  riskClassCode: string | null;
}

interface DummyInfoType {
  trustee: Partial<{
    email: string | null;
    faxUuid: string | null;
    faxCountryCode: string | null;
    faxNo: {
      countryCode: string | null;
      number: string | null;
    } | null;
    phoneUuid: string | null;
    phoneNo: string | null;
    trusteeAddr: Partial<DummyAddressType> | null;
    trusteeAddrZHCN: Partial<DummyAddressType> | null;
    trusteeAddrZHHK: Partial<DummyAddressType> | null;
    trusteeCode: string | null;
    trusteeName: string | null;
    trusteeNameZHCN: string | null;
    trusteeNameZHHK: string | null;
    trusteeUuid: string | null;
    website: string | null;
  }>;
  scheme: {
    schemeId: string | null;
    schemeName: string | null;
    schemeNameZHCN: string | null;
    schemeNameZHHK: string | null;
  };
  funds: Partial<DummyFundType>[];
}

const oldTrusteeInfo: DummyInfoType = {
  trustee: {
    email: "empf@example.com",
    faxUuid: null,
    faxNo: null,
    phoneUuid: null,
    phoneNo: null,
    trusteeAddr: {
      block: "10",
      building: "DEF Building",
      city: "HK",
      clientAddrUuid: "e3e83d7e-7e86-03fa-e053-0b15d70ac80d",
      country: "CN",
      district: "Kowloon",
      floor: "7",
      postal: "000",
      room: "710",
      street: "1 DEF Road",
      version: "1",
      flag: null,
    },
    trusteeAddrZHCN: {
      block: "10",
      building: "DEF Building",
      city: "HK",
      clientAddrUuid: "e3e83d7e-7e86-03fa-e053-0b15d70ac80d",
      country: "CN",
      district: "Kowloon",
      floor: "7",
      postal: "000",
      room: "710",
      street: "1 DEF Road",
      version: "1",
      flag: null,
    },
    trusteeAddrZHHK: null,
    trusteeCode: "AIA",
    trusteeName: "AIA Company (Trustee) Limited",
    trusteeNameZHCN: "友邦保险（信托）有限公司",
    trusteeNameZHHK: "友邦保險（信托）有限公司",
    trusteeUuid: "e3e83d7e-7e86-03fa-e053-0b15d70ac80d",
    website: "https://www.aia.com.hk//",
  },
  scheme: {
    schemeId: "e3e9a72e-09da-33f7-e053-0b15d70a5be2",
    schemeName: "AIA MPF - Prime Value Choice",
    schemeNameZHCN: "AMTD 强积金计划",
    schemeNameZHHK: "友邦強積金優選計劃",
  },
  funds: [
    {
      fundCode: "AIA-ADF",
      fundDescriptor: "Class A",
      fundName: "AIA Asia Equity Fund",
      fundNameZHCN: "AIA Asia Equity Fund",
      fundNameZHHK: "AIA Asia Equity Fund (ZHHK)",
      fundUuid: "e3e9a72e-09da-33f7-e053-0b15d70a5be2",
      riskCLass: "Risk Class 4",
      riskClassCode: "RISK_CLASS_4",
    },
    {
      fundCode: "VC_LE_W602",
      fundDescriptor: "n.a.",
      fundName: "World Fund-  by Years",
      fundNameZHCN: "World Fund-  by Years",
      fundNameZHHK: "World Fund-  by Years",
      fundUuid: "e9dee938-b815-8670-e053-0b15d70a7219",
      riskCLass: "Risk Class 6",
      riskClassCode: "RISK_CLASS_6",
    },
    {
      fundCode: "VC_LE604",
      fundDescriptor: "n.a.",
      fundName: "LifeEasy",
      fundNameZHCN: "LifeEasy",
      fundNameZHHK: "LifeEasy",
      fundUuid: "4bd28439-a79c-410c-b7e2-fea0af942027",
      riskCLass: "Risk Class 6",
      riskClassCode: "RISK_CLASS_6",
    },
    {
      fundCode: "VC_LE_G600",
      fundDescriptor: "n.a.",
      fundName: "Global Bond Fund- by Years",
      fundNameZHCN: "Global Bond Fund- by Years",
      fundNameZHHK: "Global Bond Fund- by Years",
      fundUuid: "e9dee938-b849-8670-e053-0b15d70a7219",
      riskCLass: "Risk Class 4",
      riskClassCode: "RISK_CLASS_4",
    },
    {
      fundCode: "VC_DIS_580",
      fundDescriptor: "n.a.",
      fundName: "Age 65 Plus Fund",
      fundNameZHCN: "Age 65 Plus Fund",
      fundNameZHHK: "Age 65 Plus Fund",
      fundUuid: "e9dee938-b83f-8670-e053-0b15d70a7219",
      riskCLass: "Risk Class 3",
      riskClassCode: "RISK_CLASS_3",
    },
    {
      fundCode: "VC_LE603",
      fundDescriptor: "n.a.",
      fundName: "LifeEasy-  by Years",
      fundNameZHCN: "LifeEasy-  by Years",
      fundNameZHHK: "LifeEasy-  by Years",
      fundUuid: "e9dee938-b85e-8670-e053-0b15d70a7219",
      riskCLass: "Risk Class 6",
      riskClassCode: "RISK_CLASS_6",
    },
    {
      fundCode: "VC_LE_G601",
      fundDescriptor: "n.a.",
      fundName: "Guaranteed Portfolio-  by Years",
      fundNameZHCN: "Guaranteed Portfolio-  by Years",
      fundNameZHHK: "Guaranteed Portfolio-  by Years",
      fundUuid: "e9dee938-b863-8670-e053-0b15d70a7219",
      riskCLass: "Risk Class 1",
      riskClassCode: "RISK_CLASS_1",
    },
    {
      fundCode: "VC_DIS_581",
      fundDescriptor: "n.a.",
      fundName: "Core Accumulation Fund",
      fundNameZHCN: "Core Accumulation Fund",
      fundNameZHHK: "Core Accumulation Fund",
      fundUuid: "e9dee938-b869-8670-e053-0b15d70a7219",
      riskCLass: "Risk Class 5",
      riskClassCode: "RISK_CLASS_5",
    },
    {
      fundCode: "VC_DIS582",
      fundDescriptor: "n.a.",
      fundName: "Default Investment Strategy",
      fundNameZHCN: "Default Investment Strategy",
      fundNameZHHK: "Default Investment Strategy",
      fundUuid: "e9dee938-b86c-8670-e053-0b15d70a7219",
      riskCLass: "n.a.",
      riskClassCode: "RISK_CLASS_NA",
    },
    {
      fundCode: "VC_AGE61",
      fundDescriptor: "n.a.",
      fundName: "Age 65 Plus Fund",
      fundNameZHCN: "Age 65 Plus Fund",
      fundNameZHHK: "Age 65 Plus Fund",
      fundUuid: "e90c2eaf-36b1-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 3",
      riskClassCode: "RISK_CLASS_3",
    },
    {
      fundCode: "VC_AF2",
      fundDescriptor: "n.a.",
      fundName: "American Fund",
      fundNameZHCN: "American Fund",
      fundNameZHHK: "American Fund",
      fundUuid: "e90c2eaf-36b2-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 6",
      riskClassCode: "RISK_CLASS_6",
    },
    {
      fundCode: "VC_ABF3",
      fundDescriptor: "n.a.",
      fundName: "Asian Bond Fund",
      fundNameZHCN: "Asian Bond Fund",
      fundNameZHHK: "Asian Bond Fund",
      fundUuid: "e90c2eaf-36b3-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 3",
      riskClassCode: "RISK_CLASS_3",
    },
    {
      fundCode: "VC_AEF4",
      fundDescriptor: "n.a.",
      fundName: "Asian Equity Fund",
      fundNameZHCN: "Asian Equity Fund",
      fundNameZHHK: "Asian Equity Fund",
      fundUuid: "e90c2eaf-36b4-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 6",
      riskClassCode: "RISK_CLASS_6",
    },
    {
      fundCode: "VC_CSP6",
      fundDescriptor: "n.a.",
      fundName: "Capital Stable Portfolio",
      fundNameZHCN: "Capital Stable Portfolio",
      fundNameZHHK: "Capital Stable Portfolio",
      fundUuid: "e90c2eaf-36b6-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 4",
      riskClassCode: "RISK_CLASS_4",
    },
    {
      fundCode: "VC_CHKD7",
      fundDescriptor: "n.a.",
      fundName: "China HK Dynamic Asset Allocation Fund",
      fundNameZHCN: "China HK Dynamic Asset Allocation Fund",
      fundNameZHHK: "China HK Dynamic Asset Allocation Fund",
      fundUuid: "e90c2eaf-36b7-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 5",
      riskClassCode: "RISK_CLASS_5",
    },
    {
      fundCode: "VC_CAF8",
      fundDescriptor: "n.a.",
      fundName: "Core Accumulation Fund",
      fundNameZHCN: "Core Accumulation Fund",
      fundNameZHHK: "Core Accumulation Fund",
      fundUuid: "e90c2eaf-36b8-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 5",
      riskClassCode: "RISK_CLASS_5",
    },
    {
      fundCode: "VC_EF9",
      fundDescriptor: "n.a.",
      fundName: "Eurasia Fund",
      fundNameZHCN: "Eurasia Fund",
      fundNameZHHK: "Eurasia Fund",
      fundUuid: "e90c2eaf-36b9-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 6",
      riskClassCode: "RISK_CLASS_6",
    },
    {
      fundCode: "VC_EEF10",
      fundDescriptor: "n.a.",
      fundName: "European Equity Fund",
      fundNameZHCN: "European Equity Fund",
      fundNameZHHK: "European Equity Fund",
      fundUuid: "e90c2eaf-36ba-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 6",
      riskClassCode: "RISK_CLASS_6",
    },
    {
      fundCode: "VC_FCSF11",
      fundDescriptor: "n.a.",
      fundName: "Fidelity Capital Stable Fund",
      fundNameZHCN: "Fidelity Capital Stable Fund",
      fundNameZHHK: "Fidelity Capital Stable Fund",
      fundUuid: "e90c2eaf-36bb-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 4",
      riskClassCode: "RISK_CLASS_4",
    },
    {
      fundCode: "VC_FGF12",
      fundDescriptor: "n.a.",
      fundName: "Fidelity Growth Fund",
      fundNameZHCN: "Fidelity Growth Fund",
      fundNameZHHK: "Fidelity Growth Fund",
      fundUuid: "e90c2eaf-36bc-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 5",
      riskClassCode: "RISK_CLASS_5",
    },
    {
      fundCode: "VC_FSGF13",
      fundDescriptor: "n.a.",
      fundName: "Fidelity Stable Growth Fund",
      fundNameZHCN: "Fidelity Stable Growth Fund",
      fundNameZHHK: "Fidelity Stable Growth Fund",
      fundUuid: "e90c2eaf-36bd-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 4",
      riskClassCode: "RISK_CLASS_4",
    },
    {
      fundCode: "VC_GBF14",
      fundDescriptor: "n.a.",
      fundName: "Global Bond Fund",
      fundNameZHCN: "Global Bond Fund",
      fundNameZHHK: "Global Bond Fund",
      fundUuid: "e90c2eaf-36be-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 4",
      riskClassCode: "RISK_CLASS_4",
    },
    {
      fundCode: "VC_GCEF15",
      fundDescriptor: "n.a.",
      fundName: "Greater China Equity Fund",
      fundNameZHCN: "Greater China Equity Fund",
      fundNameZHHK: "Greater China Equity Fund",
      fundUuid: "e90c2eaf-36bf-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 6",
      riskClassCode: "RISK_CLASS_6",
    },
    {
      fundCode: "VC_GF16",
      fundDescriptor: "n.a.",
      fundName: "Green Fund",
      fundNameZHCN: "Green Fund",
      fundNameZHHK: "Green Fund",
      fundUuid: "e90c2eaf-36c0-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 6",
      riskClassCode: "RISK_CLASS_6",
    },
    {
      fundCode: "VC_GP17",
      fundDescriptor: "n.a.",
      fundName: "Growth Portfolio",
      fundNameZHCN: "Growth Portfolio",
      fundNameZHHK: "Growth Portfolio",
      fundUuid: "e90c2eaf-36c1-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 5",
      riskClassCode: "RISK_CLASS_5",
    },
    {
      fundCode: "VC_GUAR18",
      fundDescriptor: "n.a.",
      fundName: "Guaranteed Portfolio",
      fundNameZHCN: "Guaranteed Portfolio",
      fundNameZHHK: "Guaranteed Portfolio",
      fundUuid: "e90c2eaf-36c2-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 1",
      riskClassCode: "RISK_CLASS_1",
    },
    {
      fundCode: "VC_HKCF19",
      fundDescriptor: "n.a.",
      fundName: "Hong Kong and China Fund",
      fundNameZHCN: "Hong Kong and China Fund",
      fundNameZHHK: "Hong Kong and China Fund",
      fundUuid: "e90c2eaf-36c3-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 6",
      riskClassCode: "RISK_CLASS_6",
    },
    {
      fundCode: "VC_MCF20",
      fundDescriptor: "n.a.",
      fundName: "Managers Choice Fund",
      fundNameZHCN: "Managers Choice Fund",
      fundNameZHHK: "Managers Choice Fund",
      fundUuid: "e90c2eaf-36c4-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 5",
      riskClassCode: "RISK_CLASS_5",
    },
    {
      fundCode: "VC_NAEF22",
      fundDescriptor: "n.a.",
      fundName: "North American Equity Fund",
      fundNameZHCN: "North American Equity Fund",
      fundNameZHHK: "North American Equity Fund",
      fundUuid: "e90c2eaf-36c6-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 6",
      riskClassCode: "RISK_CLASS_6",
    },
    {
      fundCode: "VC_WF23",
      fundDescriptor: "n.a.",
      fundName: "World Fund",
      fundNameZHCN: "World Fund",
      fundNameZHHK: "World Fund",
      fundUuid: "e90c2eaf-36c7-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 6",
      riskClassCode: "RISK_CLASS_6",
    },
  ],
};
const newTrusteeInfo: DummyInfoType = {
  trustee: {
    email: "empf@example.com updated",
    faxUuid: null,
    faxNo: {
      countryCode: "852",
      number: "22222222",
    },
    phoneUuid: "phone updated",
    phoneNo: null,
    trusteeAddr: {
      block: "10",
      city: null,
      clientAddrUuid: "e3e83d7e-7e86-03fa-e053-0b15d70ac80d",
      country: "CN",
      district: "Kowloon updated",
      floor: "7",
      postal: "000",
      room: "710",
      street: "1 DEF Road",
      version: "1",
      flag: null,
    },
    trusteeAddrZHHK: null,
    trusteeCode: "AIA",
    trusteeName: "AIA Company (Trustee) Limited",
    trusteeNameZHCN: "友邦保险（信托）有限公司 updated",
    trusteeNameZHHK: "友邦保險（信托）有限公司 updated",
    trusteeUuid: "e3e83d7e-7e86-03fa-e053-0b15d70ac80d",
    website: "https://www.aia.com.hk//",
  },
  scheme: {
    schemeId: "e3e9a72e-09da-33f7-e053-0b15d70a5be2",
    schemeName: "AIA MPF - Prime Value Choice updated",
    schemeNameZHCN: "AMTD 强积金计划",
    schemeNameZHHK: "友邦強積金優選計劃 updated",
  },
  funds: [
    {
      fundCode: "AIA-ADF",
      fundDescriptor: "Class A",
      fundName: "AIA Asia Equity Fund",
      fundNameZHCN: "AIA Asia Equity Fund",
      fundNameZHHK: "AIA Asia Equity Fund (ZHHK)",
      fundUuid: "e3e9a72e-09da-33f7-e053-0b15d70a5be2",
      riskCLass: "Risk Class 4",
      riskClassCode: "RISK_CLASS_4",
    },
    {
      fundCode: "VC_LE_W602",
      fundDescriptor: "n.a.",
      fundName: "World Fund-  by Years",
      fundNameZHCN: "World Fund-  by Years",
      fundNameZHHK: "World Fund-  by Years",
      fundUuid: "e9dee938-b815-8670-e053-0b15d70a7219",
      riskCLass: "Risk Class 6",
      riskClassCode: "RISK_CLASS_6",
    },
    {
      fundCode: "VC_LE604",
      fundDescriptor: "n.a.",
      fundName: "LifeEasy",
      fundNameZHCN: "LifeEasy",
      fundNameZHHK: "LifeEasy",
      fundUuid: "4bd28439-a79c-410c-b7e2-fea0af942027",
      riskCLass: "Risk Class 6",
      riskClassCode: "RISK_CLASS_6",
    },
    {
      fundCode: "VC_LE_G600",
      fundDescriptor: "n.a.",
      fundName: "Global Bond Fund- by Years",
      fundNameZHCN: "Global Bond Fund- by Years",
      fundNameZHHK: "Global Bond Fund- by Years",
      fundUuid: "e9dee938-b849-8670-e053-0b15d70a7219",
      riskCLass: "Risk Class 4",
      riskClassCode: "RISK_CLASS_4",
    },
    {
      fundCode: "VC_DIS_580",
      fundDescriptor: "n.a.",
      fundName: "Age 65 Plus Fund",
      fundNameZHCN: "Age 65 Plus Fund",
      fundNameZHHK: "Age 65 Plus Fund",
      fundUuid: "e9dee938-b83f-8670-e053-0b15d70a7219",
      riskCLass: "Risk Class 3",
      riskClassCode: "RISK_CLASS_3",
    },
    {
      fundCode: "VC_LE603",
      fundDescriptor: "n.a.",
      fundName: "LifeEasy-  by Years",
      fundNameZHCN: "LifeEasy-  by Years",
      fundNameZHHK: "LifeEasy-  by Years",
      fundUuid: "e9dee938-b85e-8670-e053-0b15d70a7219",
      riskCLass: "Risk Class 6",
      riskClassCode: "RISK_CLASS_6",
    },
    {
      fundCode: "VC_LE_G601",
      fundDescriptor: "n.a.",
      fundName: "Guaranteed Portfolio-  by Years",
      fundNameZHCN: "Guaranteed Portfolio-  by Years",
      fundNameZHHK: "Guaranteed Portfolio-  by Years",
      fundUuid: "e9dee938-b863-8670-e053-0b15d70a7219",
      riskCLass: "Risk Class 1",
      riskClassCode: "RISK_CLASS_1",
    },
    {
      fundCode: "VC_DIS_581",
      fundDescriptor: "n.a.",
      fundName: "Core Accumulation Fund",
      fundNameZHCN: "Core Accumulation Fund",
      fundNameZHHK: "Core Accumulation Fund",
      fundUuid: "e9dee938-b869-8670-e053-0b15d70a7219",
      riskCLass: "Risk Class 5",
      riskClassCode: "RISK_CLASS_5",
    },
    {
      fundCode: "VC_DIS582",
      fundDescriptor: "n.a.",
      fundName: "Default Investment Strategy",
      fundNameZHCN: "Default Investment Strategy",
      fundNameZHHK: "Default Investment Strategy",
      fundUuid: "e9dee938-b86c-8670-e053-0b15d70a7219",
      riskCLass: "n.a.",
      riskClassCode: "RISK_CLASS_NA",
    },
    {
      fundCode: "VC_AGE61",
      fundDescriptor: "n.a.",
      fundName: "Age 65 Plus Fund",
      fundNameZHCN: "Age 65 Plus Fund",
      fundNameZHHK: "Age 65 Plus Fund",
      fundUuid: "e90c2eaf-36b1-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 3",
      riskClassCode: "RISK_CLASS_3",
    },
    {
      fundCode: "VC_AF2",
      fundDescriptor: "n.a.",
      fundName: "American Fund",
      fundNameZHCN: "American Fund",
      fundNameZHHK: "American Fund",
      fundUuid: "e90c2eaf-36b2-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 6",
      riskClassCode: "RISK_CLASS_6",
    },
    {
      fundCode: "VC_ABF3",
      fundDescriptor: "n.a.",
      fundName: "Asian Bond Fund",
      fundNameZHCN: "Asian Bond Fund",
      fundNameZHHK: "Asian Bond Fund",
      fundUuid: "e90c2eaf-36b3-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 3",
      riskClassCode: "RISK_CLASS_3",
    },
    {
      fundCode: "VC_AEF4",
      fundDescriptor: "n.a.",
      fundName: "Asian Equity Fund",
      fundNameZHCN: "Asian Equity Fund",
      fundNameZHHK: "Asian Equity Fund",
      fundUuid: "e90c2eaf-36b4-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 6",
      riskClassCode: "RISK_CLASS_6",
    },
    {
      fundCode: "VC_CSP6",
      fundDescriptor: "n.a.",
      fundName: "Capital Stable Portfolio",
      fundNameZHCN: "Capital Stable Portfolio",
      fundNameZHHK: "Capital Stable Portfolio",
      fundUuid: "e90c2eaf-36b6-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 4",
      riskClassCode: "RISK_CLASS_4",
    },
    {
      fundCode: "VC_CHKD7",
      fundDescriptor: "n.a.",
      fundName: "China HK Dynamic Asset Allocation Fund",
      fundNameZHCN: "China HK Dynamic Asset Allocation Fund",
      fundNameZHHK: "China HK Dynamic Asset Allocation Fund",
      fundUuid: "e90c2eaf-36b7-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 5",
      riskClassCode: "RISK_CLASS_5",
    },
    {
      fundCode: "VC_CAF8",
      fundDescriptor: "n.a.",
      fundName: "Core Accumulation Fund",
      fundNameZHCN: "Core Accumulation Fund",
      fundNameZHHK: "Core Accumulation Fund",
      fundUuid: "e90c2eaf-36b8-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 5",
      riskClassCode: "RISK_CLASS_5",
    },
    {
      fundCode: "VC_EF9",
      fundDescriptor: "n.a.",
      fundName: "Eurasia Fund",
      fundNameZHCN: "Eurasia Fund",
      fundNameZHHK: "Eurasia Fund",
      fundUuid: "e90c2eaf-36b9-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 6",
      riskClassCode: "RISK_CLASS_6",
    },
    {
      fundCode: "VC_EEF10",
      fundDescriptor: "n.a.",
      fundName: "European Equity Fund",
      fundNameZHCN: "European Equity Fund",
      fundNameZHHK: "European Equity Fund",
      fundUuid: "e90c2eaf-36ba-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 6",
      riskClassCode: "RISK_CLASS_6",
    },
    {
      fundCode: "VC_FCSF11",
      fundDescriptor: "n.a.",
      fundName: "Fidelity Capital Stable Fund",
      fundNameZHCN: "Fidelity Capital Stable Fund",
      fundNameZHHK: "Fidelity Capital Stable Fund",
      fundUuid: "e90c2eaf-36bb-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 4",
      riskClassCode: "RISK_CLASS_4",
    },
    {
      fundCode: "VC_FGF12",
      fundDescriptor: "n.a.",
      fundName: "Fidelity Growth Fund",
      fundNameZHCN: "Fidelity Growth Fund",
      fundNameZHHK: "Fidelity Growth Fund",
      fundUuid: "e90c2eaf-36bc-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 5",
      riskClassCode: "RISK_CLASS_5",
    },
    {
      fundCode: "VC_FSGF13",
      fundDescriptor: "n.a.",
      fundName: "Fidelity Stable Growth Fund",
      fundNameZHCN: "Fidelity Stable Growth Fund",
      fundNameZHHK: "Fidelity Stable Growth Fund",
      fundUuid: "e90c2eaf-36bd-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 4",
      riskClassCode: "RISK_CLASS_4",
    },
    {
      fundCode: "VC_GBF14",
      fundDescriptor: "n.a.",
      fundName: "Global Bond Fund",
      fundNameZHCN: "Global Bond Fund",
      fundNameZHHK: "Global Bond Fund",
      fundUuid: "e90c2eaf-36be-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 4",
      riskClassCode: "RISK_CLASS_4",
    },
    {
      fundCode: "VC_GCEF15",
      fundDescriptor: "n.a.",
      fundName: "Greater China Equity Fund",
      fundNameZHCN: "Greater China Equity Fund",
      fundNameZHHK: "Greater China Equity Fund",
      fundUuid: "e90c2eaf-36bf-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 6",
      riskClassCode: "RISK_CLASS_6",
    },
    {
      fundCode: "VC_GF16",
      fundDescriptor: "n.a.",
      fundName: "Green Fund",
      fundNameZHCN: "Green Fund",
      fundNameZHHK: "Green Fund",
      fundUuid: "e90c2eaf-36c0-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 6",
      riskClassCode: "RISK_CLASS_6",
    },
    {
      fundCode: "VC_GP17",
      fundDescriptor: "n.a.",
      fundName: "Growth Portfolio",
      fundNameZHCN: "Growth Portfolio",
      fundNameZHHK: "Growth Portfolio",
      fundUuid: "e90c2eaf-36c1-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 5",
      riskClassCode: "RISK_CLASS_5",
    },
    {
      fundCode: "VC_GUAR18",
      fundDescriptor: "n.a.",
      fundName: "Guaranteed Portfolio",
      fundNameZHCN: "Guaranteed Portfolio",
      fundNameZHHK: "Guaranteed Portfolio",
      fundUuid: "e90c2eaf-36c2-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 1",
      riskClassCode: "RISK_CLASS_1",
    },
    {
      fundCode: "VC_HKCF19",
      fundDescriptor: "n.a.",
      fundName: "Hong Kong and China Fund",
      fundNameZHCN: "Hong Kong and China Fund",
      fundNameZHHK: "Hong Kong and China Fund",
      fundUuid: "e90c2eaf-36c3-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 6",
      riskClassCode: "RISK_CLASS_6",
    },
    {
      fundCode: "VC_MCF20",
      fundDescriptor: "n.a.",
      fundName: "Managers Choice Fund",
      fundNameZHCN: "Managers Choice Fund",
      fundNameZHHK: "Managers Choice Fund",
      fundUuid: "e90c2eaf-36c4-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 5",
      riskClassCode: "RISK_CLASS_5",
    },
    {
      fundCode: "VC_NAEF22",
      fundDescriptor: "n.a.",
      fundName: "North American Equity Fund updated",
      fundNameZHCN: "North American Equity Fund",
      fundNameZHHK: "North American Equity Fund",
      fundUuid: "e90c2eaf-36c6-561d-e053-0b15d70ae060",
      riskCLass: "Risk Class 6",
      riskClassCode: "RISK_CLASS_6",
    },
    {},
  ],
};

it("should able to get all field update between two objects", () => {
  const changes = deepObjectUpdates(oldTrusteeInfo, newTrusteeInfo);

  expect(changes!.trustee.email.originalValue).toBe(
    oldTrusteeInfo.trustee.email
  );
  expect(changes!.trustee.email.newValue).toBe(newTrusteeInfo.trustee.email);

  expect(changes!.trustee.phoneUuid.originalValue).toBe(
    oldTrusteeInfo.trustee.phoneUuid
  );
  expect(changes!.trustee.phoneUuid.newValue).toBe(
    newTrusteeInfo.trustee.phoneUuid
  );

  expect(changes!.trustee.trusteeNameZHCN.originalValue).toBe(
    oldTrusteeInfo.trustee.trusteeNameZHCN
  );
  expect(changes!.trustee.trusteeNameZHCN.newValue).toBe(
    newTrusteeInfo.trustee.trusteeNameZHCN
  );

  expect(changes!.trustee.trusteeNameZHHK.originalValue).toBe(
    oldTrusteeInfo.trustee.trusteeNameZHHK
  );
  expect(changes!.trustee.trusteeNameZHHK.newValue).toBe(
    newTrusteeInfo.trustee.trusteeNameZHHK
  );

  expect(changes!.trustee.trusteeAddr.building.originalValue).toBe(
    oldTrusteeInfo.trustee.trusteeAddr!.building
  );
  expect(changes!.trustee.trusteeAddr.building.newValue).toBe(null);

  expect(changes!.trustee.trusteeAddr.city.originalValue).toBe(
    oldTrusteeInfo.trustee.trusteeAddr!.city
  );
  expect(changes!.trustee.trusteeAddr.city.newValue).toBe(null);

  expect(changes!.trustee.trusteeAddr.district.originalValue).toBe(
    oldTrusteeInfo.trustee.trusteeAddr!.district
  );
  expect(changes!.trustee.trusteeAddr.district.newValue).toBe(
    newTrusteeInfo.trustee.trusteeAddr!.district
  );

  expect(changes!.scheme.schemeName.originalValue).toBe(
    oldTrusteeInfo.scheme.schemeName
  );
  expect(changes!.scheme.schemeName.newValue).toBe(
    newTrusteeInfo.scheme.schemeName
  );

  expect(changes!.scheme.schemeNameZHHK.originalValue).toBe(
    oldTrusteeInfo.scheme.schemeNameZHHK
  );
  expect(changes!.scheme.schemeNameZHHK.newValue).toBe(
    newTrusteeInfo.scheme.schemeNameZHHK
  );

  expect(changes!.funds["28"].fundName.originalValue).toBe(
    oldTrusteeInfo.funds[28].fundName
  );
  expect(changes!.funds["28"].fundName.newValue).toBe(
    newTrusteeInfo.funds[28].fundName
  );

  expect(Object.keys(changes!.funds["29"]).length).toBe(
    Object.keys(oldTrusteeInfo.funds[29]).length
  );
  expect(changes!.funds["29"].fundCode.originalValue).toBe(
    oldTrusteeInfo.funds[29].fundCode
  );
  expect(changes!.funds["29"].fundCode.newValue).toBe(null);

  expect(Object.keys(changes!.trustee.trusteeAddrZHCN).length).toBe(
    // flag: null, in old count as no update when delete in new
    Object.keys(oldTrusteeInfo.trustee.trusteeAddrZHCN!).length - 1
  );
  expect(changes!.trustee.trusteeAddrZHCN.block.originalValue).toBe(
    oldTrusteeInfo.trustee.trusteeAddrZHCN!.block
  );
  expect(changes!.trustee.trusteeAddrZHCN.block.newValue).toBe(null);

  expect(Object.keys(changes!.trustee.faxNo).length).toBe(
    Object.keys(newTrusteeInfo.trustee.faxNo!).length
  );
  expect(changes!.trustee.faxNo.countryCode.originalValue).toBe(null);
  expect(changes!.trustee.faxNo.countryCode.newValue).toBe(
    newTrusteeInfo.trustee.faxNo!.countryCode
  );
});

it("should be able to flatten changes object", async () => {
  const changes = deepObjectUpdates(oldTrusteeInfo, newTrusteeInfo);
  const flattenedChanges = flattenUpdatesByKey(changes);
  const updateKeys = flattenedChanges.map((change) => change.propertyName);

  expect(updateKeys.includes("trustee.email")).toBeTruthy();
  expect(updateKeys.includes("trustee.faxNo.countryCode")).toBeTruthy();
  expect(updateKeys.includes("trustee.faxNo.number")).toBeTruthy();
  expect(updateKeys.includes("trustee.phoneUuid")).toBeTruthy();
  expect(updateKeys.includes("trustee.trusteeAddr.building")).toBeTruthy();
  expect(updateKeys.includes("trustee.trusteeAddr.city")).toBeTruthy();
  expect(updateKeys.includes("trustee.trusteeAddrZHCN.block")).toBeTruthy();
  expect(updateKeys.includes("trustee.trusteeNameZHCN")).toBeTruthy();
  expect(updateKeys.includes("trustee.trusteeNameZHHK")).toBeTruthy();
  expect(updateKeys.includes("scheme.schemeName")).toBeTruthy();
  expect(updateKeys.includes("scheme.schemeNameZHHK")).toBeTruthy();
  expect(updateKeys.includes("funds.28.fundName")).toBeTruthy();
  expect(updateKeys.includes("funds.29.fundCode")).toBeTruthy();
});
