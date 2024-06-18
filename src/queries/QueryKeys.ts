import { CommonOptionsRequest } from "../apis/CommonOptionsAPI";
import { UserFunctionMenuRequest } from "../apis/UserFunctionMenuAPI";

export const QueryKeyPrefixes = Object.freeze({
  commonOptions: "commonOptions",
  schemeList: "schemeList",
  userAccountDetails: "userAccountDetails",
  userFunctionMenu: "userFunctionMenu",
  uploadFile: "uploadFile",
});

/* istanbul ignore next */
const QueryKeys = Object.freeze({
  commonOptions: (req: CommonOptionsRequest) => [
    QueryKeyPrefixes.commonOptions,
    req,
  ],
  schemeList: (userId: string) => [QueryKeyPrefixes.schemeList, userId],
  userAccountDetails: (userId: string) => [
    QueryKeyPrefixes.userAccountDetails,
    userId,
  ],
  userFunctionMenu: (req: UserFunctionMenuRequest) => [
    QueryKeyPrefixes.userFunctionMenu,
    req,
  ],
});

// Assume no need to use the prefix for manipulating cache store, just write literal here
export const MutationKeys = Object.freeze({
  uploadFile: () => ["uploadFile"],
  forgotPasswordRequestOTP: () => ["forgotPasswordRequestOTP"],
  forgotPasswordResendOTP: () => ["forgotPasswordResendOTP"],
  forgotPasswordVerifyOTP: () => ["forgotPasswordVerifyOTP"],
  forgotPasswordResetPassword: () => ["forgotPasswordResetPassword"],
  deleteFile: () => ["deleteFile"],
  changePassword: () => ["changePassword"],
});

export default QueryKeys;
