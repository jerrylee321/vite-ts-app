import { combineReducers, configureStore } from "@reduxjs/toolkit";

import auth, { initialState as authInitialState } from "./auth";
import breadcrumb from "./breadcrumb";
import registration, {
  initialState as registrationInitialState,
} from "./registration";
import scheme from "./scheme";
import verifyAuth from "./verifyAuth";

const reducerMap = {
  auth,
  verifyAuth,
  scheme,
  breadcrumb,
  registration,
};

export const reducer = combineReducers(reducerMap);

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reducer>;

export const initialState: RootState = Object.freeze({
  auth: authInitialState,
  scheme: { selectedScheme: null },
  breadcrumb: { breadcrumbs: [] },
  verifyAuth: null,
  registration: registrationInitialState,
});

export default store;
