import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import PaginationControl, { ItemsPerPageDisplay } from ".";

const dummyItemsPerPageSetting = [50, 100, 150];

describe("component render with correct state", () => {
  test("should render the control with items per page", async () => {
    const pageChange = jest.fn();
    renderWithProviders(
      <PaginationControl
        onPageChange={pageChange}
        page={0}
        totalPages={4}
        itemsPerPage={dummyItemsPerPageSetting[0]}
        itemsPerPageOptions={dummyItemsPerPageSetting}
        shouldShowItemsPerPage={true}
        canPreviousPage={true}
        canNextPage={true}
      />
    );
    expect(screen.getByTestId("PaginationControlRoot")).toBeInTheDocument();
    expect(screen.getAllByTestId("ItemsPerPageDisplayRoot").length).toBe(
      dummyItemsPerPageSetting.length
    );
  });

  test("should render the control without items per page", async () => {
    const pageChange = jest.fn();
    renderWithProviders(
      <PaginationControl
        onPageChange={pageChange}
        page={0}
        totalPages={4}
        shouldShowItemsPerPage={false}
        canPreviousPage={true}
        canNextPage={true}
      />
    );
    expect(screen.getByTestId("PaginationControlRoot")).toBeInTheDocument();
    expect(screen.queryAllByTestId("ItemsPerPageDisplayRoot").length).toBe(0);
  });

  test("should render items per page with active status", async () => {
    const itemsClick = jest.fn();
    const { container } = renderWithProviders(
      <ItemsPerPageDisplay
        onItemsPerPageClick={itemsClick}
        itemsPerPage={dummyItemsPerPageSetting[0]}
        itemsPerPageOptions={dummyItemsPerPageSetting}
        focusIndex={0}
      />
    );
    const element = container.getElementsByClassName("text-secondary-main");
    expect(element.item(0)).toBeInTheDocument();
    fireEvent.click(element.item(0)!);
    expect(itemsClick).toBeCalledTimes(1);
  });
  test("should render items per page without active status", async () => {
    const itemsClick = jest.fn();
    const { container } = renderWithProviders(
      <ItemsPerPageDisplay
        onItemsPerPageClick={itemsClick}
        itemsPerPage={dummyItemsPerPageSetting[1]}
        itemsPerPageOptions={dummyItemsPerPageSetting}
        focusIndex={0}
      />
    );

    expect(
      container.getElementsByClassName("cursor-pointer").item(0)
    ).toBeInTheDocument();

    const element = container.getElementsByClassName("text-secondary-main");
    expect(element.length).toBe(0);
  });
});

