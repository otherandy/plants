let version = 1;

export enum Stores {
  Plants = "plants",
}

export function initDb(): Promise<boolean> {
  return new Promise((resolve) => {
    const request = indexedDB.open(Stores.Plants, version);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(Stores.Plants)) {
        db.createObjectStore(Stores.Plants, { keyPath: "id" });
      }
    };

    request.onsuccess = () => {
      const db = request.result;
      version = db.version;
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
}

export function addData<T>(
  storeName: Stores,
  data: T,
): Promise<T | string | null> {
  return new Promise((resolve) => {
    const request = indexedDB.open(Stores.Plants, version);

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      store.add(data);
      resolve(data);
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) resolve(error);
      else resolve("Unknown error");
    };
  });
}

export function getData<T>(storeName: Stores): Promise<T[]> {
  return new Promise((resolve) => {
    const request = indexedDB.open(Stores.Plants, version);

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const res = store.getAll();
      res.onsuccess = () => {
        resolve(res.result);
      };
    };
  });
}

export function deleteData(storeName: Stores, key: string): Promise<boolean> {
  return new Promise((resolve) => {
    const request = indexedDB.open(Stores.Plants, version);

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const res = store.delete(key);

      res.onsuccess = () => {
        resolve(true);
      };

      res.onerror = () => {
        resolve(false);
      };
    };
  });
}

export function updateData<T>(
  storeName: Stores,
  data: T,
): Promise<T | string | null> {
  return new Promise((resolve) => {
    const request = indexedDB.open(Stores.Plants, version);

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      store.put(data);
      resolve(data);
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) resolve(error);
      else resolve("Unknown error");
    };
  });
}
