const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const db = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const advisorRoutes = require("./routes/advisorRoutes");

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Test Endpoint
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// Routes
app.use("/users", userRoutes);
app.use("/advisors", advisorRoutes);


module.exports = app;