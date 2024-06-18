import { renderWithProviders } from "../../utils/test/render";

import DetailScreenConversationSection from ".";

describe("DetailScreenConversationSection", () => {
  test("should render", () => {
    renderWithProviders(
      <DetailScreenConversationSection
        title="title"
        conversations={[]}
        portalType="test"
      />
    );
  });
});
