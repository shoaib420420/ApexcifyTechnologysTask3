import { useState, useEffect } from "react";
import { register } from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Student" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (setUser) setUser(null);
  }, [setUser]);

  // Capitalize role for display/consistency if needed by backend enum
  // Backend likely expects 'student', 'teacher' etc or Capitalized.
  // Checking userController, it just stores what is sent. 
  // Let's stick to capitalized for UI options but send what backend needs.
  // Previous successful login showed 'Admin', 'Teacher'. So Capitalized seems to be the convention used in db.

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await register(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (setUser) setUser(res.data.user);

      setMessage("Registered successfully! Redirecting...");

      setTimeout(() => {
        const role = res.data.user.role;
        if (role === "Admin" || role === "admin") navigate("/dashboard");
        else if (role === "Teacher" || role === "teacher") navigate("/classes");
        else if (role === "Student" || role === "student") navigate("/attendance");
        else navigate("/dashboard");
      }, 1500);

    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="form-input"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              className="form-input"
              name="email"
              placeholder="Email Address"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              className="form-input"
              name="password"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <select className="form-input" name="role" onChange={handleChange} value={form.role}>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Parent">Parent</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {message && <p style={{ color: "green", textAlign: "center", marginTop: "1rem" }}>{message}</p>}

        <div style={{ textAlign: "center", marginTop: "1rem", color: "#6b7280" }}>
          Already have an account? <Link to="/login" style={{ color: "#4f46e5", textDecoration: "none" }}>Sign In</Link>
        </div>
      </div>
    </div>
  );
}
