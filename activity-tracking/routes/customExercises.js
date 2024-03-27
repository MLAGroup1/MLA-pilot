const express = require("express");
const router = express.Router();
const customExercise = require("../models/customExercise.model");

// GET: Retrieve all exercises
router.get("/", async (req, res) => {
  try {
    const customexercises = await customExercise.find();
    res.json(customexercises);
  } catch (error) {
    res.status(400).json({ error: "Error: " + error.message });
  }
});

// POST: Add a new exercise
router.post("/add", async (req, res) => {
  console.log(req.body);
  try {
    const { exerciseName, calories } = req.body;

    const newCustomExercise = new customExercise({
      exerciseName,
      calories: Number(calories),
    });

    await newCustomExercise.save();
    res.json({ message: "Exercise added!" });
  } catch (error) {
    res.status(400).json({ error: "Error: " + error.message });
  }
});

// GET: Retrieve an exercise by ID
router.get("/:id", async (req, res) => {
  try {
    const exercise = await customExercise.findById(req.params.id);
    if (!exercise) {
      res.status(404).json({ error: "Exercise not found" });
      return;
    }
    res.json(exercise);
  } catch (error) {
    res.status(400).json({ error: "Error: " + error.message });
  }
});

// DELETE: Delete an exercise by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedExercise = await customExercise.findByIdAndDelete(req.params.id);
    if (!deletedExercise) {
      res.status(404).json({ error: "Exercise not found" });
      return;
    }
    res.json({ message: "Exercise deleted." });
  } catch (error) {
    res.status(400).json({ error: "Error: " + error.message });
  }
});

// PUT: Update an exercise by ID
router.put("/update/:id", async (req, res) => {
  try {
    const { exerciseName, calories } = req.body;

    if ( !exerciseName || !calories) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const exercise = await customExercise.findById(req.params.id);
    if (!exercise) {
      res.status(404).json({ error: "Exercise not found" });
      return;
    }

    exercise.username = username;
    exercise.exerciseType = exerciseType;
    exercise.description = description;
    exercise.duration = Number(duration);
    exercise.calories = Number(calories);
    exercise.date = new Date(date);

    await exercise.save();
    res.json({ message: "Exercise updated!", exercise });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the exercise" });
  }
});

module.exports = router;
