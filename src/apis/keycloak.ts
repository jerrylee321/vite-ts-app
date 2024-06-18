import Keycloak, {
  KeycloakConfig,
  KeycloakInitOptions,
  KeycloakLogoutOptions,
  KeycloakRegisterOptions,
} from "keycloak-js";

import Config from "../Config";

const { url, realm, clientId, logoutRedirectPath } = Config.auth;

const config: KeycloakConfig = {
  url,
  realm,
  clientId,
};

export const keycloakInitOptions: KeycloakInitOptions = {
  // OAuth 2.0 PKCE with SHA256 encyption is used
  pkceMethod: "S256",
  // Disable check of SSO using iframe which may not be compatible with modern browser
  checkLoginIframe: false,
};

export const keycloakLogoutOptions: KeycloakLogoutOptions = {
  redirectUri: window.location.origin + logoutRedirectPath,
};
export const keycloakRegisterOptions: KeycloakRegisterOptions = {};

const keycloak = new Keycloak(config);

export default keycloak;
