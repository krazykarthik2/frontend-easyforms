import MdEditor from "@uiw/react-md-editor";
import React, { useEffect, useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { getEventById, getEventBySlug } from "../../../utils/api_calls/event";
import { toastPromise } from "../../../utils/toastify";
function Event() {
  const params = useParams();
  const [event, setEvent] = useState(null);
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
  return (
    <div>
      <div>Event: {event?.name}</div>
      <div>Event Slug: {event?.eventSlug}</div>
      <div>Start Date: {event?.startDate}</div>
      <div>End Date: {event?.endDate}</div>
      <div>
        Forms: {event?.forms.length}{" "}
        <Link to={`/events/id/${event?._id}/forms`}>
          <FaArrowUpRightFromSquare />
        </Link>
      </div>
      <div>Event Description:</div>
      <MdEditor.Markdown source={event?.event_description_long} />
    </div>
  );
}

export default Event;
