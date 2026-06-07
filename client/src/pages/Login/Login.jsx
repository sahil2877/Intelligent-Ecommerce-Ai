import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await api.post(
            "/auth/login",
            {
              email,
              password
            }
          );

        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data.user
          )
        );

        toast.success(
          "Login Successful"
        );

        window.location.href = "/";

      } catch (error) {

        toast.error(
          error.response?.data?.message ||
          "Login Failed"
        );

      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="
        bg-white/5
        border border-white/10
        p-8
        rounded-2xl
        w-[400px]
        "
      >

        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
          w-full
          p-3
          mb-4
          rounded-xl
          bg-[#111827]
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
          w-full
          p-3
          mb-4
          rounded-xl
          bg-[#111827]
          "
        />

        <button
          className="
          w-full
          bg-purple-600
          py-3
          rounded-xl
          "
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;