// eslint-disable-next-line no-undef
const isTestMode = process.env.NODE_ENV === "test";

export const defaultTimeZone = isTestMode ? "Etc/UTC" : "Asia/Hong_Kong";
