import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { reset as resetVerify } from "../../redux/verifyAuth";
import AppRoutes from "../../routes/AppRoutes";

interface UseCancelForgotPasswordPropsValues {
  onClick: () => void;
  to: string;
}

export const useCancelForgotPasswordProps =
  (): UseCancelForgotPasswordPropsValues => {
    const dispatch = useDispatch();
    const handleCancel = useCallback(() => {
      dispatch(resetVerify());
    }, [dispatch]);

    return { onClick: handleCancel, to: AppRoutes.Login.path };
  };
