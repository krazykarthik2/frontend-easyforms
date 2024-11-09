import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL+"/api/events/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default api;
