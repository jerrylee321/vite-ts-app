import { fireEvent, screen } from "@testing-library/react";

import { AccessRightRoleType } from "../../apis/models/AccessRightRoleType";
import { AccessRightPermission } from "../../models/accessRight";
import { renderWithProviders } from "../../utils/test/render";

import ModuleAccessRightTable from ".";

const mockPermission: AccessRightPermission[] = [
  {
    permissionUuid: "ec13c959-a818-0789-e053-0b15d70a8846",
    roleType: AccessRightRoleType.preparer,
    permitNameCode: "Process Review",
    moduleName: "Process Review",
    groupName: "testing-group",
    groupNameCode: "testing-group",
  },
  {
    permissionUuid: "ec13c959-a81b-0789-e053-0b15d70a8846",
    roleType: AccessRightRoleType.supervisor,
    permitNameCode: "Fund Related Management",
    moduleName: "Fund Related Management",
    groupName: "testing-group",
    groupNameCode: "testing-group",
  },
  {
    permissionUuid: "ec13c959-a81d-0789-e053-0b15d70a8846",
    roleType: AccessRightRoleType.supervisor,
    permitNameCode: "Payment Issuance",
    moduleName: "Payment Issuance",
    groupName: "testing-group",
    groupNameCode: "testing-group",
  },
  {
    permissionUuid: "ec13c959-a81e-0789-e053-0b15d70a8846",
    roleType: AccessRightRoleType.preparer,
    permitNameCode: "Regulatory Returns",
    moduleName: "Regulatory Returns",
    groupName: "testing-group",
    groupNameCode: "testing-group",
  },
];

const mockFullPermissionList = [
  {
    moduleName: "Process Review",
    roleType: AccessRightRoleType.preparer,
    permissionUuid: "ec13c959-a818-0789-e053-0b15d70a8846",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "Process Review",
  },
  {
    moduleName: "Process Review",
    roleType: AccessRightRoleType.supervisor,
    permissionUuid: "ec13c959-a819-0789-e053-0b15d70a8846",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "Process Review",
  },
  {
    moduleName: "Fund Related Management",
    roleType: AccessRightRoleType.preparer,
    permissionUuid: "ec13c959-a81a-0789-e053-0b15d70a8846",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "Fund Related Management",
  },
  {
    moduleName: "Fund Related Management",
    roleType: AccessRightRoleType.supervisor,
    permissionUuid: "ec13c959-a81b-0789-e053-0b15d70a8846",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "Fund Related Management",
  },
  {
    moduleName: "Payment Issuance",
    roleType: AccessRightRoleType.preparer,
    permissionUuid: "ec13c959-a81c-0789-e053-0b15d70a8846",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "Payment Issuance",
  },
  {
    moduleName: "Payment Issuance",
    roleType: AccessRightRoleType.supervisor,
    permissionUuid: "ec13c959-a81d-0789-e053-0b15d70a8846",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "Payment Issuance",
  },
  {
    moduleName: "Regulatory Returns",
    roleType: AccessRightRoleType.preparer,
    permissionUuid: "ec13c959-a81e-0789-e053-0b15d70a8846",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "Regulatory Returns",
  },
  {
    moduleName: "Regulatory Returns",
    roleType: AccessRightRoleType.supervisor,
    permissionUuid: "ec13c959-a81f-0789-e053-0b15d70a8846",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "Regulatory Returns",
  },
  {
    moduleName: "Data Extraction",
    roleType: AccessRightRoleType.preparer,
    permissionUuid: "ec13c959-a820-0789-e053-0b15d70a8846",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "Data Extraction",
  },
  {
    moduleName: "Data Extraction",
    roleType: AccessRightRoleType.supervisor,
    permissionUuid: "ec13c959-a821-0789-e053-0b15d70a8846",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "Data Extraction",
  },
  {
    moduleName: "Image Retrieval(Enquity)",
    roleType: AccessRightRoleType.preparer,
    permissionUuid: "ec13c959-a822-0789-e053-0b15d70a8846",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "Image Retrieval(Enquity)",
  },
  {
    moduleName: "Image Retrieval(Enquity)",
    roleType: AccessRightRoleType.supervisor,
    permissionUuid: "ec13c959-a823-0789-e053-0b15d70a8846",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "Image Retrieval(Enquity)",
  },
  {
    moduleName: "Complaint & Entuiry Referral",
    roleType: AccessRightRoleType.preparer,
    permissionUuid: "ec13c959-a824-0789-e053-0b15d70a8846",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "Complaint & Entuiry Referral",
  },
  {
    moduleName: "Complaint & Entuiry Referral",
    roleType: AccessRightRoleType.supervisor,
    permissionUuid: "ec13c959-a825-0789-e053-0b15d70a8846",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "Complaint & Entuiry Referral",
  },
  {
    moduleName: "3rd Party Enquiry Referral",
    roleType: AccessRightRoleType.preparer,
    permissionUuid: "ec13c959-a826-0789-e053-0b15d70a8846",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "3rd Party Enquiry Referral",
  },
  {
    moduleName: "3rd Party Enquiry Referral",
    roleType: AccessRightRoleType.supervisor,
    permissionUuid: "ec13c959-a827-0789-e053-0b15d70a8846",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "3rd Party Enquiry Referral",
  },
  {
    moduleName: "Transfer in from ORSO Scheme",
    roleType: AccessRightRoleType.preparer,
    permissionUuid: "ec13c959-a828-0789-e053-0b15d70a8846",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "Transfer in from ORSO Scheme",
  },
  {
    moduleName: "Transfer in from ORSO Scheme",
    roleType: AccessRightRoleType.supervisor,
    permissionUuid: "ec13c959-a829-0789-e053-0b15d70a8846",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "Transfer in from ORSO Scheme",
  },
  {
    moduleName: "Update Trustee & Scheme Information",
    roleType: AccessRightRoleType.preparer,
    permissionUuid: "ec13c959-a82a-0789-e053-0b15d70a8846",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "Update Trustee & Scheme Information",
  },
  {
    moduleName: "Update Trustee & Scheme Information",
    roleType: AccessRightRoleType.supervisor,
    permissionUuid: "ec13c959-a82b-0789-e053-0b15d70a8846",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "Update Trustee & Scheme Information",
  },
  {
    moduleName: "Update Client Servicing  Information",
    roleType: AccessRightRoleType.preparer,
    permissionUuid: "ec13c959-a82c-0789-e053-0b15d70a8846",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "Update Client Servicing  Information",
  },
  {
    moduleName: "Update Client Servicing  Information",
    roleType: AccessRightRoleType.supervisor,
    permissionUuid: "ec13c959-a82d-0789-e053-0b15d70a8846",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "Update Client Servicing  Information",
  },
  {
    moduleName: "Other Requests",
    roleType: AccessRightRoleType.preparer,
    permissionUuid: "ec13c959-a82e-0789-e053-0b15d70a8846",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "Other Requests",
  },
  {
    moduleName: "Other Requests",
    roleType: AccessRightRoleType.supervisor,
    permissionUuid: "ec13c959-a82f-0789-e053-0b15d70a8846",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "Other Requests",
  },
  {
    moduleName: "Fund Related Management -Guaranteed Fund",
    roleType: AccessRightRoleType.preparer,
    permissionUuid: "ef9a478c-086b-3013-e053-0b15d70a5abc",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "Fund Related Management -Guaranteed Fund",
  },
  {
    moduleName: "Fund Related Management -Guaranteed Fund",
    roleType: AccessRightRoleType.supervisor,
    permissionUuid: "ef9a478c-086c-3013-e053-0b15d70a5abc",
    groupName: "TR Data Access Group",
    applCode: "TR",
    groupNameCode: "TR Data Access Group",
    permitNameCode: "Fund Related Management -Guaranteed Fund",
  },
];

