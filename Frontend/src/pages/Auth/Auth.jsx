import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState(""); // Updated to email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }
  
    setError(""); // Clear previous error
  
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        setError(data.error || "Something went wrong");
        return;
      }
  
      // Debugging: Log the user object
      console.log("User Logged In:", data.user);
  
      if (!data.user || !data.user.role) {
        setError("Invalid user data from server.");
        return;
      }
  
      // Store user details in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user.role); // ✅ Store role separately
  
      console.log("Role Stored in LocalStorage:", data.user.role); // Debugging
  
      // Redirect to the appropriate dashboard
      switch (data.user.role) {
        case "director":
          navigate("/director-dashboard");
          break;
        case "employee":
          navigate("/employee-dashboard");
          break;
        case "intern":
          navigate("/intern-dashboard");
          break;
        default:
          setError("Invalid user role");
      }
    } catch (err) {
      setError("Unable to connect to the server. Please try again.");
      console.error(err);
    }
  };
  
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your Email"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your Password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Auth;
