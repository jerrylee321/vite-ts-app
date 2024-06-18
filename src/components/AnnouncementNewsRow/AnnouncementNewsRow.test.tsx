import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { Announcement } from "../../models/announcement";
import { renderWithProviders } from "../../utils/test/render";

import AnnouncementNewsRow from ".";

const makeAnnouncement = (override?: Partial<Announcement>): Announcement => ({
  recUuid: "2",
  publishDate: new Date("3 Dec 2021"),
  titleEn: "english title",
  bodyEn: "english body",
  announceRefId: "0",
  announceSys: "FEP_MPFA",
  category: "System maintenance",
  version: "v0.0.1",
  targetPage: "Overview",
  titleZhhk: "tranditional chinese title",
  bodyZhhk: "tranditional chinese body",
  titleZhcn: "simplified chinese title",
  bodyZhcn: "simplified chinese body",
  seqNo: 0,
  recordUpdateUser: "dummy",
  recordUpdateTime: new Date("3 Dec 2021"),
  ...override,
});

const mockGeneratePath = () => "/testing-path";

describe("Announcement section in overview page", () => {
  test("should render highlighted style for highlighted data", async () => {
    renderWithProviders(
      <AnnouncementNewsRow
        announcement={makeAnnouncement()}
        generatePath={mockGeneratePath}
        isHighlight={true}
      />
    );

    const element = screen.getByText(/english title/i);
    expect(element).toBeInTheDocument();

    const hightlightTextElement = screen.getByTestId("HighlightTitle");
    expect(hightlightTextElement).toBeInTheDocument();
  });

  test("should render highlighted style for non-hightlighted data", async () => {
    const { container } = renderWithProviders(
      <AnnouncementNewsRow
        announcement={makeAnnouncement({ publishDate: null })}
        generatePath={mockGeneratePath}
        isHighlight={false}
      />
    );

    const element = screen.getByText(/english title/i);
    expect(element).toBeInTheDocument();

    const hightlightTextElement = container.getElementsByClassName("font-bold");
    expect(hightlightTextElement.length).toBe(0);
  });
});
