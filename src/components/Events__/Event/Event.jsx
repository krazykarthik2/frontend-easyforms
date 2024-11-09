import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../../../utils/api_calls/event";
import MdEditor from "@uiw/react-md-editor";
import { toastPromise } from "../../../utils/toastify";
import { Link } from "react-router-dom";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

function Event() {
  const params = useParams();
  const [event, setEvent] = useState(null);
  useEffect(() => {
    toastPromise(()=>getEventById(params.id),{
      success: "Event fetched successfully",
      error: "Failed to fetch event",
      pending: "Fetching event...",
      then: (data) => setEvent(data),
    });
  }, [params.id]);
  return (
    <div>
      <div>Event: {event?.name}</div>
      <div>Start Date: {event?.startDate}</div>
      <div>End Date: {event?.endDate}</div>
      <div>Forms: {event?.forms.length} <Link to={`/events/id/${event?._id}/forms`}><FaArrowUpRightFromSquare /></Link></div>
      <div>Event Description:</div>
      <MdEditor.Markdown source={event?.event_description_long} />
    </div>
  );
}

export default Event