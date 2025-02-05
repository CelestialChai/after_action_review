import express from "express";
import Mission from "../models/Mission.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Save a mission form
router.post("/save", authMiddleware, async (req, res) => {
  try {
    const { missionName, missionDate, missionUnit, events, summary, hero } = req.body;
    const newMission = new Mission({
      userId: req.user._id, // Get user from token middleware
      missionName,
      missionDate,
      missionUnit,
      events,
      summary,
      hero,
    });

    await newMission.save();
    res.status(201).json({ message: "Mission saved successfully!", mission: newMission });
  } catch (error) {
    res.status(500).json({ message: "Error saving mission", error });
  }
});

// Get all saved missions for a logged-in user
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const missions = await Mission.find({ userId: req.user._id });
    res.status(200).json(missions);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving missions", error });
  }
});

export default router;
