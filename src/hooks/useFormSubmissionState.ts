import { useCallback, useState } from "react";

interface SubmissionStateInitial {
  state: "initial";
}

interface SubmissionStateToBeConfirmed<TRequestData> {
  state: "toBeConfirmed";
  requestData: TRequestData;
}

interface SubmissionStateSubmitting<TSubmissionData> {
  state: "submitting";
  requestData: TSubmissionData;
}

interface SubmissionStateSubmitted<TResponseData> {
  state: "submitted";
  responseData: TResponseData;
}

export type SubmissionState<
  TRequestData,
  TResponseData,
  TSubmissionData = TRequestData
> =
  | SubmissionStateInitial
  | SubmissionStateToBeConfirmed<TRequestData>
  | SubmissionStateSubmitting<TSubmissionData>
  | SubmissionStateSubmitted<TResponseData>;

export interface useSubmissionStateReturns<
  TRequestData,
  TResponseData,
  TSubmissionData = TRequestData
> {
  submissionState: SubmissionState<
    TRequestData,
    TResponseData,
    TSubmissionData
  >;
  switchToStateInitial: () => void;
  switchToStateTBC: (requestData: TRequestData) => void;
  switchToStateSubmitting: (submissionData: TSubmissionData) => void;
  switchToStateSubmitted: (responseData: TResponseData) => void;
}

const useFormSubmissionState = <
  TRequestData = void,
  TResponseData = void,
  TSubmissionData = TRequestData
>(): useSubmissionStateReturns<
  TRequestData,
  TResponseData,
  TSubmissionData
> => {
  const [submissionState, setSubmissionState] = useState<
    SubmissionState<TRequestData, TResponseData, TSubmissionData>
  >({
    state: "initial",
  });

  const switchToStateInitial = useCallback(() => {
    setSubmissionState({
      state: "initial",
    });
  }, []);

  const switchToStateTBC = useCallback((requestData: TRequestData) => {
    setSubmissionState({
      state: "toBeConfirmed",
      requestData,
    });
  }, []);

  const switchToStateSubmitting = useCallback(
    (submissionData: TSubmissionData) => {
      setSubmissionState({
        state: "submitting",
        requestData: submissionData,
      });
    },
    []
  );

  const switchToStateSubmitted = useCallback((responseData: TResponseData) => {
    setSubmissionState({
      state: "submitted",
      responseData,
    });
  }, []);

  return {
    submissionState,
    switchToStateInitial,
    switchToStateTBC,
    switchToStateSubmitting,
    switchToStateSubmitted,
  };
};

export default useFormSubmissionState;
