import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import { getUsers } from "../../../utils/api_calls/user";
import { toast } from "react-toastify";
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
    try{
      query = JSON.parse(params.query);
    }catch(err){
      toast.error("Invalid query"); 
      return;
    }
    for (const key in query) {
      query[key] = { $regex: query[key].split(' ').join('|'), $options: "i" }; //case insensitive search for string queries
    }
    console.log(query);
    getUsers(query, token).then((data) => {
      setUsers(data);
    });
  }, [params.query, token]);
  return (
    <div className="w-full h-full d-center">
      {users.length === 0 && <NotFound />}
      <div className="w-full h-full stack">
        <h1>{users.length} Records Found</h1>
        <table className="w-full gap-3 border-collapse border-white ">
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </thead>
        {users.map((user) => (
          <tr key={user._id} id={user._id} className="w-full gap-1 ">
            <td className="text-sm id">
              user#{user._id}
            </td>
            <td className="name">
              {user.name}
            </td>
            <td className="email">
              {user.email}
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
