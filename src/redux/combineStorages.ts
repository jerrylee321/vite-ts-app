import type { Storage } from "redux-persist";

/**
 * The CombinedStorage is used for the case where multiple storages can
 * be used to provide a key value. If a key value is not available in the first
 * storage that it tries, it will fallback to the next.
 */
class CombinedStorage {
  private storages: Storage[];
  constructor(storages: Storage[]) {
    this.storages = storages;
  }

  async getItem(key: string, ...args: Array<any>): Promise<string | null> {
    for (const storage of this.storages) {
      const result = await storage.getItem(key, ...args);
      if (result != null) {
        return result;
      }
    }
    return null;
  }

  async setItem(key: string, value: any, ...args: Array<any>): Promise<void> {
    for (const storage of this.storages) {
      storage.setItem(key, value, ...args);
    }
  }

  async removeItem(key: string, ...args: Array<any>): Promise<void> {
    for (const storage of this.storages) {
      storage.removeItem(key, ...args);
    }
  }
}

export const combineStorages = (storages: Storage[]): Storage => {
  return new CombinedStorage(storages);
};

export default combineStorages;
