require("dotenv").config();
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
const axios = require("axios");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const apiKey = process.env.ODDS_API_KEY;

const db = admin.firestore();

const getGames = async () => {
  const url = `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey=${apiKey}&regions=us&markets=spreads&oddsFormat=american`;
  const response = await axios.get(url);
  return response.data;
};

const parseData = async (data) => {
  const games = [];

  data.forEach((game) => {
    try {
      let favorite = "";
      let spread = 0;
      let price = 0;

      const fanDuelMarket = game.bookmakers[0].markets[0];

      fanDuelMarket.outcomes.forEach((outcome) => {
        if (outcome.point < 0) {
          favorite = outcome.name;
          spread = outcome.point;
          price = outcome.price;
        }
      });

      // Convert the string date to a Firestore timestamp
      const weekTimestamp = admin.firestore.Timestamp.fromDate(
        new Date(game.commence_time)
      );

      const gameObj = {
        apiGameId: game.id,
        week: weekTimestamp,
        home: game.home_team,
        away: game.away_team,
        favorite,
        spread,
        price,
      };

      games.push(gameObj);
    } catch (error) {
      console.error(`Error parsing game with ID ${game.id}: ${error.message}`);
    }
  });

  return games;
};

const createGame = async (game) => {
  const gameRef = db.collection("games").doc();
  await gameRef.set(game);
  console.log(`Game created with ID: ${gameRef.id}`);
};

const clearGames = async () => {
  const gamesRef = db.collection("games");
  const snapshot = await gamesRef.get();

  if (snapshot.empty) {
    console.log("No matching documents found.");
    return;
  }

  snapshot.forEach((doc) => {
    gamesRef
      .doc(doc.id)
      .delete()
      .then(() => console.log(`Deleted game with ID: ${doc.id}`))
      .catch((error) => console.error(`Error deleting game: ${error}`));
  });
};

const refreshGames = async () => {
  try {
    console.log("Clearing old games from database...");
    await clearGames();

    console.log("Fetching new game data...");
    const rawData = await getGames();

    console.log("Parsing new game data...");
    const parsedGames = await parseData(rawData);

    console.log("Adding new games to database...");
    for (const game of parsedGames) {
      await createGame(game);
    }

    console.log("Database refreshed.");
  } catch (error) {
    console.error(`An error occurred during the refresh: ${error.message}`);
  }
};

refreshGames();
