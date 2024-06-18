import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RegistrationStage = "initial" | "otp" | "setUp";
export interface RegistrationState {
  stage: RegistrationStage;
  accountSetUpAccessToken: string | null;
  email: string | null;
  trusteeId: string | null;
  submissionId: string | null;
}

export const initialState: RegistrationState = Object.freeze({
  stage: "initial",
  accountSetUpAccessToken: null,
  email: null,
  trusteeId: null,
  submissionId: null,
});

interface InitiatePayload {
  email: string;
  trusteeId: string;
}

interface VerifyPayLoad {
  submissionId: string;
  accountSetUpAccessToken: string;
}

export const registrationSlice = createSlice({
  name: "registration",
  initialState: initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    error: (state, action: PayloadAction<unknown>) => {
      return { ...state, lastError: action.payload };
    },
    requestOTP: (state, action: PayloadAction<InitiatePayload>) => {
      const { email, trusteeId } = action.payload;
      return {
        ...state,
        stage: "otp",
        email,
        trusteeId,
      };
    },
    verifyOTP: (state, action: PayloadAction<VerifyPayLoad>) => {
      const { submissionId, accountSetUpAccessToken } = action.payload;
      return {
        ...state,
        stage: "setUp",
        submissionId,
        accountSetUpAccessToken,
      };
    },
  },
});

export const { reset, error, requestOTP, verifyOTP } =
  registrationSlice.actions;

export default registrationSlice.reducer;
