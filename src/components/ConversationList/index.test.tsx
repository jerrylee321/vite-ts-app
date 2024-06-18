import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { parseISO } from "date-fns";

import Conversation from "../../models/conversation";
import { renderWithProviders } from "../../utils/test/render";

import ConversationList from ".";

enum MockConversationUserType {
  MPFA = "MPFA",
  EMPF = "EMPF",
}

const mockConversations: Conversation[] = [
  {
    orderNumber: "2",
    senderType: MockConversationUserType.MPFA,
    receiverType: MockConversationUserType.EMPF,
    senderUserName: "Emily Leung",
    submissionDateTime: parseISO("2023-02-19T20:40:14+0800"),
    replyDetails:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    reportUserId: "2887745",
    reportUserName: "Emily Leung",
    reportUserDepartment: "Department Name",
    contactUserName: "Emily Leung",
    contactDepartment: "Contact Department Name",
    contactNumber: "33223321",
    contactEmail: "kiki@company.com",
  },
  {
    orderNumber: "3",
    senderType: MockConversationUserType.MPFA,
    receiverType: MockConversationUserType.EMPF,
    senderUserName: "Emily Leung",
    submissionDateTime: parseISO("2023-02-19T20:40:14+0800"),
    replyDetails:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    reportUserId: "2887745",
    reportUserName: "Emily Leung",
    reportUserDepartment: "Department Name",
    contactUserName: "Emily Leung",
    contactDepartment: "Contact Department Name",
    contactNumber: "33223321",
    contactEmail: "kiki@company.com",
  },
  {
    orderNumber: "1",
    senderType: MockConversationUserType.EMPF,
    receiverType: MockConversationUserType.MPFA,
    senderUserName: "Emily Leung",
    submissionDateTime: parseISO("2023-02-19T20:40:14+0800"),
    replyDetails:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    reportUserId: "2887745",
    reportUserName: "Emily Leung",
    reportUserDepartment: "Department Name",
    contactUserName: "Emily Leung",
    contactDepartment: "Contact Department Name",
    contactNumber: "33223321",
    contactEmail: "kiki@company.com",
  },
];

describe("Conversation List Component", () => {
  test("Render test", () => {
    renderWithProviders(
      <ConversationList conversations={mockConversations} portalType="" />
    );
    expect(screen.getAllByTestId("ConversationCardRoot").length).toBe(
      mockConversations.length
    );

    const renderOrder = mockConversations
      .sort((a, b) => Number(a.orderNumber) - Number(b.orderNumber))
      .map((x) => `#${x.orderNumber?.padStart(2, "0")}`);

    expect(
      screen.getAllByTestId("ConversationCardOrder").map((x) => x.textContent)
    ).toEqual(renderOrder);
  });

  test("No conversation", () => {
    renderWithProviders(<ConversationList conversations={[]} portalType="" />);
    expect(screen.getByText("No conversation")).toBeInTheDocument();
  });
});
