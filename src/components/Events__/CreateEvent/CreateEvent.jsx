import React, { useState } from "react";
import MdEditor from "@uiw/react-md-editor";
import { toastPromise } from "../../../utils/toastify";
import { createEvent } from "../../../utils/api_calls/event";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function CreateEvent({token}) {
  const [name, setName] = useState("");
  const [eventSlug, setEventSlug] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [eventDescriptionLong, setEventDescriptionLong] = useState("");
  const navigate = useNavigate();
  const handleCreate = () => {
    const event = {
      name:name,
      eventSlug:eventSlug,
      startDate:startDate,
      endDate:endDate,
      event_description_long:eventDescriptionLong
    } 
    toastPromise(()=>createEvent(event,token),{
      success: "Event created successfully",
      error: "Failed to create event",
      pending: "Creating event...",
      then: () => navigate("/events"),
      catch_: (error) => {
        console.log(error);
      },
    })
  }
  const handleSubmit = (e) => {
    console.log("submitting form");
    e.preventDefault();
    handleCreate();
  }
  return (
    <div className="w-full h-full d-center">
      <form onSubmit={handleSubmit} className="w-full h-full justify-evenly d-center stack">
        <div className="text-3xl">Create Event</div>
        <div className="stack">
          <label htmlFor="eventSlug">Event Slug</label>
          <input
            id="eventSlug"
            type="text"
            value={eventSlug}
            onChange={(e) => setEventSlug(e.target.value.toLowerCase().replace(/ /g, "_").replace(/[^a-zA-Z0-9_]/g, ""))}
          />
        </div>
        <div className="stack">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="stack">
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="stack">
          <label htmlFor="endDate">End Date</label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="stack">
          <label>Event Description</label>
          <MdEditor
            id="eventDescriptionLong"
            value={eventDescriptionLong}
            onChange={(e) => setEventDescriptionLong(e)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateEvent;
