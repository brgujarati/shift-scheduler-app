const mongoose = require("mongoose");
require("dotenv").config(); // ✅ This is important!

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error, "erroe mongo");
    console.log("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
