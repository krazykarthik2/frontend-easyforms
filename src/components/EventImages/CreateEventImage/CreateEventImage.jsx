import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createEventImagesBulk } from "../../../utils/api_calls/eventImages";
import { toastPromise } from "../../../utils/toastify";
import { getEventById } from "../../../utils/api_calls/event";
import { getBase64 } from "../../../utils/jsutils";
function CreateEventImage({ __admin, token }) {
  const [image, setImage] = useState(null);
  const [event, setEvent] = useState(null);
  const [isTransaction, setIsTransaction] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const img64Array = await Promise.all(
      Array.from(image).map(getBase64)
    );
    window.img64Array = img64Array;
    toastPromise(
      () => createEventImagesBulk(params.id, img64Array, isTransaction, token),
      {
        pending: "Creating event image...",
        success: "Event image created successfully!",
        error: "Failed to create event image!",
        then: () => navigate(`/events/id/${params.id}`),
      }
    );
  };
  useEffect(() => {
    toastPromise(() => getEventById(params.id, token), {
      pending: "Loading event...",
      error: "Failed to load event!",
      success: "Event loaded successfully!",
      then: (data) => setEvent(data),
    });
  }, [params.id]);
  return (
    <div>
      <h1>Create Event Image</h1>
      {event && <h2>{event.name}</h2>}
      {!event && <h2>Loading event...</h2>}
      {event && (
        <form
          onSubmit={handleSubmit}
          className="flex gap-5 stack justify-evenly d-center"
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImage(e.target.files)}
          />
          <div className="d-center">
            <label htmlFor="isTransaction">
              <span>
                Is Transaction(All images will be saved or deleted together)
              </span>
            </label>
            <input
              type="checkbox"
              id="isTransaction"
              value={isTransaction}
              onChange={(e) => setIsTransaction(e.target.checked)}
            />
          </div>
          {image ? (
            <div className="gap-4 m-5 files d-center stack bg-slate-200">
              {Array.from(image).map((img, i) => (
                <div className="d-center">
                  <img src={URL.createObjectURL(img)} alt="img" style={{width:"250px"}}/>
                </div>
              ))}
            </div>
          ) : (
            <div className="noImagesSelected">No images selected</div>
          )}
          <button type="submit">Create</button>
        </form>
      )}
    </div>
  );
}

export default CreateEventImage;
