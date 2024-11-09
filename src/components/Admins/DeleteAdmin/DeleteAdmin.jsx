import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toastPromise } from "../../../utils/toastify";
import { deleteAdmin, getAdminById } from "../../../utils/api_calls/user";
import { Link } from "react-router-dom";

function DeleteAdmin({ __admin, token }) {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    
    if (!params.id) {
      if (!__admin) return;
      if (!__admin._id) return;
      navigate(`/admins/delete/${__admin._id}`);
      return;
    }
    getAdminById(params.id, token)
      .then((data) => {
        console.log(data);
        setAdmin(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleDelete();
  };
  const handleDelete = () => {
    toastPromise(() => deleteAdmin(__admin._id, token), {
      pending: "Deleting admin...",
      error: "Error deleting admin",
      success: "Admin deleted successfully",
      then: () => {
        navigate(`/`);
      },
    });
  };
  return (
    <div>
      <h1>Delete Admin</h1>
      <form onSubmit={handleSubmit}>
        <div className="stack">
          <div>#{admin?._id}</div>
          <h1>{admin?.name}</h1>
          <p>{admin?.email}</p>
        </div>
        <p>Are you sure you want to delete this admin?</p>
        <button type="submit">Delete</button>
        <Link to={`/`} className="p-1 m-5 text-black bg-white border btn unlink ">Cancel</Link>
      </form>
    </div>
  );
}

export default DeleteAdmin;
