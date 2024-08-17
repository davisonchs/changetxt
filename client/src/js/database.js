import { openDB } from 'idb';

const initdb = async () =>
  openDB('changetxt', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('changetxt')) {
        console.log('changetxt database already exists');
        return;
      }
      db.createObjectStore('changetxt', { keyPath: 'id', autoIncrement: true });
      console.log('changetxt database created');
    },
  });

// Export a function we will use to POST to the database.
export const putDb = async (content) => {
  // Create a connection to the database and version we want to use.
  const contactDb = await openDB('changetxt', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction('changetxt', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('changetxt');

  // Use the .put() method on the store and pass in the content.
  const request = store.put({ id: 1, content });

  // Get confirmation of the request.
  const result = await request;
  console.log('Data saved to the database', result);
};

// Export a function we will use to GET from the database.
export const getDb = async () => {
  // Create a connection to the database and version we want to use.
  const contactDb = await openDB('changetxt', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction('changetxt', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('changetxt');

  // Use the .get() method to get the data from the database.
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;
  return result?.content;
};

// Start the database.
initdb();
