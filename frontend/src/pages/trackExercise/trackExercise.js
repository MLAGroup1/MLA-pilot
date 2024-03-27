import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { trackExercise } from "../../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import IconButton from "@material-ui/core/IconButton";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import BikeIcon from "@material-ui/icons/DirectionsBike";
import PoolIcon from "@material-ui/icons/Pool";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import ListIcon from "@material-ui/icons/List";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PopupOtherExercises from "../../components/PopupOtherExercises";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const TrackExercise = ({ currentUser }) => {
  const [state, setState] = useState({
    exerciseType: "",
    description: "",
    duration: 0,
    calories: 0,
    date: new Date(),
  });
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSelectCustomExercise = (exercise) => {
    setState({
      ...state,
      exerciseType: exercise.exerciseName,
      calories: exercise.calories,
    });
  };

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
        calories: 0,
        date: new Date(),
      });

      setMessage("Activity logged successfully! Well done!");
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("There was an error logging your activity!", error);
    }
  };

  return (
    <div>
      <h3>Track exercise</h3>
      <Form onSubmit={onSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
        <div style={{ marginBottom: "20px" }}>
          <IconButton
            color={state.exerciseType === "Running" ? "secondary" : "default"}
            onClick={() => setState({ ...state, exerciseType: "Running", calories: 350 })}
          >
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <DirectionsRunIcon fontSize="large" />
              </Grid>
              <Grid item>
                <Typography variant="body2" color="inherit">
                  Running
                </Typography>
              </Grid>
            </Grid>
          </IconButton>
          <IconButton
            color={state.exerciseType === "Cycling" ? "secondary" : "default"}
            onClick={() => setState({ ...state, exerciseType: "Cycling", calories: 280 })}
          >
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <BikeIcon fontSize="large" />
              </Grid>
              <Grid item>
                <Typography variant="body2" color="inherit">
                  Cycling
                </Typography>
              </Grid>
            </Grid>
          </IconButton>
          <IconButton
            color={state.exerciseType === "Swimming" ? "secondary" : "default"}
            onClick={() => setState({ ...state, exerciseType: "Swimming", calories: 250 })}
          >
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <PoolIcon fontSize="large" />
              </Grid>
              <Grid item>
                <Typography variant="body2" color="inherit">
                  Swimming
                </Typography>
              </Grid>
            </Grid>
          </IconButton>
          <IconButton
            color={state.exerciseType === "Gym" ? "secondary" : "default"}
            onClick={() => setState({ ...state, exerciseType: "Gym", calories: 520 })}
          >
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <FitnessCenterIcon fontSize="large" />
              </Grid>
              <Grid item>
                <Typography variant="body2" color="inherit">
                  Gym
                </Typography>
              </Grid>
            </Grid>
          </IconButton>

          <IconButton
            color={["Swimming", "Gym", "Cycling", "Running"].includes(state.exerciseType) ? "default" : "secondary"}
            onClick={() => {
              setShowPopup(true);
              setState({ ...state, exerciseType: "Other" });
            }}
          >
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <ListIcon fontSize="large" />
              </Grid>
              <Grid item>
                <Typography variant="body2" color="inherit">
                  Other
                </Typography>
              </Grid>
            </Grid>
          </IconButton>
        </div>

        <Form.Group controlId="formDate" className="form-margin">
          <Form.Label>Date:</Form.Label>
          <DatePicker
            selected={state.date}
            onChange={(date) => setState({ ...state, date })}
            dateFormat="dd/MM/yyyy"
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

        <Form.Group controlId="calories" style={{ marginBottom: "40px" }}>
          <Form.Label>Calories:</Form.Label>
          <Form.Control
            type="number"
            required
            value={state.calories}
            onChange={(e) => setState({ ...state, calories: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="description" style={{ marginBottom: "20px" }}>
          <Form.Label>How'd it go?</Form.Label>
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

        <Button variant="success" type="submit">
          Save activity
        </Button>
      </Form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {showPopup && (
        <PopupOtherExercises
          isOpen={showPopup}
          onClose={() => {
            setShowPopup(false);
          }}
           onSelectExercise={handleSelectCustomExercise}
        />
      )}
    </div>
  );
};

export default TrackExercise;
