import React, { useEffect, useState } from "react";
import { getUserById } from "../../../utils/api_calls/user";
import { useParams } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { toastPromise } from "../../../utils/toastify";
import { deleteUser } from "../../../utils/api_calls/user";
import { useNavigate } from "react-router-dom";

function DeleteUser({ __user, token }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    if (!params.id) {
      if (!__user) return;
      if (!__user._id) return;
      navigate(`/users/delete/${__user._id}`);
      return;
    }
    getUserById(params.id, token)
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id, __user]);
  const handleDelete = () => {
    toastPromise(() => deleteUser(user._id, token), {
      pending: "Deleting user...",
      success: "User deleted successfully",
      error: "Failed to delete user",
      then: () => {
        navigate("/");
      },
      catch_: (err) => {
        console.log(err);
      },
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleDelete();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h1>Delete User</h1>
      <div>#{params.id}</div>
      <h1>{user?.name}</h1>
        <p>{user?.email}</p>
        <button type="submit" className="flex gap-2">
          <FaTrashAlt size={39} />
          <span>Delete</span>
        </button>
      </form>
    </div>
  );
}

export default DeleteUser;
