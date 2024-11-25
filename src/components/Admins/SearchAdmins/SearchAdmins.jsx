import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import { getAdmins, getUsers } from "../../../utils/api_calls/user";
import { toast } from "react-toastify";
import { idFormat } from "../../../utils/formats/formats";
import {FaPlus} from "react-icons/fa6"
function NotFound() {
  return <div>No Users Found for query</div>;
}
function Main({ __admin, token }) {
  const [users, setUsers] = useState([]);
  const params = useParams();
  useEffect(() => {
    if (!params.query) return;
    window.query = params.query;
    let query;
    try {
      query = JSON.parse(params.query);
    } catch (err) {
      toast.error("Invalid query");
      return;
    }
    for (const key in query) {
      query[key] = { $regex: query[key].split(" ").join("|"), $options: "i" }; //case insensitive search for string queries
    }
    console.log(query);
    getAdmins(query, token).then((data) => {
      setUsers(data);
    });
  }, [params.query, token]);
  return (
    <div className="w-full h-full d-center ">
      {users.length === 0 && <NotFound />}
      <div className="w-full h-full stack">
        <h1>{users.length} Records Found</h1>
        <table className="w-full table-border">
          <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>View</th>
          </thead>
          {users.map((user) => (
            <tr key={user._id} id={user._id} className="w-full gap-1 ">
              <td className="text-sm text-center id">
                <div className="text-xs">
                  {idFormat(user._id).map((e) => (
                    <div className="small">{e}</div>
                  ))}
                </div>
              </td>
              <td className="text-center name">{user.name}{user?._id==__admin?._id&&" (Yourself)"}</td>
              <td className="email">{user.email}</td>
              <td className="text-center view">
                <a href={`/admins/id/${user._id}`}>View</a>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
function UserSearch({ __admin, token }) {
  const params = useParams();
  return (
    <div className="w-full h-full stack d-center justify-between">
      <div className="up"></div>
    <div className="w-full h-full d-center">
      {params.query ? (
        <Main __admin={__admin} token={token} />
      ) : (
        <SearchBar __admin={__admin} token={token} />
      )}
    </div>
    <Link to="/admins/create" className=" unlink bottom stack d-center">
    <div className="p-5 rounded-lg bg-slightly-green d-center">
              <FaPlus size={37} />
            </div>
            <span>Create Admins</span>

    </Link>
    </div>
  );
}

export default UserSearch;
