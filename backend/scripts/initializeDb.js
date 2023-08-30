const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const createUser = async (username, email) => {
  const userRef = db.collection('users').doc();
  await userRef.set({
    username,
    email,
    record: { wins: 0, losses: 0, ties: 0 },
    picks: []
  });
  console.log(`User created with ID: ${userRef.id}`);
  return userRef.id;
};

const createAdvisor = async (username, email) => {
  const advisorRef = db.collection('advisors').doc();
  await advisorRef.set({
    username,
    email,
    record: { wins: 0, losses: 0, ties: 0 },
    picks: []
  });
  console.log(`Advisor created with ID: ${advisorRef.id}`);
  return advisorRef.id;
};


const createPick = async (userId, gameId, selection) => {
  const pickRef = db.collection('picks').doc();
  await pickRef.set({
    userId,
    gameId,
    selection
  });
  console.log(`Pick created with ID: ${pickRef.id}`);

  // Update user's picks array
  const userRef = db.collection('users').doc(userId);
  await userRef.update({
    picks: admin.firestore.FieldValue.arrayUnion(pickRef.id)
  });
};

const createAdvisorPick = async (advisorId, gameId, selection) => {
  const pickRef = db.collection('picks').doc();
  await pickRef.set({
    userId: advisorId,
    gameId,
    selection
  });
  console.log(`Advisor pick created with ID: ${pickRef.id}`);

  // Update advisor's picks array
  const advisorRef = db.collection('advisors').doc(advisorId);
  await advisorRef.update({
    picks: admin.firestore.FieldValue.arrayUnion(pickRef.id)
  });
};

const initializeDb = async () => {
};

initializeDb().catch(console.error);
