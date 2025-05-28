const Shift = require("../models/Shift");
const User = require("../models/User");
const moment = require("moment");

/////////////////////One ///////////////////////////////
exports.createShift = async (req, res) => {
  try {
    // ✅ Step 1: Destructure incoming data
    const {
      clientName,
      siteAddress,
      nearestStation,
      date,
      startTime,
      endTime,
      instruction,
      team, // array of employee names or IDs
    } = req.body;

    // ✅ Step 2: Validate basic required fields (skip if using validator middleware)
    if (
      !clientName ||
      !siteAddress ||
      !date ||
      !startTime ||
      !endTime ||
      !instruction ||
      !team
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // ✅ Step 3: Generate shiftId (e.g., MO-250520-W12)
    const getClientInitials = (name) => {
      const words = name.trim().split(" ");
      const initials = words[0][0] + (words[1] ? words[1][0] : "X"); // fallback if single word
      return initials.toUpperCase();
    };

    const moment = require("moment");

    const generateShiftId = () => {
      const now = moment(); // You can also pass in a specific Date if needed
      return `S-${now.format("YYMMDD-HHmm")}`;
    };

    const shiftId = generateShiftId();

    // ✅ Step 4: Calculate totalHours
    const start = moment(startTime, "HH:mm");
    const end = moment(endTime, "HH:mm");

    let totalHours = moment.duration(end.diff(start)).asHours();

    if (totalHours === 0) {
      return res.status(400).json({
        message: "Start time and end time cannot be the same",
      });
    }

    if (totalHours < 0) {
      totalHours += 24;
    }

    // ✅ Step 5: Get admin's userCode from token user ID
    const adminUser = await User.findById(req.user.id).select("userCode");
    if (!adminUser) {
      return res.status(401).json({ message: "Admin user not found" });
    }

    // ✅ Step 6: Convert team names or userCodes into ObjectIds
    const employeeDocs = await User.find({
      _id: { $in: team },
      role: "employee",
    }).select("_id");

    if (employeeDocs.length !== team.length) {
      return res.status(400).json({ message: "Some employee IDs are invalid" });
    }

    // ✅ Step 7: Create and save the shift
    const newShift = new Shift({
      shiftId,
      clientName,
      siteAddress,
      nearestStation,
      date,
      startTime,
      endTime,
      totalHours,
      createdBy: adminUser.userCode,
      team: employeeDocs.map((emp) => emp._id),
      instruction,
    });

    await newShift.save();

    res.status(201).json({
      message: "Shift created successfully",
      shiftId: newShift.shiftId,
    });
  } catch (err) {
    console.error("Create Shift Error:", err);
    res.status(500).json({ message: "Server error while creating shift" });
  }
};

/////////////////////Two ///////////////////////////////
// 🔹 GET /api/shifts (V1 — Admin only, limited fields)
exports.getAllShifts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Only admin can view all shifts." });
    }

    const shifts = await Shift.find()
      .select(
        "shiftId clientName siteAddress nearestStation date startTime endTime instruction team"
      )
      .sort({ date: -1 });

    res.status(200).json({ shifts });
  } catch (err) {
    console.error("Error fetching shifts:", err.message);
    res.status(500).json({ message: "Server error fetching shifts" });
  }
};

/////////////////////Three ///////////////////////////////
exports.updateShift = async (req, res) => {
  try {
    const shiftId = req.params.id;
    const shift = await Shift.findById(shiftId);

    if (!shift) return res.status(404).json({ message: "Shift not found" });

    const user = await User.findById(req.user.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can update shifts" });
    }

    // ✅ Only update allowed fields
    const allowedFields = [
      "clientName",
      "siteAddress",
      "nearestStation",
      "date",
      "startTime",
      "endTime",
      "instruction",
      "team",
    ];
    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // ✅ Time validation (only if both are present in update)
    if (updates.startTime && updates.endTime) {
      const start = moment(updates.startTime, "HH:mm");
      const end = moment(updates.endTime, "HH:mm");

      let totalHours = moment.duration(end.diff(start)).asHours();

      if (totalHours === 0) {
        return res.status(400).json({
          message: "Start time and end time cannot be the same",
        });
      }

      if (totalHours < 0) {
        totalHours += 24;
      }

      updates.totalHours = totalHours;
    }

    await Shift.findByIdAndUpdate(shiftId, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ message: "Shift updated successfully" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Failed to update shift" });
  }
};

/////////////////////Four ///////////////////////////////
// DELETE /api/shifts/:id
exports.deleteShift = async (req, res) => {
  try {
    const shiftId = req.params.id;

    // Optional: Only admins can delete
    const user = await User.findById(req.user.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can update shifts" });
    }

    const deleted = await Shift.findByIdAndDelete(shiftId);

    if (!deleted) {
      return res.status(404).json({ message: "Shift not found" });
    }

    res.status(200).json({ message: "Shift deleted successfully" });
  } catch (err) {
    console.error("Delete Shift Error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/shifts/employee/:id
exports.getShiftsByEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;

    // Validate that the requester has access (admin or self)
    const user = await User.findById(req.user.id);
    // console.log(user.role);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // If the user is an employee, only allow them to view their own shifts
    if (user.role === "employee" && user._id.toString() !== employeeId) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Find shifts where team includes this employeeId
    const shifts = await Shift.find({ team: employeeId })
      .populate("team", "name")
      .sort({ date: -1 });

    res.status(200).json({ shifts });
  } catch (err) {
    console.error("Error fetching shifts by employee:", err.message);
    res.status(500).json({ message: "Server error fetching shifts" });
  }
};
