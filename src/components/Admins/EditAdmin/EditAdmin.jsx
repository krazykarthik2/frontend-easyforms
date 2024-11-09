import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toastPromise } from "../../../utils/toastify";
import { getAdminById, updateAdmin } from "../../../utils/api_calls/user";

function EditAdmin({
  __admin,
  token
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    toastPromise(() => updateAdmin(params.id,{ name, email},token), {
      pending: "Updating admin...",
      success: "Admin updated successfully",
      error: "Failed to update admin",
      then: () => {
        navigate("/");
      },
    });
  };
  useEffect(() => {
    if(!params.id){
      if(window.location.pathname.includes('me')){
        navigate("/admins/edit/" + __admin?._id);
        return;
      }
      return;
    }
    const loadUser = () => {
      getAdminById(params.id,token).then((data) => {
        setName(data.name);
        setEmail(data.email);
      }).catch(err=>{
        console.log(err);
      })
    };
    loadUser();
  }, [params.id]);
  return (
    <div>
      <h1>Edit Admin</h1>
      <form onSubmit={handleSubmit} className="gap-4 p-4 stack">
        <input type="text" name="name" value={name} placeholder="Name" autoFocus autoComplete="name" onChange={(e) => setName(e.target.value)}/>
        <input type="email" name="email" value={email} placeholder="Email" autoComplete="email" onChange={(e) => setEmail(e.target.value)}/>
        <button type="submit">Edit</button>
      </form>
    </div>
  );
}

export default EditAdmin