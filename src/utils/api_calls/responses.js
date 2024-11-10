import api from "../api/responses";

export const getResponses = async (formId,token) => {
  const response = await api.get(`/${formId}`,{headers:{Authorization: `Bearer ${token}`}});
  return response.data;
};

export default getResponses;
