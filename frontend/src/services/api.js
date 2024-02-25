import axios from "axios";

function getUrlAPI(port) {
  if (process.env.CODESPACES === "true") {
    return `https://${process.env.CODESPACE_NAME}-${port}.app.github.dev`;
  } else {
    return `http://localhost:${port}`;
  }
}

const api = (baseURL) =>
  axios.create({
    baseURL,
  });

const activityTrackingAPI = api(getUrlAPI(5300));
const analyticsAPI = api(getUrlAPI(5050));

export const trackExercise = async (payload) =>
  activityTrackingAPI.post(`/exercises/add`, payload);

export const getWeeklyStats = async (currentUser, startDate, endDate) => {
  analyticsAPI.get(
    `/stats/weekly/?user=${currentUser}&start=${startDate}&end=${endDate}`
  );
};
