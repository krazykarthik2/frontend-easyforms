import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toastPromise } from "../../../utils/toastify";
import { getEventById, updateEvent } from "../../../utils/api_calls/event";
import { useState, useEffect } from "react";
import { DateFormatForInput } from "../../../utils/formats/formats";
import MdEditor from "@uiw/react-md-editor";
function EditEvent({ token }) {
  const params = useParams();
  const [event, setEvent] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    toastPromise(() => getEventById(params.id, token), {
      success: "Event fetched successfully",
      error: "Failed to fetch event",
      pending: "Fetching event...",
      then: (data) => {
        if(!data) return;
        setEvent({
          ...data,
          startDate: DateFormatForInput(data?.startDate),
          endDate: DateFormatForInput(data?.endDate),
        });
      },
    });
  }, [params.id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    toastPromise(() => updateEvent(params.id, event), {
      success: "Event updated successfully",
      error: "Failed to update event",
      pending: "Updating event...",
      then: () => {
        navigate("/events");
      },
    });
  };
  return (
    <div className="d-center stack">
      <div>EditEvent {params.id}</div>
      <form onSubmit={handleSubmit}>
        <div className="stack">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={event?.name || ""}
            onChange={(e) => setEvent((x) => ({ ...x, name: e.target.value }))}
          />
        </div>
        <div className="stack">
          <label htmlFor="eventSlug">Event Slug</label>
          <input
            id="eventSlug"
            type="text"
            value={event?.eventSlug || ""}
            onChange={(e) => setEvent((x) => ({ ...x, eventSlug: e.target.value }))}
          />
        </div>
        <div className="stack">
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            type="date"
            value={event?.startDate || ""}
            onChange={(e) =>
              setEvent((x) => ({ ...x, startDate: e.target.value }))
            }
          />
        </div>
        <div className="stack">
          <label htmlFor="endDate">End Date</label>
          <input
            id="endDate"
            type="date"
            value={event?.endDate || ""}
            onChange={(e) =>
              setEvent((x) => ({ ...x, endDate: e.target.value }))
            }
          />
        </div>
        <div className="stack">
          <label>Event Description</label>
          <MdEditor
            id="eventDescriptionLong"
            value={event?.event_description_long || ""}
            onChange={(e) =>
              setEvent((x) => ({ ...x, event_description_long: e }))
            }
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditEvent;
