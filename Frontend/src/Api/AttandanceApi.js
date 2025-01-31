import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Backend URL

// Punch In API
export const punchIn = async (userId, role) => {
  const response = await axios.post(`${API_BASE_URL}/attendance/punch-in`, {
    user_id: userId,
    role: role,
  });
  return response.data;
};

// Punch Out API
export const punchOut = async (userId) => {
  const response = await axios.post(`${API_BASE_URL}/attendance/punch-out`, {
    user_id: userId,
  });
  return response.data;
};

// Get Attendance Logs API
export const getAttendanceLogs = async (role) => {
  const response = await axios.get(`${API_BASE_URL}/attendance/logs`, {
    params: { role },
  });
  return response.data;
};
