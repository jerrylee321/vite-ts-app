import { ReactElement, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import useCaptcha, {
  CaptchaResult,
} from "frontend-common/src/hooks/useCaptcha";

import { hasErrorCode } from "../../apis/models/APIError";
import { AuthPasswordFormModel } from "../../components/AuthPasswordForm/AuthPasswordFormModel";
import Config from "../../Config";
import usePasswordValidator from "../../hooks/usePasswordValidator";
import useShowErrors from "../../hooks/useShowErrors";
import { useAuthQueries } from "../../providers/AuthProvider";
import { useErrorAlert } from "../../providers/ErrorAlertProvider";
import { RootState } from "../../redux";
import {
  initialize as initializeVerifyAuth,
  reset as resetVerifyAuth,
} from "../../redux/verifyAuth";
import AppRoutes from "../../routes/AppRoutes";
import { fallback } from "../../types/Nullable";

import { ForgotPasswordEmailFormModel } from "./ForgotPasswordEmailFormModel";
import ForgotPasswordEmailView from "./ForgotPasswordEmailView";
import { ForgotPasswordOTPFormModel } from "./ForgotPasswordOTPFormModel";
import ForgotPasswordOTPView from "./ForgotPasswordOTPView";
import ForgotPasswordResetPasswordView from "./ForgotPasswordResetPasswordView";
import ForgotPasswordSuccessView from "./ForgotPasswordSuccessView";
import { ForgotPasswordScreenCommonProps } from "./models";

const ForgotPasswordOTPViewResendInterval = 60;

// eslint-disable-next-line complexity
const ForgotPasswordScreen = (
  props: ForgotPasswordScreenCommonProps
): ReactElement => {
  const { variant } = props;
  const { stage = "initial" } = useParams();
  const [searchParams, _setSearchParams] = useSearchParams();
  const location = useLocation();
  const email = fallback(location.state?.email, "");
  const { verificationCodeId = "" } =
    useSelector((state: RootState) => {
      return state.verifyAuth;
    }) ?? {};
  const {
    useRequestForgotPasswordOTP,
    useResendForgotPasswordOTP,
    useVerifyForgotPasswordOTP,
    useResetForgotPassword,
  } = useAuthQueries();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const renderRoute = useCallback(
    (...args: Parameters<typeof AppRoutes.ForgotPassword.render>) => {
      if (args[0] === "initial" && variant === "forced") {
        return AppRoutes.Home.path;
      }
      const renderFn =
        variant === "forgot"
          ? AppRoutes.ForgotPassword.render
          : AppRoutes.LoginChangePassword.render;
      return renderFn(...args);
    },
    [variant]
  );

  const navigateStage = useCallback(
    (nextStage: "initial" | "verify" | "password" | "success", state?: any) => {
      navigate(renderRoute(nextStage), { state });
    },
    [navigate, renderRoute]
  );

  const {
    ref: captchaRef,
    present: presentCaptcha,
    reset: resetCaptcha,
    handleLoad: handleCaptchaLoad,
  } = useCaptcha();

  const [lastSendTime, setLastSendTime] = useState(new Date());
  const nextSendUntil = useMemo(
    () =>
      new Date(
        lastSendTime.getTime() + ForgotPasswordOTPViewResendInterval * 1000
      ),
    [lastSendTime]
  );

  // NOTE: Using isLoading from resendOTP mutation will cause the last
  // send time and the loading state to be set at different part, so the user
  // would see inconsistent UI state.
  const [isResendingOTP, setIsResendingOTP] = useState(false);
  const [isRequestingOTP, setIsRequestingOTP] = useState(false);
  const [requestOTPError, setRequestOTPError] = useState<unknown>(null);

  const { mutateAsync: requestOTP } = useRequestForgotPasswordOTP();
  const { mutateAsync: resendOTP } = useResendForgotPasswordOTP();
  const {
    mutateAsync: verifyOTP,
    isLoading: isVerifyingOTP,
    error: verifyOTPError,
  } = useVerifyForgotPasswordOTP();
  const { mutateAsync: resetPassword, isLoading: isResettingPassword } =
    useResetForgotPassword();
  const [validatePassword, setValidatePassword] = useState("");
  const {
    result: passwordValidationResult,
    isValidating: isPasswordValidating,
    isValid: isPasswordValid,
    error: passwordValidationError,
  } = usePasswordValidator(validatePassword, { username: email });

  const { show: showError } = useErrorAlert();
  useShowErrors([passwordValidationError]);

  const promptCaptcha =
    (variant === "forced"
      ? Config.hcaptcha?.promptFirstTimeLogin
      : Config.hcaptcha?.promptForgotPassword) ?? false;

  const handleSubmitEmail = useCallback(
    async ({ email: inputEmail }: ForgotPasswordEmailFormModel) => {
      let captchaResult: CaptchaResult | null = null;

      if (promptCaptcha) {
        try {
          captchaResult = await presentCaptcha();

          if (!captchaResult) {
            /* user skipped */
            setIsRequestingOTP(false);
            return;
          }
        } catch (err: unknown) {
          setIsRequestingOTP(false);
          setRequestOTPError(err);
          return;
        }
      } else {
        /* istanbul ignore next */
        console.warn(
          "HCaptcha is not available because it is not configured. We will continue with login flow without a captcha response."
        );
      }

      try {
        const { accessToken, verCodeId } = await requestOTP({
          email: inputEmail,
          ...(captchaResult
            ? {
                captchaResponse: captchaResult.response,
                captchaChannelCode: Config.hcaptcha?.channelcode,
              }
            : null),
        });

        dispatch(
          initializeVerifyAuth({
            verificationToken: accessToken,
            verificationCodeId: verCodeId,
          })
        );

        setLastSendTime(new Date());

        navigateStage("verify", { email: inputEmail });
      } catch (err: unknown) {
        console.error(
          "Error occurred submitting email for forgot password:",
          err
        );
        setRequestOTPError(err);

        resetCaptcha();
      } finally {
        setIsRequestingOTP(false);
      }
    },
    [
      dispatch,
      navigateStage,
      presentCaptcha,
      promptCaptcha,
      requestOTP,
      resetCaptcha,
    ]
  );

  const handleVerify = useCallback(
    ({ otp }: ForgotPasswordOTPFormModel) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (async () => {
        try {
          await verifyOTP({
            verificationCodeId,
            otp,
            email,
          });
          navigateStage("password", { email });
        } catch (err: unknown) {
          console.error(
            "Error occurred submitting email for forgot password:",
            err
          );
        }
      })();
    },
    [email, navigateStage, verificationCodeId, verifyOTP]
  );

  const handleResend = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      try {
        setIsResendingOTP(true);
        await resendOTP({ verificationCodeId });
        setLastSendTime(new Date());
      } catch (err: unknown) {
        showError(err);
        console.error(
          "Error occurred submitting email for forgot password:",
          err
        );

        if (hasErrorCode(err, "OTP1012")) {
          // The backend advises the user to try again after 60 seconds.
          setLastSendTime(new Date());
        }
      } finally {
        setIsResendingOTP(false);
      }
    })();
  }, [verificationCodeId, resendOTP, showError]);

  const handleResetPassword = useCallback(
    ({ newPassword }: AuthPasswordFormModel) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (async () => {
        try {
          await resetPassword({ verificationCodeId, email, newPassword });

          dispatch(resetVerifyAuth());
          navigateStage("success");
        } catch (err: unknown) {
          showError(err);
          console.error(
            "Error occurred submitting email for forgot password:",
            err
          );
        }
      })();
    },
    [
      verificationCodeId,
      email,
      resetPassword,
      dispatch,
      navigateStage,
      showError,
    ]
  );

  const satisfiesPrerequisites = useMemo(() => {
    switch (stage) {
      case "initial":
        return variant === "forgot";
      case "verify":
      case "password":
        return verificationCodeId !== "" && (variant === "forced" || !!email);
      case "success":
        return true;
      default:
        return false;
    }
  }, [email, stage, variant, verificationCodeId]);

  if (!satisfiesPrerequisites) {
    return <Navigate to={renderRoute("initial")} />;
  }

  switch (stage) {
    case "initial":
      return (
        <>
          {promptCaptcha && Config.hcaptcha ? (
            <HCaptcha
              ref={captchaRef}
              size="invisible"
              sitekey={Config.hcaptcha.sitekey}
              // @ts-expect-error
              endpoint={Config.hcaptcha.endpoint}
              apihost={Config.hcaptcha.apihost}
              assethost={Config.hcaptcha.assethost}
              imghost={Config.hcaptcha.imghost}
              reportapi={Config.hcaptcha.reportapi}
              onLoad={handleCaptchaLoad}
            />
          ) : null}
          <ForgotPasswordEmailView
            {...props}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            handleSubmit={handleSubmitEmail}
            isLoading={isRequestingOTP}
            error={requestOTPError}
            prefillLoginName={searchParams.get("loginname") ?? ""}
          />
        </>
      );
    case "verify":
      return (
        <ForgotPasswordOTPView
          {...props}
          onSubmit={handleVerify}
          onResend={handleResend}
          isLoading={isVerifyingOTP}
          isResending={isResendingOTP}
          error={verifyOTPError}
          nextSendUntil={nextSendUntil}
        />
      );
    case "password":
      return (
        <ForgotPasswordResetPasswordView
          {...props}
          onSubmit={handleResetPassword}
          isLoading={isResettingPassword}
          email={email}
          passwordValidationResult={passwordValidationResult}
          isPasswordValidating={isPasswordValidating}
          isPasswordValid={fallback(isPasswordValid, false)}
          onPasswordValidate={setValidatePassword}
        />
      );
    case "success":
      return <ForgotPasswordSuccessView {...props} />;
    /* istanbul ignore next */
    default:
      return <Navigate to={renderRoute("initial")} />;
  }
};

export default ForgotPasswordScreen;
