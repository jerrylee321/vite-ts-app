const appVersion = import.meta.env.VITE_APP_VERSION_NUM;

const Environment = {
  appVersion: appVersion === "0.0.0.0" ? "" : appVersion,
};
export default Environment;
