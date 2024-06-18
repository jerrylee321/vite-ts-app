import { getConfigProxy } from "./utils/config";

export interface ConfigHCaptcha {
  channelcode: string;
  endpoint: string;
  sitekey: string;
  apihost: string;
  assethost: string;
  imghost: string;
  reportapi: string;
  promptLogin: boolean;
  promptRegister: boolean;
  promptForgotPassword: boolean;
  promptFirstTimeLogin: boolean;
}

export interface IConfig {
  logConfigAtLaunch: string;
  logQueryError: string;
  showVersionNumber: string;
  uamApiBaseUrl: string;
  uamApiClientId: string;
  fileUploadApiBaseUrl?: string;
  commonOptionsApiBaseUrl: string;
  auth: {
    url: string;
    realm: string;
    clientId: string;
    logoutRedirectPath: string;
  };
  commonAuth: {
    url: string;
    ou: "MPFA" | "Trustees" | "ORSO";
  };
  biReport: {
    url: string;
  };
  updateTokenMinValiditySeconds: string;
  idleWarningSeconds: string;
  idleLogoutSeconds: string;
  hcaptcha: ConfigHCaptcha | undefined;
}

export const DefaultCommonConfig: IConfig = Object.freeze({
  logConfigAtLaunch: "false",
  logQueryError: "false",
  showVersionNumber: "false",
  uamApiBaseUrl: "/",
  uamApiClientId: "",
  commonOptionsApiBaseUrl: "/",
  auth: {
    url: "",
    realm: "",
    clientId: "",
    logoutRedirectPath: "/",
  },
  commonAuth: {
    url: "",
    ou: "MPFA" as const,
  },
  biReport: {
    url: "#",
  },
  updateTokenMinValiditySeconds: "60",
  idleWarningSeconds: "300", // 5 minutes
  idleLogoutSeconds: "900", // 15 minutes
  hcaptcha: undefined,
});

export const DefaultConfig: IConfig = Object.freeze({
  ...DefaultCommonConfig,
  fileUploadApiBaseUrl: "/",
});

const Config: IConfig = getConfigProxy(DefaultConfig);

export default Config;
