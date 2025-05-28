const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const cloudinary = require("../config/cloudinary");
const { extractPublicId } = require("../utils/cloudinaryUtils");
require("dotenv").config();

// ✅ GET /api/users/profile
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "role name email phone profilePicUrl address1 address2 userCode county country createdAt"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      role: user.role, // 👈 frontend can use this to render dashboard
      user, // 👈 frontend uses this for profile details
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

// ✅ PUT /api/users/profile
exports.updateMyProfile = async (req, res) => {
  try {
    const updates = req.body;

    // ✅ Only allow specific fields
    const allowedFields = [
      "phone",
      "address1",
      "address2",
      "county",
      "country",
    ];

    const sanitizedData = {};
    for (let key of allowedFields) {
      if (updates.hasOwnProperty(key)) {
        sanitizedData[key] = updates[key];
      }
    }

    // ❌ Reject if trying to update disallowed fields
    const isTryingToInject = Object.keys(updates).some(
      (field) => !allowedFields.includes(field)
    );
    if (isTryingToInject) {
      return res
        .status(400)
        .json({ message: "Invalid fields in update request" });
    }

    // ✅ Perform update
    await User.findByIdAndUpdate(req.user.id, { $set: sanitizedData });

    res.status(200).json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Update profile error:", error.message);
    res.status(500).json({ message: "Server error while updating profile" });
  }
};

// ✅ POST /api/users/profile-photo
exports.uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const imageUrl = req.file.path;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profilePicUrl = imageUrl;
    await user.save();

    res.status(200).json({
      message: "Upload successful",
    });
  } catch (err) {
    console.error("Upload Error:", err.message);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

// ✅ GET /api/users/employees — Admin-only
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }).select(
      "name email phone address1 address2 userCode profilePicUrl createdAt"
    );

    res.status(200).json({ employees });
  } catch (err) {
    console.error("Error fetching employees:", err.message);
    res.status(500).json({ message: "Failed to fetch employees" });
  }
};
