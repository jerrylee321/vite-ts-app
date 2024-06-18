type ConfigDictionary = Record<string | symbol, any>;

/* istanbul ignore next */
export const getAppConfig = (): ConfigDictionary => {
  // `window` might not be available in tools run in node.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (typeof window === "undefined") {
    return {};
  }
  return JSON.parse(window.sessionStorage.getItem("APP_CONFIG") ?? "{}");
};

/* istanbul ignore next */
export const loadAppConfig = async (
  path: string
): Promise<ConfigDictionary> => {
  const res = await fetch(path);
  const json = await res.json();
  window.sessionStorage.setItem("APP_CONFIG", JSON.stringify(json));
  return json;
};

export const getConfigProxy = <T extends ConfigDictionary>(
  defaultConfig: T
): T => {
  return new Proxy(
    // If defaultConfig is an freezed object, proxy will complain if the
    // returned property value differs from the target.
    // Copy the defaultConfig here instead. See Proxy invariants.
    { ...defaultConfig },
    {
      get(target, prop) {
        const config = {
          ...target,
          ...getAppConfig(),
        };
        return config[prop];
      },
    }
  );
};
