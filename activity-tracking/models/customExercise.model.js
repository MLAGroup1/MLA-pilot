const mongoose = require("mongoose");
const { Schema } = mongoose;

const customExerciseSchema = new Schema({
  exerciseName: {
    type: String,
    required: true,
  },

  calories: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "Calories should be an integer.",
    },
    min: [0, "Calories should be positive."],
  },
});

const customExercise = mongoose.model("customExercise", customExerciseSchema);

module.exports = customExercise;
