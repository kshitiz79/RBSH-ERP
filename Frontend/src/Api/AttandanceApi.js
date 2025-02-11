import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Backend URL

// Punch In API


// Helper function to get user data
const getUserData = () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};

// Helper function to get auth header
const getAuthHeader = () => {
  const user = getUserData();
  return user.token ? { Authorization: `Bearer ${user.token}` } : {};
};

// Punch In API
export const punchIn = async (userId, role) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/attendance/punch-in`,
      { user_id: userId, role: role },
      { headers: getAuthHeader(), timeout: 5000 }
    );
    return response.data;
  } catch (error) {
    console.error("Error punching in:", error);
    throw error;
  }
};

// Punch Out API
export const punchOut = async (userId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/attendance/punch-out`,
      { user_id: userId },
      { headers: getAuthHeader(), timeout: 5000 }
    );
    return response.data;
  } catch (error) {
    console.error("Error punching out:", error);
    throw error;
  }
};

// Start Break API
export const startBreak = async (userId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/attendance/start-break`,
      { user_id: userId },
      { headers: getAuthHeader(), timeout: 5000 }
    );
    return response.data;
  } catch (error) {
    console.error("Error starting break:", error);
    throw error;
  }
};

// End Break API
export const endBreak = async (userId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/attendance/end-break`,
      { user_id: userId },
      { headers: getAuthHeader(), timeout: 5000 }
    );
    return response.data;
  } catch (error) {
    console.error("Error ending break:", error);
    throw error;
  }
};

// Get Attendance Logs API
export const getAttendanceLogs = async () => {
  try {
    const { role, id: userId } = getUserData();
    const response = await axios.get(`${API_BASE_URL}/attendance/logs`, {
      params: { role: role || "employee", user_id: userId },
      headers: getAuthHeader(),
    });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching logs:", error);
    return [];
  }
};

// Get Statistics API
export const getStatistics = async () => {
  try {
    const { id: userId, role } = getUserData();
    const response = await axios.get(`${API_BASE_URL}/attendance/stats`, {
      params: { user_id: userId, role: role || "employee" },
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return [];
  }
};