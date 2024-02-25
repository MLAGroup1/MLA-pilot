import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "../App";
import TrackExercise from "../pages/trackExercise/trackExercise";
import Statistics from "../pages/statistics/statistics";
import Login from "../pages/login/login";
import Signup from "../pages/signup/signup";
import Journal from "../pages/jornal/journal";
import { useContext } from "react";

export default function RoutesConfig() {
  const { isLoggedIn, currentUser, handleLogin } = useContext(UserContext);

  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/signup"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <Signup
                onSignup={(username) => {
                  handleLogin(username);
                }}
              />
            )
          }
        />
        <Route
          path="/trackExercise"
          element={
            isLoggedIn ? (
              <TrackExercise currentUser={currentUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/statistics"
          element={
            isLoggedIn ? (
              <Statistics currentUser={currentUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/journal"
          element={
            isLoggedIn ? (
              <Journal currentUser={currentUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/trackExercise" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
}
