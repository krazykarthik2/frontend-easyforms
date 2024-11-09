import api from "../api/event";

export const getEvents = async (query,token) => {
  const response = await api.get("/",{params:query,headers:{Authorization: `Bearer ${token}`}});
  return response.data;
};

export const getEventById = async (id,token) => {
  const response = await api.get(`/${id}`,{headers:{Authorization: `Bearer ${token}`}});
  return response.data;
};

export const createEvent = async (event,token) => {
  const response = await api.post("/create",event,{headers:{Authorization: `Bearer ${token}`}});
  return response.data;
};

export const updateEvent = async (id,event,token) => {
  const response = await api.put(`/edit/${id}`,event,{headers:{Authorization: `Bearer ${token}`}});
  return response.data;
};

export const deleteEvent = async (id,token) => {
  const response = await api.delete(`/delete/${id}`,{headers:{Authorization: `Bearer ${token}`}});
  return response.data;
};

