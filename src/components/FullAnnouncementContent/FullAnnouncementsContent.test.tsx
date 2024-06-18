import { useTable } from "react-table";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { Announcement } from "../../models/announcement";
import { renderWithProviders } from "../../utils/test/render";

import { AnnouncementTableColumns } from "./FullAnnouncementResultsColumn";
import FullAnnouncementsContent, { AnnouncementTableRow } from ".";

jest.mock("react-table", () => ({
  ...jest.requireActual("react-table"),
  useTable: jest.fn((param) => {
    return {
      pageCount: 1,
      gotoPage: jest.fn(),
      setPageSize: jest.fn(),
      canNextPage: false,
      canPreviousPage: false,
      state: { pageIndex: 0, pageSize: 50 },
      page: param.data.map((data: Announcement) => ({
        original: data,
      })),
    };
  }),
}));

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

const mockGeneratePath = () => "/testing-path";

describe("announcement section in overview page", () => {
  test("should render the list with data", async () => {
    renderWithProviders(
      <FullAnnouncementsContent
        announcements={dummyData}
        isLoading={false}
        generateDetailPath={mockGeneratePath}
        showBottomPagination={true}
      />
    );

    expect(screen.getAllByText(/system maintenance/i).length).toBe(
      dummyData.length
    );
  });

  test("should render one announcement row without highlight", async () => {
    const { page } = useTable({
      columns: AnnouncementTableColumns,
      data: dummyData,
      initialState: {
        pageIndex: 0,
        pageSize: 3,
      },
      autoResetFilters: false,
      autoResetPage: false,
    });
    renderWithProviders(
      <table>
        <tbody>
          <AnnouncementTableRow
            announcement={page[0]}
            isHighlight={false}
            generateDetailPath={mockGeneratePath}
          />
        </tbody>
      </table>
    );
    expect(screen.getAllByText(/system maintenance/i).length).toBe(1);
    expect(screen.queryByTestId("InfoBadge")).toBe(null);
  });

  test("should render one announcement row with highlight", async () => {
    const { page } = useTable({
      columns: AnnouncementTableColumns,
      data: dummyData,
      initialState: {
        pageIndex: 0,
        pageSize: 3,
      },
      autoResetFilters: false,
      autoResetPage: false,
    });
    renderWithProviders(
      <table>
        <tbody>
          <AnnouncementTableRow
            announcement={page[0]}
            isHighlight={true}
            generateDetailPath={mockGeneratePath}
          />
          ,
        </tbody>
      </table>
    );
    expect(screen.getAllByText(/system maintenance/i).length).toBe(1);
    expect(screen.getByTestId("InfoBadge")).toBeDefined();
  });
});
