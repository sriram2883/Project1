import React, { useState } from "react";
import axios from "axios";

const API_BASE = "https://localhost:5001/api/auth"; // Change as needed

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "User",
  });
  const [message, setMessage] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage("");
    setForm({ ...form, password: "", confirmPassword: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && form.password !== form.confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    const endpoint = isLogin ? "/login" : "/register";

    try {
      const res = await axios.post(`${API_BASE}${endpoint}`, form);
      setMessage(isLogin ? "✅ Login successful!" : "✅ Signup successful!");

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", form.role);
        // Navigate or reload here
      }
    } catch (err) {
      setMessage("❌ " + (err.response?.data || "Something went wrong!"));
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="glass-card p-4 shadow-lg rounded-4">
        <h3 className="text-center mb-4 text-white fw-bold">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h3>

        {message && (
          <div className="alert alert-info text-center py-2" role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
            <label htmlFor="username">Username</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          {!isLogin && (
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label fw-semibold text-white">Role</label>
            <select
              className="form-select"
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button className="btn btn-primary w-100 py-2 mt-2" type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <hr className="text-white" />

        <div className="text-center">
          <button
            className="btn btn-link text-white text-decoration-none"
            onClick={toggleForm}
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Log in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
