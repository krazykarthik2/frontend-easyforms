  import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toastPromise } from "../../../utils/toastify";
import { getEventById, deleteEvent } from "../../../utils/api_calls/event";
import { Link } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { DateFormat } from "../../../utils/formats/formats";
function DeleteEvent({ token }) {
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    
    getEventById(params.id, token)
      .then((data) => {
        console.log(data);
        setEvent(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleDelete();
  };
  const handleDelete = () => {
    toastPromise(() => deleteEvent(params.id, token), {
      pending: "Deleting event...",
      error: "Error deleting event",
      success: "Event deleted successfully",
      then: () => {
        navigate(`/events/`);
      },
    });
  };
  return (
    <div>
      <h1>Delete Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="stack">
          <div>#{ event?._id}</div>
          <h1>{event?.name}</h1>
          <h2>{DateFormat(event?.startDate)} - {DateFormat(event?.endDate)}</h2>
        </div>
        <p>Are you sure you want to delete this event?</p>
        <button type="submit">Delete</button>
        <Link to={`/`} className="p-1 m-5 text-black bg-white border btn unlink ">Cancel</Link>
      </form>
    </div>
  );
}

export default DeleteEvent