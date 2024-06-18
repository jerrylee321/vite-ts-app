import React from "react";

interface ReactLazyWithRetriesConfig {
  maxRetries?: number;
  retryIntervalCoeffMs?: number;
  retryIntervalExponentialBase?: number;
}

const defaultConfig: Required<ReactLazyWithRetriesConfig> = Object.freeze({
  maxRetries: 5,
  retryIntervalCoeffMs: 100,
  retryIntervalExponentialBase: 2,
});

const ReactLazyWithRetries = <T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  config: ReactLazyWithRetriesConfig = defaultConfig
): React.LazyExoticComponent<T> => {
  const {
    maxRetries = defaultConfig.maxRetries,
    retryIntervalCoeffMs = defaultConfig.retryIntervalCoeffMs,
    retryIntervalExponentialBase = defaultConfig.retryIntervalExponentialBase,
  } = config;

  const _factory = async () => {
    try {
      return await factory();
    } catch (e: unknown) {
      console.error(e);
      // retry with exponential backoff
      for (let i = 0; i < maxRetries; ++i) {
        await new Promise((res) => {
          // eslint-disable-next-line no-promise-executor-return
          return setTimeout(
            res,
            retryIntervalCoeffMs * retryIntervalExponentialBase ** i
          );
        });

        try {
          return await factory();
        } catch (err: unknown) {
          console.error(err);
        }
      }
      throw e;
    }
  };

  return React.lazy(_factory);
};

export default ReactLazyWithRetries;
