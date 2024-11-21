import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toastPromise } from "../../../utils/toastify";
import { deleteAdmin, getAdminById } from "../../../utils/api_calls/user";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
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
    <div className="w-full h-full d-center stack">
      <h1>Delete Admin</h1>
      <form onSubmit={handleSubmit} className="gap-5 d-center stack">
        <div className="gap-0 stack ">
          <div>#{admin?._id}</div>
          <div className="text-2xl">{admin?.name}</div>
          <div className="text-xl">email: {admin?.email}</div>
        </div>
        <div className="gap-10 p-10 border-white border-solid stack rounded-xl">
          <div className="text-xl">Are you sure <br/>you want to delete this admin?</div>
          <div className="gap-5 actions d-center">
            <button
              type="submit"
              className="gap-3 px-6 py-3 rounded-md unbtn bg-slightly-red d-center"
            >
              <span>Delete</span>
              <FiTrash2 />
            </button>
            <Link
              to={`/`}
              className="gap-3 px-6 py-3 bg-gray-500 rounded-md unlink d-center"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DeleteAdmin;
