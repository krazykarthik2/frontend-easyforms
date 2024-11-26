import api from "../api/respond";

export const respondToForm = async (formId,response,token) => {
  const response__ = await api.post(`/form/${formId}`,response,{headers:{Authorization: `Bearer ${token}`}});
  return response__.data;
};
export const checkResponse = async (formId,token) => {
  const response__ = await api.get(`/check/${formId}`,{headers:{Authorization: `Bearer ${token}`}});
  return response__.data;
};  