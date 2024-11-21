import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import { getAdmins, getUsers } from "../../../utils/api_calls/user";
import { toast } from "react-toastify";
import { idFormat } from "../../../utils/formats/formats";
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
    <div className="w-full h-full d-center">
      {users.length === 0 && <NotFound />}
      <div className="w-full h-full stack">
        <h1>{users.length} Records Found</h1>
        <table className="w-full border border-collapse border-white [&>*>td]:border-white [&>*>td]:border [&>*>td]:border-solid [&>*>*>th]:border-white [&>*>*>th]:border  [&>*>*>th]:border-solid">
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
              <td className="text-center name">{user.name}</td>
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
    <div className="w-full h-full d-center">
      {params.query ? (
        <Main __admin={__admin} token={token} />
      ) : (
        <SearchBar __admin={__admin} token={token} />
      )}
    </div>
  );
}

export default UserSearch;
