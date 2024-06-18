import { Store } from "redux";
import { KEY_PREFIX as ReduxPersistKeyPrefix, Persistor } from "redux-persist";

import { INVALIDATE } from "./constants";

interface SubscriberOptions {
  keys?: string[];
}

export const subscribeStorageEvent: (
  store: Store,
  persistor: Persistor,
  options?: SubscriberOptions
) => void = (store, persistor, options) => {
  const keys = options?.keys?.map((k) => `${ReduxPersistKeyPrefix}${k}`);

  // If the local storage is updated with the particular keys, the store
  // is sent the INVALIDATE action, which cause stores to clear the _persist
  // key. Calling persistor.persist afterwards allow the store to rehydrate.
  window.addEventListener("storage", (event: StorageEvent) => {
    if (keys && !keys.some((k) => event.key === k)) {
      return;
    }

    store.dispatch({
      type: INVALIDATE,
      key: event.key?.substring(ReduxPersistKeyPrefix.length),
    });
    persistor.persist();
  });
};
