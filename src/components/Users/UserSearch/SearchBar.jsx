import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {CiSearch} from "react-icons/ci"
function SearchBar({ __admin, token }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = { name:name, email:email };
    for (const key in query) {
      if (query[key] === "") delete query[key];
    }
    navigate(`/users/search/${JSON.stringify(query)}`);
  };
  return (
    <div className="w-full h-full d-center select-none">
      <form onSubmit={handleSubmit} className=" h-full d-center stack gap-5">
        <h1>Search Users</h1>
        <div className="d-center justify-between w-full gap-5">
          
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={name}
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
        
        </div>
        <div className="d-center justify-between w-full gap-5">

        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          />
          </div>  <button type="submit" className="gap-3 p-3 rounded-lg bg-slightly-green unbtn d-center">
          <span>Search</span>
          <CiSearch />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
