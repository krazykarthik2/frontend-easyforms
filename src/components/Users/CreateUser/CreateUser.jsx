import React, { useState } from "react";
import { toastPromise, toastThis,toastErrTemplate } from "../../../utils/toastify.js";
import { createUser } from "../../../utils/api_calls/user.js";
import { useNavigate } from "react-router-dom";
import Password from "../../utils/Password.jsx";
import { FaArrowRight } from "react-icons/fa6";
import { toast } from "react-toastify";
function CreateUser({ __admin, token }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    toastPromise(() => createUser(name, email, password, token), {
      pending:"Creating user",
      success:"User created successfully",
      error: "Failed to create user",
      then: () => navigate("/"),
      catch_:toastErrTemplate
    });
  };
  return (
    <div className="w-full h-full d-center stack">
      <form className="w-full text-xl h-full d-center stack gap-4" onSubmit={handleSubmit}>
      <h1 className="text-4xl font-bold">Create User</h1>
      <div className="text-xl stack gap-2">

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
          placeholder="password"
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
          />
        <Password
          value={confirmPassword}
          placeholder="confirm password"
          autoComplete="new-password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
        type="submit"
        className="gap-2 p-2 text-white text-xl rounded-md bg-slightly-green d-center unbtn"
        >
        <span>Create User</span>
        <FaArrowRight />
      </button>
      </form>
    </div>
  );
}

export default CreateUser;
