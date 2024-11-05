import api from "../api/auth";

export const userLogin = async (email, password) => {
  const response = await api.post("/user/login", { email, password });
  console.log(response);
  return response.data;
};

export const adminLogin = async (email, password) => {
  const response = await api.post("/admin/login", {email, password});
  return response.data;
};

export const userLoginJWT = async (token) => {
  const response = await api.post("/user/login/jwt", { 
    headers: {
      Authorization: `Bearer ${token}`,
    },
   });
  return response.data;
};

export const adminLoginJWT = async (token) => {
  const response = await api.post("/admin/login/jwt", { 
    headers: {
      Authorization: `Bearer ${token}`,
    },
   });
  return response.data;
};

export const userLogout = async () => {
  const response = await api.post("/user/logout");
  return response.data;
};

export const adminLogout = async () => {
  const response = await api.post("/admin/logout");
  return response.data;
};

