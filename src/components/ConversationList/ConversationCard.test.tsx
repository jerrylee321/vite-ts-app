import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import Conversation from "../../models/conversation";
import { CommonOption } from "../../models/option";
import { renderWithProviders } from "../../utils/test/render";

import ConversationCard from "./ConversationCard";

enum MockConversationUserType {
  MPFA = "MPFA",
  EMPF = "EMPF",
}

const makeConversation = (override?: Partial<Conversation>): Conversation => ({
  orderNumber: "3",
  senderType: MockConversationUserType.MPFA,
  receiverType: MockConversationUserType.EMPF,
  senderUserName: "[test senderUserName]",
  submissionDateTime: new Date(0),
  replyDetails: "[test replyDetails]",
  reportUserId: "[test reportUserId]",
  reportUserName: "[test reportUserName]",
  reportUserDepartment: "[test reportUserDepartment]",
  contactUserName: "[test contactUserName]",
  contactDepartment: "[test contactDepartment]",
  contactNumber: "[test contactNumber]",
  contactEmail: "[test contactEmail]",
  ...override,
});

const mockDepartmentList: CommonOption[] = [];

describe("ConversationCard Component", () => {
  test("Conversation send from current portal", () => {
    const mockConversation = makeConversation();
    renderWithProviders(
      <ConversationCard
        className="ml-auto"
        conversation={mockConversation}
        isFromPortal={true}
        departmentList={mockDepartmentList}
      />
    );

    expect(
      screen.getByTestId("ConversationCardRoot").classList.contains("ml-auto")
    ).toBe(true);

    expect(screen.getByTestId("ConversationCardOrder").textContent).toContain(
      "#03"
    );
    expect(
      screen.getByTestId("ConversationCardSenderType").textContent
    ).toContain(mockConversation.senderType);
    expect(
      screen.getByTestId("ConversationCardSenderUserName").textContent
    ).toContain(mockConversation.senderUserName);
    expect(
      screen.getByTestId("ConversationCardSubmissionDateTime").textContent
    ).toContain("01/01/1970 00:00");
    expect(screen.getByTestId("ConversationCardParty1").textContent).toContain(
      mockConversation.receiverType
    );
    expect(screen.getByTestId("ArrowBackIcon")).toBeInTheDocument();
    expect(screen.getByTestId("ConversationCardParty2").textContent).toContain(
      mockConversation.senderType
    );

    expect(
      screen
        .getByTestId("ConversationCardBubbleContainer")
        .classList.contains("bg-gray-light")
    ).toBe(true);

    expect(
      screen.getByTestId("ConversationCardReplyDetails").textContent
    ).toContain(mockConversation.replyDetails);

    expect(
      screen.getByTestId("ConversationCarReportUserId").textContent
    ).toContain(mockConversation.reportUserId);

    expect(
      screen.getByTestId("ConversationCardReportUserName").textContent
    ).toContain(mockConversation.reportUserName);
    expect(
      screen.getByTestId("ConversationCardReportUserDepartment").textContent
    ).toContain(mockConversation.reportUserDepartment);
    expect(
      screen.getByTestId("ConversationCardContactUserName").textContent
    ).toContain(mockConversation.contactUserName);
    expect(
      screen.getByTestId("ConversationCardContactDepartment").textContent
    ).toContain(mockConversation.contactDepartment);
    expect(
      screen.getByTestId("ConversationCardContactNumber").textContent
    ).toContain(mockConversation.contactNumber);
    expect(
      screen.getByTestId("ConversationCardContactEmail").textContent
    ).toContain(mockConversation.contactEmail);
  });

  test("Coversation send from other portal", () => {
    const mockConversation = makeConversation({
      orderNumber: null,
      submissionDateTime: null,
    });
    renderWithProviders(
      <ConversationCard
        className="mr-auto"
        conversation={mockConversation}
        isFromPortal={false}
        departmentList={mockDepartmentList}
      />
    );

    expect(
      screen.getByTestId("ConversationCardRoot").classList.contains("mr-auto")
    ).toBe(true);

    expect(screen.getByTestId("ConversationCardOrder").textContent).toContain(
      "-"
    );
    expect(
      screen.getByTestId("ConversationCardSenderType").textContent
    ).toContain(mockConversation.senderType);
    expect(
      screen.getByTestId("ConversationCardSenderUserName").textContent
    ).toContain(mockConversation.senderUserName);
    expect(
      screen.getByTestId("ConversationCardSubmissionDateTime").textContent
    ).toContain("");
    expect(screen.getByTestId("ConversationCardParty1").textContent).toContain(
      mockConversation.senderType
    );
    expect(screen.getByTestId("ArrowForwardIcon")).toBeInTheDocument();
    expect(screen.getByTestId("ConversationCardParty2").textContent).toContain(
      mockConversation.receiverType
    );

    expect(
      screen
        .getByTestId("ConversationCardBubbleContainer")
        .classList.contains("bg-cyanBlue-light")
    ).toBe(true);

    expect(
      screen.getByTestId("ConversationCardReplyDetails").textContent
    ).toContain(mockConversation.replyDetails);

    expect(
      screen.getByTestId("ConversationCarReportUserId").textContent
    ).toContain(mockConversation.reportUserId);

    expect(
      screen.getByTestId("ConversationCardReportUserName").textContent
    ).toContain(mockConversation.reportUserName);
    expect(
      screen.getByTestId("ConversationCardReportUserDepartment").textContent
    ).toContain(mockConversation.reportUserDepartment);
    expect(
      screen.getByTestId("ConversationCardContactUserName").textContent
    ).toContain(mockConversation.contactUserName);
    expect(
      screen.getByTestId("ConversationCardContactDepartment").textContent
    ).toContain(mockConversation.contactDepartment);
    expect(
      screen.getByTestId("ConversationCardContactNumber").textContent
    ).toContain(mockConversation.contactNumber);
    expect(
      screen.getByTestId("ConversationCardContactEmail").textContent
    ).toContain(mockConversation.contactEmail);
  });

  test("Order number fill leading zero test", () => {
    const mockConversation = makeConversation({ orderNumber: "100" });
    const mockConversationNewOrder = {
      ...mockConversation,
      orderNumber: "100",
    };
    renderWithProviders(
      <ConversationCard
        className="ml-auto"
        isFromPortal={true}
        conversation={mockConversationNewOrder}
        departmentList={mockDepartmentList}
      />
    );
    expect(screen.getByTestId("ConversationCardOrder").textContent).toContain(
      `#${mockConversationNewOrder.orderNumber.padStart(2, "0")}`
    );
  });
});