describe("Module Access Right Table", () => {
  it("renders the table in read-only mode", () => {
    const mockSetPermissions = jest.fn();
    renderWithProviders(
      <ModuleAccessRightTable
        readOnly={true}
        fullPermissionList={mockFullPermissionList}
        permissions={mockPermission}
        onPermissionsChange={mockSetPermissions}
        enableGrouping={false}
      />
    );

    expect(screen.getByTestId("ModuleAccessRightTable")).toBeInTheDocument();

    expect(
      screen.getAllByTestId("ModuleAccessRightTableCheckBox")
    ).toHaveLength(mockPermission.length);
  });

  it("renders the table in editable mode", () => {
    const mockSetPermissions = jest.fn();

    renderWithProviders(
      <ModuleAccessRightTable
        readOnly={false}
        fullPermissionList={mockFullPermissionList}
        permissions={mockPermission}
        onPermissionsChange={mockSetPermissions}
        enableGrouping={true}
      />
    );

    expect(screen.getByTestId("ModuleAccessRightTable")).toBeInTheDocument();

    const checkBoxs = screen.getAllByTestId("ModuleAccessRightTableCheckBox");

    expect(checkBoxs).toHaveLength(mockFullPermissionList.length + 2);

    fireEvent.click(checkBoxs[0].querySelector('input[type="checkbox"]')!, {
      target: {
        checked: true,
      },
    });
    expect(mockSetPermissions).toHaveBeenCalledTimes(1);

    fireEvent.click(checkBoxs[2].querySelector('input[type="checkbox"]')!, {
      target: {
        checked: true,
      },
    });

    expect(mockSetPermissions).toHaveBeenCalledTimes(2);
  });
});
