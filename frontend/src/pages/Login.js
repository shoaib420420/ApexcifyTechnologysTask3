import { useState, useEffect } from "react";
import { login } from "../api/api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // If setUser was passed (unlikely in Login but good practice to clear global state if accessible)
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await login({ email, password });

      // Save token + user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect based on role
      const role = res.data.user.role;
      if (role === "Admin" || role === "admin") navigate("/admin");
      else if (role === "Teacher" || role === "teacher") navigate("/teacher");
      else if (role === "Student" || role === "student") navigate("/student");
      else if (role === "Parent" || role === "parent") navigate("/parent");
      else navigate("/login");

    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              className="form-input"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              className="form-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <div style={{ textAlign: "center", marginTop: "1rem", color: "#6b7280" }}>
          Don't have an account? <Link to="/register" style={{ color: "#4f46e5", textDecoration: "none" }}>Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
