import type { OrderHistory } from '@/types';

const initStorage = <T extends keyof StorageKey>(key: T, storage: Storage) => {
  const storageKey = `${key}`;

  const get = (): StorageKey[T] | null => {
    const value = storage.getItem(storageKey);
    if (!value) return null;

    return JSON.parse(value) as StorageKey[T];
  };

  const set = (value: StorageKey[T] | null) => {
    if (value == undefined || value == null) {
      return storage.removeItem(storageKey);
    }

    const stringifiedValue = JSON.stringify(value);

    storage.setItem(storageKey, stringifiedValue);
  };

  return { get, set };
};

export const authSessionStorage = initStorage('authToken', sessionStorage);
export const orderHistorySessionStorage = initStorage('orderHistory', sessionStorage);

interface AuthToken {
  token: string;
  id: string;
}

interface StorageKey {
  authToken?: AuthToken;
  orderHistory?: OrderHistory;
}
