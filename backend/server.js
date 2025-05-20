// Step 1: Import required modules
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const routes = require("./routes");

require("dotenv").config();

// Step 2: Initialize Express
const app = express();
connectDB();

// Step 3: Middleware setup
app.use(cors());
app.use(express.json());

// 👇 mount the route BEFORE app.listen
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("API is live");
});

// Step 5: Start server on fixed port (no .env yet)
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
