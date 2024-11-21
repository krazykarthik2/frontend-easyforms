import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toastPromise } from "../../../utils/toastify";
import { getAdminById, updateAdmin } from "../../../utils/api_calls/user";
import { FaArrowRight } from "react-icons/fa6";
function EditAdmin({ __admin, token }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    toastPromise(() => updateAdmin(params.id, { name, email }, token), {
      pending: "Updating admin...",
      success: "Admin updated successfully",
      error: "Failed to update admin",
      then: () => {
        navigate("/");
      },
    });
  };
  useEffect(() => {
    if (!params.id) {
      if (window.location.pathname.includes("me")) {
        navigate("/admins/edit/" + __admin?._id);
        return;
      }
      return;
    }
    const loadUser = () => {
      getAdminById(params.id, token)
        .then((data) => {
          setName(data.name);
          setEmail(data.email);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    loadUser();
  }, [params.id]);
  return (
    <div className="w-full h-full d-center stack">
      <h1>Edit Admin</h1>
      <form onSubmit={handleSubmit} className="gap-4 p-4 text-xl stack">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          autoFocus
          autoComplete="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="d-center">
          <button
            type="submit"
            className="gap-4 px-4 py-2 rounded-lg unbtn bg-slightly-green d-center "
          >
            <span>Edit</span>
            <FaArrowRight />
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditAdmin;
