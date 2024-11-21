import MdEditor from "@uiw/react-md-editor";
import React, { useEffect, useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { getEventById, getEventBySlug } from "../../../utils/api_calls/event";
import { toastPromise } from "../../../utils/toastify";
import { getEventImages } from "../../../utils/api_calls/eventImages";
import { DateFormat } from "../../../utils/formats/formats";
function Event() {
  const params = useParams();
  const [event, setEvent] = useState(null);
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (params.id) {
      toastPromise(() => getEventById(params.id), {
        success: "Event fetched successfully",
        error: "Failed to fetch event",
        pending: "Fetching event...",
        then: (data) => setEvent(data),
      });
    }
    if (params.eventSlug) {
      toastPromise(() => getEventBySlug(params.eventSlug), {
        success: "Event fetched successfully",
        error: "Failed to fetch event",
        pending: "Fetching event...",
        then: (data) => setEvent(data),
      });
    }
  }, [params.id, params.eventSlug]);
  useEffect(() => {
    if (event?._id) {
      toastPromise(() => getEventImages(event?._id), {
        then: (data) => setImages(data),
      });
    }
  }, [event?._id]);
  return (
    <div className="flex w-full stack">
      <div className="text-3xl">Event: {event?.name}</div>
      <div className="text-3xl">Event Slug: {event?.eventSlug}</div>
      <div className="text-xl">Start Date: {DateFormat(event?.startDate)}</div>
      <div className="text-xl">End Date: {DateFormat(event?.endDate)}</div>
      <div className="my-10 stack">
        <div className="text-3xl">Event Description:</div>
        <MdEditor.Markdown source={event?.event_description_long} />
        {images.length > 0 && (
          <div className="stack d-center">
            <h1>Gallery</h1>
            <div className="flex-wrap w-full gap-5 img-mapping images-loader d-center">
              {images.map((image) => (
                <div key={image._id} className="d-center">
                  <img
                    src={image.image}
                    alt={image.imageName}
                    className="h-auto w-96"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="text-3xl">
        Forms: {event?.forms.length}{" "}
        <Link to={`/events/id/${event?._id}/forms`}>
          <FaArrowUpRightFromSquare />
        </Link>
      </div>
      {images.length === 0 && <div className="text-3xl">No images found</div>}
    </div>
  );
}

export default Event;
