import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getEventImages } from '../../../utils/api_calls/eventImages';
import { toastPromise } from '../../../utils/toastify';
function NoImgs({__admin}){
  const params = useParams();
  return <div className='d-center stack'>
    <span>No images found</span>
    {__admin && <Link to={`/events/id/${params.id}/images/create`}>Add Image</Link>}
  </div>
}
function ViewEventImages({__admin,token}) {
  const params = useParams();
  const [eventImages, setEventImages] = useState([]);
  useEffect(()=>{
    toastPromise(()=>getEventImages(params.id, token), {
      pending: "Loading event images...",
      success: "Event images loaded successfully!",
      error: "Failed to load event images!",
      then: (data) => setEventImages(data),
    });
  },[params.id,token]);
  return (
    <div>
      <h1>Event Images of Event@{params.id}</h1>
      <div className='flex-wrap d-flex'>
        {eventImages.map((image)=>(
          <div className="d-center">
            <img src={image.image} alt={image.imageName || "Event Image"}/>
            <span>{image.imageName}</span>
          </div>
        ))}
        {eventImages.length === 0 && <NoImgs __admin={__admin} />}
      </div>
    </div>
  )
}

export default ViewEventImages