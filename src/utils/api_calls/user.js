
import api from "../api/user.js";
export const createUser = async (name, email, password,token) => {
  const response = await api.post("/users/create", { name, email, password },{headers:{Authorization: `Bearer ${token}`}});
  return response.data;
};

export const getUserById = async (id,token) => {
  const response = await api.get(`/users/${id}`,{headers:{Authorization: `Bearer ${token}`}});
  return response.data;
};

export const updateUser = async (id, {name, email },token) => {
  const response = await api.put(`/users/edit/${id}`, { name, email },{headers:{Authorization: `Bearer ${token}`}});
  return response.data;
};

export const updateUserPassword = async (id,password,token) => {
  const response = await api.put(`/users/edit/${id}`, { password },{headers:{Authorization: `Bearer ${token}`}});
  return response.data;
};

export const deleteUser = async (id,token) => {
  const response = await api.delete(`/users/delete/${id}`,{headers:{Authorization: `Bearer ${token}`}});
  return response.data;
};

export const getUsers = async (query,token) => {
  const response = await api.get("/users/",{params:query,headers:{Authorization: `Bearer ${token}`}}  );
  return response.data;
};

export const getUserByEmail = async (email,token) => {
  const response = await api.get(`/users`,{params:{email},headers:{Authorization: `Bearer ${token}`}});
  return response.data;
};

export const getAdmins = async (query,token) => {
  const response = await api.get("/admins",{params:query,headers:{Authorization: `Bearer ${token}`}});
  return response.data;
};

export const getAdminByEmail = async (email,token) => {
  const response = await api.get(`/admins`,{params:{email},headers:{Authorization: `Bearer ${token}`}});
  return response.data;
};

export const getAdminById = async (id,token) => {
  console.log(id,token);
  const response = await api.get(`/admins/${id}`,{headers:{Authorization: `Bearer ${token}`}}  );
  return response.data;
};

export const createAdmin = async (name, email, password,token) => {
    const response = await api.post("/admins/create", { name, email, password },{headers:{Authorization: `Bearer ${token}`}} );
  return response.data;
};

export const updateAdmin = async (id, {name, email, password},token) => {
  const response = await api.put(`/admins/edit/${id}`, { name, email, password },{headers:{Authorization: `Bearer ${token}`}}  );
  return response.data;
};

export const deleteAdmin = async (id,token) => {
  const response = await api.delete(`/admins/delete/${id}`,{headers:{Authorization: `Bearer ${token}`}});
  return response.data;
};
