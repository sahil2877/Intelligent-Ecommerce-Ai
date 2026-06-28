import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import api from "../../api/axios";
import { toast } from "react-hot-toast";
import useDocumentTitle from "../../lib/useDocumentTitle";

function Login() {
  useDocumentTitle("Sign in · Shopwise AI");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login Successful");

      window.location.href = "/";
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-mark">
            <Sparkles size={24} strokeWidth={2.2} />
          </div>
          <h1 className="auth-title">Welcome back</h1>
          <div className="auth-subtitle">Sign in to your Shopwise AI account</div>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              className="form-input"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              className="form-input"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-full btn-lg" type="submit">
            Sign In <ArrowRight size={17} />
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/register">Create one free →</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
