import { PropsWithChildren, ReactElement } from "react";
import { I18nextProvider } from "react-i18next";
import { Column, TableState } from "react-table";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import i18n from "../../i18n";
import { LookupFn } from "../../types/lookup";

import DefaultCell from "./DefaultCell";

interface MockModel {
  name: string;
}

const defaultColumn: Column<MockModel> = {
  accessor: "name",
  i18nKey: "AppBarTitle.appTitle",
};

const state = {} satisfies Partial<TableState<MockModel>>;

const wrapper = ({ children }: PropsWithChildren): ReactElement => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

describe("DefaultCell", () => {
  test("render string", async () => {
    const col = defaultColumn;
    render(
      // @ts-expect-error
      <DefaultCell<MockModel> value="code" column={col} state={state} />,
      {
        wrapper,
      }
    );

    expect(await screen.findByText(/code/)).toBeInTheDocument();
  });

  test("render string lookup", async () => {
    const col: Column<MockModel> = {
      ...defaultColumn,
      lookup: ((v: string) => `mock-${v}`) as LookupFn,
    };
    render(
      // @ts-expect-error
      <DefaultCell<MockModel> value="code" column={col} state={state} />,
      {
        wrapper,
      }
    );

    expect(await screen.findByText(/mock-code/)).toBeInTheDocument();
  });

  test("render string i18nValueMap", async () => {
    const col: Column<MockModel> = {
      ...defaultColumn,
      i18nValueMap: {
        code: "AppBarTitle.appTitle",
      },
    };
    render(
      // @ts-expect-error
      <DefaultCell<MockModel> value="code" column={col} state={state} />,
      {
        wrapper,
      }
    );

    expect(await screen.findByText(/Portal/)).toBeInTheDocument();
  });
});
