import axios from "axios";

// ✅ Use backend URL from .env
const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

// ❗ Optional: debug log to ensure it's picking the correct URL
console.log("🌐 Using API base URL:", process.env.REACT_APP_API_URL);

// 🔧 Error handler
const handleApiError = (error, action) => {
  if (error.response) {
    console.error(`❌ API Error (${action}):`, error.response.data.message || error.response.data || "Unknown Error");
  } else if (error.request) {
    console.error(`❌ API Error (${action}): No response from server`);
  } else {
    console.error(`❌ API Error (${action}):`, error.message);
  }
  throw error;
};

// ✅ Fetch Users
export const fetchUsers = async () => {
  try {
    const response = await API.get("/users");
    if (!response || !response.data) {
      throw new Error("Invalid response from server");
    }
    return response.data;
  } catch (error) {
    handleApiError(error, "fetching users");
    return [];
  }
};

// ✅ Create a User
export const createUser = async (userData) => {
  try {
    const response = await API.post("/users", userData);
    return response.data;
  } catch (error) {
    handleApiError(error, "creating user");
  }
};

// ✅ Delete a User
export const deleteUser = async (id) => {
  try {
    const response = await API.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, "deleting user");
  }
};

// ✅ Update a User
export const updateUser = async (id, userData) => {
  try {
    const response = await API.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    handleApiError(error, "updating user");
  }
};
