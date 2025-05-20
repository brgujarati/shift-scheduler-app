// /models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces
    },
    email: {
      type: String,
      required: true,
      unique: true, // No two users can have same email
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "", // Empty during signup, updated later
      enum: ["", "admin", "employee"], // Optional: restrict to allowed roles
    },

    userCode: {
      type: String,
      default: "", // will be generated once role is assigned
    },

    // ✅ Optional Profile Fields
    phone: {
      type: String,
      default: "",
    },
    address1: {
      type: String,
      default: "",
    },
    address2: {
      type: String,
      default: "",
    },
    county: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    // ✅ Cloudinary Profile Picture
    profilePicUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // Auto-adds createdAt and updatedAt
  }
);

// Export the model to use in register, login, etc.
const User = mongoose.model("User", userSchema);
module.exports = User;
