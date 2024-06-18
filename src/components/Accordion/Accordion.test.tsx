import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import Accordion from ".";

describe("Accordion", () => {
  test("render", () => {
    const { container } = renderWithProviders(
      <Accordion title="[test title]" footer={<span>[test footer]</span>}>
        <span>[test children]</span>
      </Accordion>
    );

    expect(container.getElementsByClassName("MuiAccordion-root").length).toBe(
      1
    );
    expect(container.textContent?.includes("[test title]")).toBe(true);
    expect(container.textContent?.includes("[test footer]")).toBe(true);
    expect(container.textContent?.includes("[test children]")).toBe(true);
  });

  test("render text title", async () => {
    renderWithProviders(<Accordion title="eMPF" />);

    expect(await screen.findByText("eMPF")).toBeInTheDocument();
  });

  test("render message key title", async () => {
    renderWithProviders(
      <Accordion titleMessageKey="AppBarTitle.projectTitle" />
    );

    expect(await screen.findByText("eMPF")).toBeInTheDocument();
  });

  test("no footer", () => {
    const { container } = renderWithProviders(
      <Accordion title="[test title]">
        <span>[test children]</span>
      </Accordion>
    );

    expect(container.getElementsByClassName("MuiAccordion-root").length).toBe(
      1
    );
    expect(container.textContent?.includes("[test title]")).toBe(true);
    expect(container.textContent?.includes("[test footer]")).toBe(false);
    expect(container.textContent?.includes("[test children]")).toBe(true);
  });
});
