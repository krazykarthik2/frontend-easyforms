import api from "../api/help";

export const askHelp = async (topic,token) => {
  const response__ = await api.get(`/${topic}`,{headers:{Authorization: `Bearer ${token}`}});
  return response__.data;
};