import api from "../api/forms";

export const createForm = async (eventId,formId,name,attributes,token) => {
  const response = await api.post("/create", {eventId,formId,name,attributes},{headers:{Authorization: `Bearer ${token}`}});
  return response.data;
};
export const getFormSlugByEventSlug = async (eventSlug,slug,token) => {
  const response = await api.get(`/slug/${eventSlug}/${slug}`,{headers:{Authorization: `Bearer ${token}`}});
  return response.data;
};
export const getFormSlugByEventId = async (eventId,slug,token) => {
  const response = await api.get(`/slug/id/${eventId}/${slug}`,{headers:{Authorization: `Bearer ${token}`}});
  return response.data;
};
export const getAllForms = async (query,token) => {
  const response = await api.get("/",{params:query,headers:{Authorization: `Bearer ${token}`}});
  return response.data;
};

export const getFormById = async (formId,token) => {
  const response = await api.get(`/${formId}`,{headers:{Authorization: `Bearer ${token}`}});
  return response.data;
};

export const updateForm = async (formId,form,token) => {
  const response = await api.put(`/edit/${formId}`,form,{headers:{Authorization: `Bearer ${token}`}});
  return response.data;
};

export const deleteForm = async (formId,token) => {
  const response = await api.delete(`/delete/${formId}`,{headers:{Authorization: `Bearer ${token}`}});
  return response.data;
};

