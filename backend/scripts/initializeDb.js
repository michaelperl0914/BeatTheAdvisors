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

const createGame = async (week, home, away) => {
  const gameRef = db.collection('games').doc();
  await gameRef.set({
    apiGameId: 'abcdefg@123456',
    week,
    home,
    away,
    spread: 3,
    favorite: home
  });
  console.log(`Game created with ID: ${gameRef.id}`);
  return gameRef.id;
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
  const user1Id = await createUser('perlster', 'perlster11@yahoo.com');
  const user2Id = await createUser('john_doe', 'john.doe@gmail.com');

  const advisor1Id = await createAdvisor('advisorA', 'advisorA@gmail.com');
  const advisor2Id = await createAdvisor('advisorB', 'advisorB@gmail.com');

  const game1Id = await createGame(1, 'TeamA', 'TeamB');
  const game2Id = await createGame(2, 'TeamC', 'TeamD');

  await createPick(user1Id, game1Id, 'TeamA');
  await createPick(user1Id, game2Id, 'TeamD');
  await createPick(user2Id, game1Id, 'TeamB');
  await createPick(user2Id, game2Id, 'TeamC');

  await createAdvisorPick(advisor1Id, game1Id, 'TeamA');
  await createAdvisorPick(advisor2Id, game2Id, 'TeamD');
};

initializeDb().catch(console.error);
