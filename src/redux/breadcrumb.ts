import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Breadcrumb {
  path?: string;
  title: string;
}

export interface BreadcrumbState {
  breadcrumbs: Breadcrumb[];
}

const initialState: BreadcrumbState = {
  breadcrumbs: [],
};

export const breadcrumbSlice = createSlice({
  name: "breadcrumb",
  initialState: initialState,
  reducers: {
    push: (state, action: PayloadAction<Breadcrumb>) => {
      return {
        ...state,
        breadcrumbs: state.breadcrumbs.concat(action.payload),
      };
    },
    pop: (state) => {
      return { ...state, breadcrumbs: state.breadcrumbs.slice(0, -1) };
    },
  },
});

export const { push, pop } = breadcrumbSlice.actions;

export default breadcrumbSlice.reducer;
