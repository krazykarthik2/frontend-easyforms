import React from "react";
import { FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
function Navbar({ onClick ,isActive}) {
  return (
    <nav className="flex flex-wrap justify-between w-full p-5 text-2xl bg-gray-800 navbar ">
      <div className="flex-wrap navbar-links">
        <button onClick={onClick} className="unbtn" accessKey="M">
          {!isActive ? <FaBars size={37} /> : <FaTimes size={37} />}
        </button>
        <span className="underline">M</span>
      </div>
      <div className="right"></div>
    </nav>
  );
}

export default Navbar;
