let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;

export interface Plant {
  id: string;
  name: string;
  registered_at: Date;
  last_watered_at: Date;
  period: number;
}

export enum Stores {
  Plants = "plants",
}

export function initDb(): Promise<boolean> {
  return new Promise((resolve) => {
    request = indexedDB.open(Stores.Plants, version);

    request.onupgradeneeded = () => {
      db = request.result;
      if (!db.objectStoreNames.contains(Stores.Plants)) {
        console.log("request.onupgradeneeded - initDB");
        db.createObjectStore(Stores.Plants, { keyPath: "id" });
      }
    };

    request.onsuccess = () => {
      console.log("request.onsuccess - initDB", version);
      db = request.result;
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
    request = indexedDB.open(Stores.Plants, version);

    request.onsuccess = () => {
      console.log("request.onsuccess - addData", data);
      db = request.result;
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
    request = indexedDB.open(Stores.Plants, version);

    request.onsuccess = () => {
      console.log("request.onsuccess - getData");
      db = request.result;
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
    request = indexedDB.open(Stores.Plants, version);

    request.onsuccess = () => {
      console.log("request.onsuccess - deleteData", key);
      db = request.result;
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
    request = indexedDB.open(Stores.Plants, version);

    request.onsuccess = () => {
      console.log("request.onsuccess - updateData", data);
      db = request.result;
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
