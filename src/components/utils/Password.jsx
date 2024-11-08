import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Password = ({
  placeholder,
  onChange,
  value,
  autoComplete,
  autoFocus,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="relative">
      <input
        type={isVisible ? "text" : "password"}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
      />
      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        className="absolute -translate-y-1/2 right-2 top-1/2"
      >
        {isVisible ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};

export default Password;
