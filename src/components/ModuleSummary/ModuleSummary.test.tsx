import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";

import { Module } from "../../models/module";
import { PendingCaseModule } from "../../models/pendingCase";
import { renderWithProviders } from "../../utils/test/render";

import ModuleSummary from ".";

describe("Modules in overview page", () => {
  test("should render the list with data", async () => {
    const testMainModules: Module[] = [
      {
        messageKey: "HomeScreen.modules.MembersRequestOnPAUB",
        submodules: [
          {
            messageKey:
              "HomeScreen.modules.MembersRequestOnPAUB.submodule.receivedFromEMPF",
          },
          {
            messageKey:
              "HomeScreen.modules.MembersRequestOnPAUB.submodule.referralToEMPF",
          },
        ],
      },
      {
        messageKey: "HomeScreen.modules.statisticalReturnsFromEMPF",
        path: "/my/path",
      },
      {
        messageKey: "HomeScreen.modules.regulatoryReturnsFromEMPF",
        pendingCasesKey: "my key 1",
        submodules: [
          {
            messageKey:
              "HomeScreen.modules.regulatoryReturnsFromEMPF.submodule.enquiryOnPARSubmission",
            pendingCasesKey: "sub key 1",
          },
          {
            messageKey:
              "HomeScreen.modules.regulatoryReturnsFromEMPF.submodule.issuanceOfParticipationNumberByMPFA",
            pendingCasesKey: "sub key 2",
          },
        ],
      },
    ];

    const testOtherModules: Module[] = [
      {
        messageKey: "HomeScreen.modules.EnforcementActionsHandling",
      },
    ];

    const testPendingCases: PendingCaseModule[] = [
      {
        moduleName: "my key 1",
        subModules: [
          {
            pendingCaseCount: 123,
            subModuleName: "sub key 2",
          },
        ],
      },
    ];

    renderWithProviders(
      <ModuleSummary
        highlightIconClass=""
        highlightTextClass=""
        mainModules={testMainModules}
        modulePendingCases={testPendingCases}
        normalIconClass=""
        normalTextClass=""
        otherModules={testOtherModules}
      />
    );

    expect(screen.getAllByText(/123/).length).toBe(1);
    expect(
      screen.getByText("Members Request on PA/UB").parentElement!.parentElement!
        .tagName
    ).toBe("BUTTON");
    expect(
      screen.getByText("Statistical Returns from eMPF").parentElement!
        .parentElement!.tagName
    ).toBe("A");

    fireEvent.click(
      screen.getByText("Regulatory Returns from eMPF").parentElement!
        .parentElement!
    );
    expect(screen.getAllByText(/123/).length).toBe(2);
  });
});
