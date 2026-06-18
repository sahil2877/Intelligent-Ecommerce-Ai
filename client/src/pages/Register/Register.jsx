import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Registration Successful");

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-mark">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5.5 8.5h13l-.85 9.4a2.2 2.2 0 0 1-2.2 2H8.55a2.2 2.2 0 0 1-2.2-2L5.5 8.5Z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
              <path d="m12 11.4.62 1.63 1.63.62-1.63.62L12 16.5l-.62-1.63-1.63-.62 1.63-.62L12 11.4Z" fill="#fff" />
            </svg>
          </div>
          <div className="auth-title">Create your account</div>
          <div className="auth-subtitle">Join Shopwise AI and shop smarter</div>
        </div>

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              className="form-input"
              type="text"
              placeholder="Arjun Kumar"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email address</label>
            <input
              className="form-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-full btn-lg" type="submit">
            Create Account →
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in →</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
