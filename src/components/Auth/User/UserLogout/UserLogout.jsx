import React, { useEffect } from "react";
import { userLogout } from "../../../../utils/api_calls/auth";
import { useNavigate } from "react-router-dom";


function UserLogout({ setUser }) {
  const navigate = useNavigate();
  useEffect(() => {
    userLogout().then((data) => {
      setUser(null);
      navigate("/");
    });
  }, []);
  return <></>;
}

export default UserLogout;
