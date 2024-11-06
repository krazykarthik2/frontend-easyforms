import React, { useState } from "react";

import { toastPromise } from "../../../utils/toastify.js";
import { createUser } from "../../../utils/api_calls/user.js";
import { useNavigate } from "react-router-dom";
import Password from "../../utils/Password.jsx";
function CreateUser() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    toastPromise(()=>createUser(name, email, password),{
      pending:"Creating user",
      success:"User created successfully",
      error: "Failed to create user",
      then: () => navigate("/"),
    });
  };
  return (
    <div className="w-full h-full d-center stack">
      <h1 className="text-4xl font-bold">Register</h1>
      <form className="w-full h-full d-center stack" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Password
          value={password}
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Password
          value={confirmPassword}
          autoComplete="new-password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default CreateUser;
