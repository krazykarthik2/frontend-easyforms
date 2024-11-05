import React, { useEffect } from "react";
import { adminLogout } from "../../../../utils/api_calls/auth";
import { useNavigate } from "react-router-dom";

function AdminLogout({ setAdmin }) {
  const navigate = useNavigate();
  useEffect(() => {
    adminLogout().then((data) => {
      setAdmin(null);
      navigate("/");
    });
  }, []);
  return <></>;
}

export default AdminLogout;
