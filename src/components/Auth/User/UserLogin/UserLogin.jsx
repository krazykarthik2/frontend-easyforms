import React, { useState } from "react";
import { userLogin } from "../../../../utils/api_calls/auth.js";
import { toastPromise } from "../../../../utils/toastify.js";
import { useNavigate } from "react-router-dom";
import Password from "../../../utils/Password.jsx";
function UserLogin({setUser,setToken}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    toastPromise(() => userLogin(email, password), {
      pending: "Logging in...",
      error: "Invalid credentials",
      success: "Logged in successfully",
      then: (data) => {
        if (data) {
          setUser(data.user);
          setToken(data.token);
          navigate("/");
        }
      },
    });
  };
  return (
    <div className="w-full h-full d-center stack">
      <div className="w-full h-full d-center stack">
        <h1 className="text-4xl font-bold">Login</h1>
        <form className="w-full h-full d-center stack" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Password
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" autoComplete="on">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;