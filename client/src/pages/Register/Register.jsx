import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import api from "../../api/axios";
import { toast } from "react-hot-toast";
import useDocumentTitle from "../../lib/useDocumentTitle";

function Register() {
  useDocumentTitle("Create account · Shopwise AI");
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
            <Sparkles size={24} strokeWidth={2.2} />
          </div>
          <h1 className="auth-title">Create your account</h1>
          <div className="auth-subtitle">Join Shopwise AI and shop smarter</div>
        </div>

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              className="form-input"
              type="text"
              autoComplete="name"
              required
              placeholder="Arjun Kumar"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
              autoComplete="new-password"
              required
              minLength={8}
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-full btn-lg" type="submit">
            Create Account <ArrowRight size={17} />
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
