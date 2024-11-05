import React from "react";
import { FaBars } from "react-icons/fa6";
import { Link } from "react-router-dom";
function Navbar({ onClick }) {
  return (
    <nav className="flex flex-wrap justify-between w-full p-5 text-2xl bg-gray-800 navbar ">
      <div className="flex-wrap navbar-links">
        <button onClick={onClick} className="unbtn">
          <FaBars size={37} />
        </button>
      </div>
      <div className="right"></div>
    </nav>
  );
}

export default Navbar;
