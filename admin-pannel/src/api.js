import axios from "axios";

// ✅ Uses environment variable
const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

export default API;
