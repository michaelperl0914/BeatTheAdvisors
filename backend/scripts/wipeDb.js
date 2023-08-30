const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json"); // Make sure the path is correct

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function deleteCollection(collectionPath, batchSize) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy("__name__").limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject);
  });
}

async function deleteQueryBatch(db, query, batchSize, resolve, reject) {
  const snapshot = await query.get();

  const numResults = snapshot.size;

  if (numResults === 0) {
    resolve();
    return;
  }

  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();

  process.nextTick(() => {
    deleteQueryBatch(db, query, batchSize, resolve, reject);
  });
}

async function wipeDb() {
  // Add your collection names here
  const collections = ["advisors"];

  for (const collection of collections) {
    console.log(`Deleting ${collection} collection`);
    await deleteCollection(collection, 50);
  }

  console.log("Finished deleting collections");
}

wipeDb().catch(console.error);
