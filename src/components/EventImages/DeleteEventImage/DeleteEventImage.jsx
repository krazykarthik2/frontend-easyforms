import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteEventImage, getEventImageById } from '../../../utils/api_calls/eventImages';
import { toastPromise } from '../../../utils/toastify';

function DeleteEventImage({__admin, token}) {
  const params = useParams();
  const navigate = useNavigate();
  const [eventImage, setEventImage] = useState(null);
  useEffect(()=>{
    toastPromise(()=>getEventImageById(params.imageId, token), {
      pending: "Loading event image...",
      success: "Event image loaded successfully!",
      error: "Failed to load event image!",
      then: (data) => setEventImage(data),
    });
  },[params.imageId,params.id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    toastPromise(()=>deleteEventImage(params.imageId, token), {
      pending: "Deleting event image...",
      success: "Event image deleted successfully!",
      error: "Failed to delete event image!",
      then: () => navigate(`/events/${params.id}`),
    });
  };
  return (
    <div>
      <h1>Delete Image@{params.imageId} of Event@{params.id}</h1>
      <form onSubmit={handleSubmit}>
        <div className="d-center">
          <img src={eventImage?.image} alt="Event Image" />
        </div>
        <div className="d-center">  
          <button className="p-3 rounded-lg bg-slightly-green" type='button' onClick={()=>navigate(`/events/${params.id}`)}>Cancel</button>
          <button className="p-3 rounded-lg bg-slightly-red" type='submit' >Delete</button>
        </div>
      </form>
    </div>
  )
}

export default DeleteEventImage