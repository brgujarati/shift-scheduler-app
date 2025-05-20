const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

// ✅ Register Route
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Create new user (role left empty)
    const newUser = new User({
      name,
      email,
      passwordHash,
      role: "",
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Login Route
exports.loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // ✅ Validate role
    if (!["admin", "employee"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // ✅ Assign role and userCode if missing
    if (user.role === "") {
      user.role = role;

      if (!user.userCode) {
        const prefix = role === "admin" ? "AD" : "EMP";
        user.userCode = `${prefix}-${user._id
          .toString()
          .slice(-4)
          .toUpperCase()}`;
      }

      await user.save();
    } else if (user.role !== role) {
      return res.status(400).json({ message: "Role mismatch. Contact admin." });
    }

    // ✅ Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      token,
      message: "Login successful",
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error during login" });
  }
};

// ✅ Forgot Password Route
exports.forgotPassword = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Match user by name + email
    const user = await User.findOne({ email, name });
    if (!user) {
      return res.status(400).json({ message: "Incorrect name or email" });
    }

    // 2.1 Prevent reusing the old password
    const isSame = await bcrypt.compare(password, user.passwordHash);
    if (isSame) {
      return res
        .status(400)
        .json({ message: "New password cannot be the same as the old one" });
    }

    // 2.2 Hash the new password
    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(password, salt);

    // 3. Update the user's password
    user.passwordHash = newPasswordHash;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("❌ Forgot password error:", err.message);
    res.status(500).json({ message: "Server error during password reset" });
  }
};
