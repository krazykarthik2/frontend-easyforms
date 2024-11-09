import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../../../utils/api_calls/auth';
import Password from "../../../utils/Password.jsx";
import { toastPromise } from '../../../../utils/toastify.js';
function AdminLogin({onLogin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    toastPromise(() => adminLogin(email, password), {
      pending: "Logging in...",
      error: "Error logging in",
      success: "Logged in successfully",
      then: (data) => {
        if(data){
          onLogin({role:"admin",token:data.token,user:data.admin});
        }
      },
    });
  };
  return (
    <div className="w-full h-full d-center stack">
      <h1 className="text-4xl font-bold">Admin Login</h1>
      <form className="w-full h-full d-center stack" onSubmit={handleSubmit}>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Password value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin