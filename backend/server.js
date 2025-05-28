// Step 1: Import required modules
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const routes = require("./routes");
const cookieParser = require("cookie-parser");

require("dotenv").config();

// Step 2: Initialize Express
const app = express();
connectDB();

// Step 3: Middleware setup
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true, // ✅ allow cookies to be sent
  })
);
app.use(express.json());

app.use(cookieParser());

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
