import React, { useState } from "react";
import { Button, Form, Dropdown } from "react-bootstrap";
import { trackExercise } from "../../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import IconButton from "@material-ui/core/IconButton";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import BikeIcon from "@material-ui/icons/DirectionsBike";
import PoolIcon from "@material-ui/icons/Pool";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import OtherIcon from "@material-ui/icons/HelpOutline";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TrackExercise = ({ currentUser }) => {
  const [state, setState] = useState({
    exerciseType: "",
    description: "",
    duration: 0,
    date: new Date(),
    bodyWeight: 0, // Added bodyWeight state
  });
  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      username: currentUser,
      ...state,
    };

    try {
      const response = await trackExercise(dataToSubmit);
      console.log(response.data);

      setState({
        exerciseType: "",
        description: "",
        duration: 0,
        date: new Date(),
        bodyWeight: state.bodyWeight, // Preserve bodyWeight after submitting
      });

      setMessage("Activity logged successfully! Well done!");
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("There was an error logging your activity!", error);
    }
  };

  const handleExerciseChange = (selectedExercise) => {
    setState({ ...state, exerciseType: selectedExercise });
    console.log(state);
  };

  const calculateCalories = () => {
    const MET = 1; // Assuming MET value for general activity
    const calories = (state.duration * MET * state.bodyWeight) / 200;
    return calories;
  };

  const handleCalculateCalories = () => {
    const userWeight = prompt("Please enter your body weight in kilograms:");
    if (userWeight) {
      setState({ ...state, bodyWeight: parseFloat(userWeight) }); // Update bodyWeight in state
      const caloriesBurned = calculateCalories();
      alert(`Calories burned: ${caloriesBurned.toFixed(2)}`);
    }
  };

  return (
    <div>
      <h3>Track exercise</h3>
      <Form onSubmit={onSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
        <Form.Group controlId="formDate" className="form-margin">
          <Form.Label>Date:</Form.Label>
          <DatePicker
            selected={state.date}
            onChange={(date) => setState({ ...state, date })}
            dateFormat="yyyy/MM/dd"
          />
        </Form.Group>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {state.exerciseType ? state.exerciseType : "Select Exercise"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleExerciseChange("Running")}>
              Running
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleExerciseChange("Cycling")}>
              Cycling
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleExerciseChange("Swimming")}>
              Swimming
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleExerciseChange("Gym")}>
              Gym
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => handleExerciseChange("Badminton")}>
              Sports - Badminton
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleExerciseChange("Cricket")}>
              Sports - Cricket
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleExerciseChange("Tennis")}>
              Sports - Tennis
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Form.Group controlId="description" style={{ marginBottom: "20px" }}>
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            required
            value={state.description}
            onChange={(e) =>
              setState({ ...state, description: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="duration" style={{ marginBottom: "40px" }}>
          <Form.Label>Duration (in minutes):</Form.Label>
          <Form.Control
            type="number"
            required
            value={state.duration}
            onChange={(e) => setState({ ...state, duration: e.target.value })}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Save activity
        </Button>
        <Button variant="primary" onClick={handleCalculateCalories}>
          Calculate Calories
        </Button>
      </Form>
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};

export default TrackExercise;
