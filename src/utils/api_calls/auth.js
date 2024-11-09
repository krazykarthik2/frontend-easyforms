import api from "../api/auth";
export const userLogin = async (email, password) => {
  const response = await api.post("/user/login", {
    email,
    password,
  });
  console.log(response);
  return response.data;
};

export const adminLogin = async (email, password) => {
  const response = await api.post("/admin/login", {
    email,
    password,
  });
  return response.data;
};

export const userLoginJWT = async (token) => {
  if(!token) return;
  const response = await api.post("/user/login/jwt",{
    data:null
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const adminLoginJWT = async (token) => {
  if(!token) return;
  const response = await api.post(
    "/admin/login/jwt",
    { data: null },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const userLogout = async (token) => {
  const response = await api.post("/user/logout", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const adminLogout = async (token) => {
  const response = await api.post("/admin/logout", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
