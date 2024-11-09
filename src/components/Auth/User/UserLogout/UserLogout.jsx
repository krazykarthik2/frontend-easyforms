import React, { useEffect } from "react";
import { userLogout } from "../../../../utils/api_calls/auth";
import { useNavigate } from "react-router-dom";


  function UserLogout({ onLogout,token }) {
  const navigate = useNavigate();
  useEffect(() => {
    userLogout(token).then((data) => {
      onLogout();
      navigate("/");
    }).catch(err=>{
      onLogout();
      console.log(err);
    })
  }, []);
  return <></>;
}

export default UserLogout;
