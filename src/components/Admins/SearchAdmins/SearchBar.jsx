import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    navigate(`/admins/search/${JSON.stringify(query)}`);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Search Admins</h1>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={name}
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
