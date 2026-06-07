import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

function Register() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister =
    async (e) => {

      e.preventDefault();

      try {

        await api.post(
          "/auth/register",
          {
            name,
            email,
            password
          }
        );

        toast.success(
          "Registration Successful"
        );

        navigate("/login");

      } catch (error) {

        toast.error(
          error.response?.data?.message ||
          "Registration Failed"
        );

      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleRegister}
        className="
        bg-white/5
        border border-white/10
        p-8
        rounded-2xl
        w-[400px]
        "
      >

        <h1 className="text-3xl font-bold mb-6">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
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
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;