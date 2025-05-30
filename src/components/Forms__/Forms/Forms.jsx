import React, { useEffect, useState } from "react";
import { FaArrowUpRightFromSquare, FaEye, FaPlus } from "react-icons/fa6";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { getEventById } from "../../../utils/api_calls/event";
import { toastPromise } from "../../../utils/toastify";
import CopyBtn from "../../utils/CopyBtn/CopyBtn";
import ShareBtn from "../../utils/ShareBtn/ShareBtn";
function NotFound() {
  return <div>Event not found</div>;
}
function NoForms() {
  const params = useParams();
  return (
    <div className="gap-3 stack">
      <h1>No forms found</h1>
      <Link to={`/events/id/${params.id}`}>Go back to event</Link>
      <Link to={`/events/id/${params.id}/forms/create`}>Create form</Link>
      
    </div>
  );
}
function Main({ event }) {
  return (
    <div className="h-full stack d-center justify-evenly">
      <h1>Forms</h1>
      <table className="table-border text-white">
        <thead>
          <tr>
            <th>Form ID</th>
            <th>Name</th>
            <th>Responses</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Copy Link</th>
            <th>Share</th>
          </tr>
        </thead>
        <tbody>
          {event?.forms?.map((form) => (
            <tr>
              <td>{form.formId}</td>
              <td>{form.name}</td>
              <td><Link className="unlink w-full d-center" to={`/events/id/${event._id}/forms/responses/${form._id}`}><FaArrowUpRightFromSquare /></Link></td>
              <td><Link className="unlink w-full d-center" to={`/events/id/${event._id}/forms/s/${form.formId}`}><FaEye /></Link></td>
              <td><Link className="unlink w-full d-center" to={`/events/id/${event._id}/forms/edit/${form._id}`}><FiEdit /></Link></td>
              <td><Link className="unlink w-full d-center" to={`/events/id/${event._id}/forms/delete/${form._id}`}><FiTrash2 /></Link></td>
              <td><CopyBtn url={`${window.location.origin}/events/s/${event.eventSlug}/forms/respond/s/${form.formId}`} /></td>
              <td><ShareBtn url={`/events/s/${event.eventSlug}/forms/respond/s/${form.formId}`} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/events/id/${event._id}/forms/create`} className="unlink d-center stack">
      <div className="p-5 rounded-lg bg-slightly-green d-center">
        <FaPlus size={40}/>
      </div>
    <span>  Create form</span>
      </Link>
    </div>
  );
}
function Forms({ token }) {
  const params = useParams();
  const [event, setEvent] = useState({});

  useEffect(() => {
    toastPromise(() => getEventById(params.id, token), {
      success: "Event fetched successfully",
      error: "Failed to fetch event",
      pending: "Fetching event...",
      then: (data) => setEvent(data),
    });
  }, [params.id]);

  return (
    <div className="h-full stack d-center">
      {!event ? (
        <NotFound />
      ) : !event.forms || event.forms.length === 0 ? (
        <NoForms />
      ) : (
        <Main event={event} />
      )}
    </div>
  );
}

export default Forms;
