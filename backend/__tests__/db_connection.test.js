const db = require("../src/config/db");
test("test_db_connection", async () => {
  const users = [];
  const snapshot = await db.collection("users").get();
  snapshot.forEach((doc) => {
    users.push(doc.data());
  });
  expect(users.length).toBeGreaterThan(0);
});
