import React, { useEffect, useState } from "react";
import { getAdminById } from "../../../utils/api_calls/user";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { DateTimeFormat,showDateTimeDiff } from "../../../utils/formats/formats";
import { FiTrash2, FiEdit } from "react-icons/fi";
function MyProfileAdmin({ __admin, token }) {
  const [admin, setAdmin] = useState(null);
  useEffect(() => {
    if (!__admin) return;
    if (!__admin._id) return;
    getAdminById(__admin._id, token)
      .then((data) => {
        setAdmin(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [__admin]);
  return (
    <div className="justify-between w-screen overflow-x-auto h-full d-center stack px-10 md:p-0">
      <div>admin#{admin?._id}</div>
      <table className="w-full gap-3 d-center ">
        <tbody>
          <tr>
            <td>Name</td>
            <td>:</td>
            <td>{admin?.name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>:</td>
            <td>{admin?.email}</td>
          </tr>
          <tr>
            <td>Created At</td>
            <td>:</td>
            <td>{DateTimeFormat(admin?.createdAt)}</td>
            <td className="text-gray-500">::/{showDateTimeDiff(admin?.createdAt)}</td>
          </tr>
          <tr>
            <td>Last Login At</td>
            <td>:</td>
            <td>{DateTimeFormat(admin?.lastLogin)}</td>
            <td className="text-gray-500">::/{showDateTimeDiff(admin?.lastLogin)}</td>
          </tr>
          <tr>
            <td>Last Logout At</td>
            <td>:</td>
            <td>{DateTimeFormat(admin?.lastLogout)}</td>
            <td className="text-gray-500">::/{showDateTimeDiff(admin?.lastLogout)}</td>
          </tr>
          <tr>
            <td>Updated At</td>
            <td>:</td>
            <td>{DateTimeFormat(admin?.updatedAt)}</td>
            <td className="text-gray-500">::/{showDateTimeDiff(admin?.updatedAt)}</td>
          </tr>
        </tbody>
      </table>
      <div className="gap-5 d-center">
        <Link
          to={`/admins/me/edit`}
          className="gap-4 p-3 unlink bg-slightly-green d-center rounded-xl"
        >
          <span>Edit</span>
          <FiEdit />
        </Link>
        <Link
          to={`/admins/me/delete`}
          className="gap-4 p-3 unlink bg-slightly-red d-center rounded-xl"
        >
          <span>Delete</span>
          <FiTrash2 />
        </Link>
      </div>
    </div>
  );
}

export default MyProfileAdmin;
