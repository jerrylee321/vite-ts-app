import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SchemeListScheme } from "../apis/models/SchemeList";

import { loginAction, LoginActionPayload, logoutAction } from "./actions";

export type SelectedScheme = SchemeListScheme & {
  trusteeName: string;
};

export interface SchemeState {
  selectedScheme: SelectedScheme | null;
}

export type SelectSchemePayload = SelectedScheme | null;

const initialState: SchemeState = {
  selectedScheme: null,
};

export const schemeSlice = createSlice({
  name: "scheme",
  initialState: initialState,
  reducers: {
    select: (state, action: PayloadAction<SelectSchemePayload>) => {
      return { ...state, selectedScheme: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginAction,
      (state, action: PayloadAction<LoginActionPayload>) => {
        return action.payload.maintainLastSession
          ? state
          : { selectedScheme: null };
      }
    );
    builder.addCase(logoutAction, () => {
      return { selectedScheme: null };
    });
  },
});

export const { select } = schemeSlice.actions;

export default schemeSlice.reducer;
