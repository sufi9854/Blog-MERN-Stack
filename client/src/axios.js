import axios from "axios";

// Detect environment (local vs deployed)
const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://blog-mern-stack-mwhv.onrender.com/api";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // keep if you use cookies/sessions
});

export default instance;

