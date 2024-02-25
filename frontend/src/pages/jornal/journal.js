import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import moment from "moment";
import "./journal.css";
import { getWeeklyStats } from "../../services/api.js";

const Journal = ({ currentUser }) => {
  const [startDate, setStartDate] = useState(moment().startOf("week").toDate());
  const [endDate, setEndDate] = useState(moment().endOf("week").toDate());
  const [exercises, setExercises] = useState([]);

  const fetchExercises = async () => {
    try {
      const response = await getWeeklyStats(
        currentUser,
        moment(startDate).format("YYYY-MM-DD"),
        moment(endDate).format("YYYY-MM-DD")
      );
      console.log("API Response:", response.data);
      if (response.data.stats && Array.isArray(response.data.stats)) {
        setExercises(response.data.stats);
      } else {
        console.error("Unexpected response structure:", response.data);
        setExercises([]);
      }
    } catch (error) {
      console.error("Failed to fetch exercises", error);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, [currentUser, startDate, endDate]);

  const goToPreviousWeek = () => {
    setStartDate(
      moment(startDate).subtract(1, "weeks").startOf("week").toDate()
    );
    setEndDate(moment(endDate).subtract(1, "weeks").endOf("week").toDate());
  };

  const goToNextWeek = () => {
    setStartDate(moment(startDate).add(1, "weeks").startOf("week").toDate());
    setEndDate(moment(endDate).add(1, "weeks").endOf("week").toDate());
  };

  return (
    <div className="journal-container">
      <h4>Weekly Exercise Journal</h4>
      <br></br>
      <div className="date-range">
        <Button className="button-small" onClick={goToPreviousWeek}>
          &larr; Previous
        </Button>
        <span>
          {moment(startDate).format("YYYY-MM-DD")} to{" "}
          {moment(endDate).format("YYYY-MM-DD")}
        </span>
        <Button className="button-small" onClick={goToNextWeek}>
          Next &rarr;
        </Button>
      </div>
      <ul>
        {exercises && exercises.length > 0 ? (
          exercises.map((exercise, index) => (
            <li key={index} className="exercise-journal-data">
              {exercise.exerciseType} - {exercise.totalDuration} minutes
            </li>
          ))
        ) : (
          <li>No exercises found for this period.</li>
        )}
      </ul>
    </div>
  );
};

export default Journal;
