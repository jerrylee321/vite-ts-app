import type { MockedKeycloak } from "../../../__mocks__/keycloak-js";
import keycloak from "../../apis/keycloak";

/**
 * See AuthProvider.test.tsx for an example to use this mock.
 *
 * tldr:
 * ```
 * import mockedKeycloak from "../utils/keycloak";
 * mockedKeycloak.mockAuthenticated('some-token')
 * mockedKeycloak.mockUnauthenticated()
 * ```
 *
 * It is faster to mock the Redux store to provide authentication state.
 * For how to do that, check `renderRouteWithProviders` or `renderWithProviders`.
 */
const mockedKeycloak = keycloak as MockedKeycloak;
export default mockedKeycloak;
export type { MockedKeycloak };
