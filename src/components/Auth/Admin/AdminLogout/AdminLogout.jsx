import React, { useEffect } from "react";
import { adminLogout } from "../../../../utils/api_calls/auth";
import { useNavigate } from "react-router-dom";

function AdminLogout({ onLogout,token  }) {
  const navigate = useNavigate();
  useEffect(() => {
    adminLogout(token).then((data) => {
      onLogout();
      navigate("/");
    });
  }, []);
  return <>Logging out...</>;
}

export default AdminLogout;
