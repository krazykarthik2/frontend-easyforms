import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser, getUserById } from "../../../utils/api_calls/user";
import { toastPromise } from "../../../utils/toastify";
function EditUser({__user}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    toastPromise(() => updateUser(params.id, { name, email }), {
      pending: "Updating user...",
      success: "User updated successfully",
      error: "Failed to update user",
      then: () => {
        navigate("/");
      },
    });
  };
  useEffect(() => {
    if(!params.id){
      if(window.location.pathname.includes('me')){
        navigate("/users/edit/" + __user?._id);
      }
      return;
    }
    const loadUser = () => {
      getUserById(params.id).then((data) => {
        setName(data.name);
        setEmail(data.email);
      });
    };
    loadUser();
  }, [params]);
  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit} className="gap-4 p-4 stack">
        <input type="text" name="name" value={name} placeholder="Name" autoFocus autoComplete="name" onChange={(e) => setName(e.target.value)}/>
        <input type="email" name="email" value={email} placeholder="Email" autoComplete="email" onChange={(e) => setEmail(e.target.value)}/>
        <button type="submit">Edit</button>
      </form>
    </div>
  );
}

export default EditUser;