describe("paging control action", () => {
  test("should increment page by 1 by clicking next button", async () => {
    const pageChange = jest.fn();
    renderWithProviders(
      <PaginationControl
        onPageChange={pageChange}
        page={0}
        totalPages={3}
        itemsPerPage={dummyItemsPerPageSetting[0]}
        itemsPerPageOptions={dummyItemsPerPageSetting}
        shouldShowItemsPerPage={true}
        canPreviousPage={true}
        canNextPage={true}
      />
    );

    const pageInput: HTMLInputElement = screen.getByTestId("PageInput");
    const nextPageButton = screen.getByTestId("NextPageButton");
    expect(pageInput.value).toBe("1");

    fireEvent.click(nextPageButton);

    expect(pageInput.value).toBe("2");
  });

  test("should keep page not beyond total pages by clicking next button", async () => {
    const pageChange = jest.fn();
    renderWithProviders(
      <PaginationControl
        onPageChange={pageChange}
        page={2}
        totalPages={3}
        itemsPerPage={dummyItemsPerPageSetting[0]}
        itemsPerPageOptions={dummyItemsPerPageSetting}
        shouldShowItemsPerPage={true}
        canPreviousPage={true}
        canNextPage={true}
      />
    );

    const pageInput: HTMLInputElement = screen.getByTestId("PageInput");
    const nextPageButton = screen.getByTestId("NextPageButton");
    expect(pageInput.value).toBe("3");

    fireEvent.click(nextPageButton);

    expect(pageInput.value).toBe("3");
  });

  test("should decrement page by 1 by clicking previous button", async () => {
    const pageChange = jest.fn();
    renderWithProviders(
      <PaginationControl
        onPageChange={pageChange}
        page={1}
        totalPages={3}
        itemsPerPage={dummyItemsPerPageSetting[0]}
        itemsPerPageOptions={dummyItemsPerPageSetting}
        shouldShowItemsPerPage={true}
        canPreviousPage={true}
        canNextPage={true}
      />
    );

    const pageInput: HTMLInputElement = screen.getByTestId("PageInput");
    const previousPageButton = screen.getByTestId("PreviousPageButton");
    expect(pageInput.value).toBe("2");

    fireEvent.click(previousPageButton);

    expect(pageInput.value).toBe("1");
  });

  test("should keep page at 1 by clicking previous button at page 1", async () => {
    const pageChange = jest.fn();
    renderWithProviders(
      <PaginationControl
        onPageChange={pageChange}
        page={0}
        totalPages={3}
        itemsPerPage={dummyItemsPerPageSetting[0]}
        itemsPerPageOptions={dummyItemsPerPageSetting}
        shouldShowItemsPerPage={true}
        canPreviousPage={true}
        canNextPage={true}
      />
    );

    const pageInput: HTMLInputElement = screen.getByTestId("PageInput");
    const previousPageButton = screen.getByTestId("PreviousPageButton");
    expect(pageInput.value).toBe("1");

    fireEvent.click(previousPageButton);

    expect(pageInput.value).toBe("1");
  });

  test("should go to target page by inputing the page", async () => {
    const pageChange = jest.fn();
    renderWithProviders(
      <PaginationControl
        onPageChange={pageChange}
        page={0}
        totalPages={30}
        itemsPerPage={dummyItemsPerPageSetting[0]}
        itemsPerPageOptions={dummyItemsPerPageSetting}
        shouldShowItemsPerPage={true}
        canPreviousPage={true}
        canNextPage={true}
      />
    );

    const pageInput: HTMLInputElement = screen.getByTestId("PageInput");
    expect(pageInput.value).toBe("1");

    const targetPage = 6;
    fireEvent.change(pageInput, { target: { value: `${targetPage}` } });
    fireEvent.keyUp(pageInput, { key: "Enter", code: 13, charCode: 13 });

    expect(pageInput.value).toBe(`${targetPage}`);
  });

  test("should go page 1 if input not a string", async () => {
    const pageChange = jest.fn();
    renderWithProviders(
      <PaginationControl
        onPageChange={pageChange}
        page={0}
        totalPages={30}
        itemsPerPage={dummyItemsPerPageSetting[0]}
        itemsPerPageOptions={dummyItemsPerPageSetting}
        shouldShowItemsPerPage={true}
        canPreviousPage={true}
        canNextPage={true}
      />
    );

    const pageInput: HTMLInputElement = screen.getByTestId("PageInput");
    expect(pageInput.value).toBe("1");

    fireEvent.change(pageInput, { target: { value: `x` } });
    fireEvent.keyUp(pageInput, { key: "Enter", code: 13, charCode: 13 });

    expect(pageInput.value).toBe("1");
  });

  test("should be able to select input by focus", async () => {
    const pageChange = jest.fn();
    renderWithProviders(
      <PaginationControl
        onPageChange={pageChange}
        page={0}
        totalPages={30}
        itemsPerPage={dummyItemsPerPageSetting[0]}
        itemsPerPageOptions={dummyItemsPerPageSetting}
        shouldShowItemsPerPage={true}
        canPreviousPage={true}
        canNextPage={true}
      />
    );

    const pageInput: HTMLInputElement = screen.getByTestId("PageInput");
    fireEvent.focus(pageInput);
  });

  test("should change items per page display", async () => {
    const pageChange = jest.fn();
    const indexChange = jest.fn();
    renderWithProviders(
      <PaginationControl
        onPageChange={pageChange}
        onItemsPerPageChange={indexChange}
        page={0}
        totalPages={3}
        itemsPerPage={dummyItemsPerPageSetting[0]}
        itemsPerPageOptions={dummyItemsPerPageSetting}
        shouldShowItemsPerPage={true}
        canPreviousPage={true}
        canNextPage={true}
      />
    );

    const allItemsPerPageControls = screen.getAllByTestId(
      "ItemsPerPageDisplayRoot"
    );
    expect(allItemsPerPageControls.length).toBe(
      dummyItemsPerPageSetting.length
    );

    fireEvent.click(allItemsPerPageControls[1]);
    expect(indexChange).toBeCalledTimes(1);
  });

  test("should disable page buttons by setting canPage props ", async () => {
    const pageChange = jest.fn();
    renderWithProviders(
      <PaginationControl
        onPageChange={pageChange}
        page={0}
        totalPages={3}
        itemsPerPage={dummyItemsPerPageSetting[0]}
        itemsPerPageOptions={dummyItemsPerPageSetting}
        shouldShowItemsPerPage={true}
        canPreviousPage={false}
        canNextPage={false}
      />
    );

    const previousPageButton = screen.getByTestId("PreviousPageButton");
    const nextPageButton = screen.getByTestId("NextPageButton");

    expect(previousPageButton).toBeDisabled();
    expect(nextPageButton).toBeDisabled();
  });
});
