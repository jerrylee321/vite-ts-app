import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import AnnouncementContent from ".";

const mockGeneratePath = () => "/testing-path";

describe("Announcement section in overview page", () => {
  test("should render the list with data", async () => {
    const dummyData = [
      {
        recUuid: "1",
        publishDate: new Date("5 Dec 2021"),
        titleEn: "System maintenance on 5 Dec 2021",
        bodyEn:
          "Commencing 1/1/2024, MPF administration of ABC trustee will be operated in the centralized eMPF platform. The eMPF Platform is a major infrastructure which aims to reshape the administrative models of MPF schemes and to standardize, streamline and automate the existing scheme administrative processes. Through the adoption of new technologies and future-proof innovative solutions, the Platform will provide comprehensive MPF scheme administration services to over four million MPF scheme members and 300,000 employers, bringing about revolutionary changes to the MPF ecosystem.",
        announceRefId: "0",
        announceSys: "FEP_MPFA",
        category: "System maintenance",
        version: "v0.0.1",
        targetPage: "Overview",
        titleZhhk: "System maintenance on 5 Dec 2021",
        bodyZhhk:
          "Commencing 1/1/2024, MPF administration of ABC trustee will be operated in the centralized eMPF platform. The eMPF Platform is a major infrastructure which aims to reshape the administrative models of MPF schemes and to standardize, streamline and automate the existing scheme administrative processes. Through the adoption of new technologies and future-proof innovative solutions, the Platform will provide comprehensive MPF scheme administration services to over four million MPF scheme members and 300,000 employers, bringing about revolutionary changes to the MPF ecosystem.",
        titleZhcn: "System maintenance on 5 Dec 2021",
        bodyZhcn:
          "Commencing 1/1/2024, MPF administration of ABC trustee will be operated in the centralized eMPF platform. The eMPF Platform is a major infrastructure which aims to reshape the administrative models of MPF schemes and to standardize, streamline and automate the existing scheme administrative processes. Through the adoption of new technologies and future-proof innovative solutions, the Platform will provide comprehensive MPF scheme administration services to over four million MPF scheme members and 300,000 employers, bringing about revolutionary changes to the MPF ecosystem.",
        seqNo: 0,
        recordUpdateUser: "dummy",
        recordUpdateTime: new Date("5 Dec 2021"),
      },
      {
        recUuid: "2",
        publishDate: new Date("3 Dec 2021"),
        titleEn: "System maintenance on 3 Dec 2021",
        bodyEn:
          "Commencing 1/1/2024, MPF administration of ABC trustee will be operated in the centralized eMPF platform. The eMPF Platform is a major infrastructure which aims to reshape the administrative models of MPF schemes and to standardize, streamline and automate the existing scheme administrative processes. Through the adoption of new technologies and future-proof innovative solutions, the Platform will provide comprehensive MPF scheme administration services to over four million MPF scheme members and 300,000 employers, bringing about revolutionary changes to the MPF ecosystem.",
        announceRefId: "0",
        announceSys: "FEP_MPFA",
        category: "System maintenance",
        version: "v0.0.1",
        targetPage: "Overview",
        titleZhhk: "System maintenance on 3 Dec 2021",
        bodyZhhk:
          "Commencing 1/1/2024, MPF administration of ABC trustee will be operated in the centralized eMPF platform. The eMPF Platform is a major infrastructure which aims to reshape the administrative models of MPF schemes and to standardize, streamline and automate the existing scheme administrative processes. Through the adoption of new technologies and future-proof innovative solutions, the Platform will provide comprehensive MPF scheme administration services to over four million MPF scheme members and 300,000 employers, bringing about revolutionary changes to the MPF ecosystem.",
        titleZhcn: "System maintenance on 3 Dec 2021",
        bodyZhcn:
          "Commencing 1/1/2024, MPF administration of ABC trustee will be operated in the centralized eMPF platform. The eMPF Platform is a major infrastructure which aims to reshape the administrative models of MPF schemes and to standardize, streamline and automate the existing scheme administrative processes. Through the adoption of new technologies and future-proof innovative solutions, the Platform will provide comprehensive MPF scheme administration services to over four million MPF scheme members and 300,000 employers, bringing about revolutionary changes to the MPF ecosystem.",
        seqNo: 0,
        recordUpdateUser: "dummy",
        recordUpdateTime: new Date("3 Dec 2021"),
      },
    ];

    renderWithProviders(
      <AnnouncementContent
        announcements={dummyData}
        generateListPath={mockGeneratePath}
        generateDetailPath={mockGeneratePath}
        isLoading={false}
      />
    );

    expect(screen.getAllByText(/system maintenance/i).length).toBe(
      dummyData.length
    );
  });
});
