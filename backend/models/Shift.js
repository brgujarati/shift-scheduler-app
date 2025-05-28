const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema(
  {
    shiftId: {
      type: String,
      required: true,
      unique: true, // Format: MO-250520-W12
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    siteAddress: {
      type: String,
      required: true,
      trim: true,
    },
    nearestStation: {
      type: String,
      required: true,
      trim: true,
      // ✅ Admin CAN write "N/A"
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
      trim: true,
    },
    endTime: {
      type: String,
      required: true,
      trim: true,
    },
    totalHours: {
      type: Number,
      required: true,
      min: 0, // Calculated in backend: end - start
    },
    createdBy: {
      type: String,
      required: true, // ✅ Admin's userCode
      trim: true,
    },
    team: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // ✅ Store only MongoDB ObjectIds
        required: true,
      },
    ],
    instruction: {
      type: String,
      required: true,
      trim: true,
      // ✅ Admin CAN write "N/A"
    },
  },
  {
    timestamps: true, // ✅ Adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("Shift", shiftSchema);
