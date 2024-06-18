import deepAssignValue from "./deepAssignValue";

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
    phoneNo: {
      countryCode: string | null;
      number: string | null;
    } | null;
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

it("should able to assign value to existing key", () => {
  let dummyTrusteeInfo: DummyInfoType = {
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
    ],
  };

  dummyTrusteeInfo = deepAssignValue(
    dummyTrusteeInfo,
    "trustee.email",
    "assigned@email.com"
  );
  dummyTrusteeInfo = deepAssignValue(
    dummyTrusteeInfo,
    "trustee.faxUuid",
    "assigned faxuuid"
  );

  dummyTrusteeInfo = deepAssignValue(dummyTrusteeInfo, "trustee.phoneNo", {
    countryCode: "852",
    number: "assigned phone number",
  });

  dummyTrusteeInfo = deepAssignValue(
    dummyTrusteeInfo,
    "trustee.trusteeAddr.country",
    "assigned country"
  );
  dummyTrusteeInfo = deepAssignValue(
    dummyTrusteeInfo,
    "trustee.faxNo.countryCode",
    "assigned fax"
  );
  dummyTrusteeInfo = deepAssignValue(
    dummyTrusteeInfo,
    "scheme.schemeName",
    "assigned scheme name"
  );
  dummyTrusteeInfo = deepAssignValue(
    dummyTrusteeInfo,
    "funds.3.fundName",
    "assigned fund name 3"
  );
  dummyTrusteeInfo = deepAssignValue(
    dummyTrusteeInfo,
    "funds.1.fundName",
    "assigned fund name 1"
  );

  expect(dummyTrusteeInfo.trustee.email).toBe("assigned@email.com");
  expect(dummyTrusteeInfo.trustee.faxUuid).toBe("assigned faxuuid");
  expect(dummyTrusteeInfo.trustee.faxNo?.countryCode).toBe("assigned fax");
  expect(dummyTrusteeInfo.trustee.trusteeAddr!.country).toBe(
    "assigned country"
  );
  expect(dummyTrusteeInfo.scheme.schemeName).toBe("assigned scheme name");
  expect(dummyTrusteeInfo.funds[3].fundName).toBe("assigned fund name 3");
  expect(dummyTrusteeInfo.funds[1].fundName).toBe("assigned fund name 1");

  expect(dummyTrusteeInfo.trustee.phoneNo?.number).toBe(
    "assigned phone number"
  );
});

it("should able to assign value to non existing key", () => {
  let dummyTrusteeInfo: DummyInfoType = {
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
        fundCode: "VC_NAEF21",
        fundDescriptor: "n.a.",
        fundName: "North American Equity Fund updated",
        fundNameZHCN: "North American Equity Fund",
        fundNameZHHK: "North American Equity Fund",
        fundUuid: "e90c2eaf-36c6-561d-e053-0b15d70ae060",
        riskCLass: "Risk Class 6",
        riskClassCode: "RISK_CLASS_6",
      },
    ],
  };

  dummyTrusteeInfo = deepAssignValue(
    dummyTrusteeInfo,
    "trustee.trusteeAddrZHHK.country",
    "assigned country ZHHK"
  );

  dummyTrusteeInfo = deepAssignValue(
    dummyTrusteeInfo,
    "funds.3.fundName",
    "assigned fund name 3"
  );

  dummyTrusteeInfo = deepAssignValue(
    dummyTrusteeInfo,
    "funds.0.",
    "assigned fund name 3"
  );
  dummyTrusteeInfo = deepAssignValue(
    dummyTrusteeInfo,
    "trustee.",
    "assigned fund name 3"
  );

  expect(dummyTrusteeInfo.trustee.trusteeAddrZHHK).toBeNull();
  expect(dummyTrusteeInfo.funds.length).toBe(1);
});

it("should do nothing for null input", () => {
  const dummy = deepAssignValue(null, "trustee.phoneNo", {
    countryCode: "852",
    number: "assigned phone number",
  });

  expect(dummy).toBeNull();
});
