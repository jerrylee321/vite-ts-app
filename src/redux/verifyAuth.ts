import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { loginAction } from "./actions";

export type VerifyAuthState = {
  /**
   * The verification access token is used to provide temporary access token
   * that is used to verify login before a full access token is granted.
   */
  verificationToken: string;

  /**
   * The verification code is used to identify a OTP token.
   */
  verificationCodeId: string;
} | null;

interface InitializeVerifyAuthPayload {
  verificationToken: string;
  verificationCodeId: string;
}

const initialState: VerifyAuthState = null;

export const verifyAuthSlice = createSlice({
  name: "verifyAuth",
  initialState: initialState as VerifyAuthState,
  reducers: {
    initialize: (_, action: PayloadAction<InitializeVerifyAuthPayload>) => {
      const { verificationToken, verificationCodeId } = action.payload;
      return { verificationToken, verificationCodeId };
    },
    reset: () => {
      return null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction, () => {
      return null;
    });
  },
});

export const { initialize, reset } = verifyAuthSlice.actions;

export default verifyAuthSlice.reducer;
