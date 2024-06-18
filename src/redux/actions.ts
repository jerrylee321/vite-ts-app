import { createAction } from "@reduxjs/toolkit";

export interface LoginActionPayload {
  sessionId: string | null;
  maintainLastSession: boolean;
}

export const loginAction = createAction<LoginActionPayload>("auth/login");
export const logoutAction = createAction("auth/logout");
