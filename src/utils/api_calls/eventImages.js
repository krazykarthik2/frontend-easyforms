import api from "../api/event";

export const getEventImages = async (eventId, token) => {
  const response = await api.get(`/images/${eventId}`, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};
export const createEventImage = async (eventId, image, token) => {
  const response = await api.post(`/images/${eventId}/create`, {image}, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};  
export const createEventImagesBulk = async (eventId, images, isTransaction, token) => {
  const response = await api.post(`/images/${eventId}/create_bulk`, {images, isTransaction}, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};
export const deleteEventImage = async (imageId, token) => {
  const response = await api.delete(`/images/delete/${imageId}`, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};
export const getEventImageById = async (imageId, token) => {
  const response = await api.get(`/images/id/${imageId}`, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};



