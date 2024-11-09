import React, { useState } from 'react'
import {toast} from 'react-toastify'
import {toastPromise } from '../../../utils/toastify.js'
import { createAdmin } from '../../../utils/api_calls/user';
import Password from '../../utils/Password';
function CreateAdmin({ __admin, token }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      toast.error("Passwords do not match");
      return;
    }
    toastPromise(()=>createAdmin(name,email,password,token),{
      pending:'Creating Admin...',
      success:'Admin Created Successfully',
      error:'Error Creating Admin',
      then:()=>{
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    })
  }
  return (
    <div>
      <h1>Create Admin</h1>
      <form onSubmit={handleSubmit}>
        <div className='gap-2 stack d-center'>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="off"/>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email"/>
          <Password placeholder="Password" autoComplete="new-password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Password placeholder="Confirm Password" autoComplete="new-password" name="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <button type="submit">Create Admin</button>
        </div>
      </form>
    </div>
  )
}

export default CreateAdmin