import { useEffect, useMemo, useReducer, useState } from "react";
import { useDebounce } from "react-use";

import {
  AuthPasswordRequirementHintMessage,
  AuthPasswordValidatorSchema,
  initialResult,
  mapMessagesToResult,
  passwordIsValidIgnoreStrength,
  ValidatePasswordResult,
} from "../models/CommonAuthentication";
import { validateFormMultipleErrors } from "../utils/formValidation";

interface UsePasswordValidatorValues {
  result: ValidatePasswordResult;
  isValidating: boolean;
  isValid: boolean | undefined;
  error: unknown;
}

interface UsePasswordValidatorOptions {
  debounce?: number;
  username?: string;
  validateAsync?: (payload: {
    password: string;
  }) => Promise<ValidatePasswordResult>;
  determineResultFn?: (result: ValidatePasswordResult) => boolean;
}

interface PasswordState {
  password: string;
  validationResult: ValidatePasswordResult;
}

type PasswordStateAction =
  | {
      type: "change";
      password: string;
      validationResult: Partial<ValidatePasswordResult>;
    }
  | {
      type: "validate";
      password: string;
      validationResult: ValidatePasswordResult;
    };

export const passwordStateReducer = (
  state: PasswordState,
  action: PasswordStateAction
): PasswordState => {
  switch (action.type) {
    case "change": {
      // For checks that can only be performed remotely, we keep the previous
      // state, and wait for remote result that is resolved later.
      const validationResult = {
        ...state.validationResult,
        ...action.validationResult,
      };
      return {
        password: action.password,
        validationResult,
      };
    }
    case "validate": {
      if (state.password !== action.password) {
        // By the time the result has arrived, the password has already been
        // changed.
        return state;
      }

      return {
        password: state.password,
        validationResult: action.validationResult,
      };
    }
    /* istanbul ignore next */
    default:
      throw new Error("unexpected action type");
  }
};

const usePasswordValidator = (
  password: string,
  options: UsePasswordValidatorOptions = {}
): UsePasswordValidatorValues => {
  const {
    debounce = 1000,
    username,
    validateAsync,
    determineResultFn = passwordIsValidIgnoreStrength,
  } = options;
  // NOTE: Do not use isLoading, error from useMutation hook because
  // the timing these state changes are different.
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const [passwordState, passwordDispatch] = useReducer(passwordStateReducer, {
    password,
    validationResult: initialResult,
  });

  useEffect(() => {
    const { messages } = validateFormMultipleErrors(
      AuthPasswordValidatorSchema,
      { password, username }
    );

    // NOTE: When validateAsync is provided, we do not check username locally
    // because the implementation is likely to be different on backend and
    // frontend. If validateAsync does not exists and a username is not provided,
    // the default for `username` check is always true.
    const validationResult = {
      ...(!validateAsync
        ? {
            username: !username,
          }
        : null),
      ...mapMessagesToResult(
        (messages.password ?? []) as AuthPasswordRequirementHintMessage[],
        { includeUsername: !!username && !validateAsync }
      ),
    };

    // The validation result here contains partial result. The checks that are
    // omitted are those that are deferred to the backend.
    passwordDispatch({
      type: "change",
      password,
      validationResult,
    });
  }, [password, username, validateAsync]);

  const [isReady, _] = useDebounce(
    () => {
      if (!validateAsync) {
        // Remote password validation not supported
        return;
      }

      setLoading(true);
      validateAsync({ password })
        .then((res) => {
          passwordDispatch({
            type: "validate",
            password,
            validationResult: res,
          });
          setError(null);
        })
        .catch(setError)
        .finally(() => {
          setLoading(false);
        });
    },
    debounce,
    [password, validateAsync]
  );

  const isValid = useMemo(
    () => determineResultFn(passwordState.validationResult),
    [determineResultFn, passwordState.validationResult]
  );

  const isValidating = !!validateAsync && (isLoading || isReady() === false);

  return {
    result: passwordState.validationResult,
    isValidating,
    error,
    isValid: isValidating || error ? undefined : isValid,
  };
};

export default usePasswordValidator;
