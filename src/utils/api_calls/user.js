
import api from "../api/user.js";

export const createUser = async (name, email, password) => {
  const response = await api.post("/users/create", { name, email, password });
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const updateUser = async (id, name, email, password) => {
  const response = await api.put(`/users/edit/${id}`, { name, email, password });
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/delete/${id}`);
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get("/users/");
  return response.data;
};

export const getUserByEmail = async (email) => {
  const response = await api.get(`/users`,{params:{email}});
  return response.data;
};

export const getAdmins = async () => {
  const response = await api.get("/admins");
  return response.data;
};

export const getAdminByEmail = async (email) => {
  const response = await api.get(`/admins`,{params:{email}});
  return response.data;
};

export const getAdminById = async (id) => {
  const response = await api.get(`/admins/${id}`);
  return response.data;
};

export const createAdmin = async (name, email, password) => {
  const response = await api.post("/admins/create", { name, email, password });
  return response.data;
};

export const updateAdmin = async (id, name, email, password) => {
  const response = await api.put(`/admins/edit/${id}`, { name, email, password });
  return response.data;
};

export const deleteAdmin = async (id) => {
  const response = await api.delete(`/admins/delete/${id}`);
  return response.data;
};
