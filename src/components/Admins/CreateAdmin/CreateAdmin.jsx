import React, { useState } from "react";
import { toast } from "react-toastify";
import { toastPromise } from "../../../utils/toastify.js";
import { createAdmin } from "../../../utils/api_calls/user";
import Password from "../../utils/Password";
import { FaArrowRight } from "react-icons/fa";
function CreateAdmin({ __admin, token }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    toastPromise(() => createAdmin(name, email, password, token), {
      pending: "Creating Admin...",
      success: "Admin Created Successfully",
      error: "Error Creating Admin",
      then: () => {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      },
    });
  };
  return (
    <div className="w-full h-full d-center stack">
      <h1>Create Admin</h1>
      <form onSubmit={handleSubmit} className="w-full h-full d-center stack">
        <div className="gap-2 text-xl stack d-center">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <Password
            placeholder="Password"
            autoComplete="new-password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Password
            placeholder="Confirm Password"
            autoComplete="new-password"
            name="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="gap-2 p-2 text-white rounded-md bg-slightly-green d-center unbtn"
          >
            <span>Create Admin</span>
            <FaArrowRight />
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateAdmin;
